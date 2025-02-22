package main

import (
	"bufio"
	"compress/gzip"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
	"weibo-archiver/internal/queue"
	"weibo-archiver/internal/utils"

	"github.com/schollz/progressbar/v3"
)

func main() {
	info := utils.AppInfo{
		Name:        "Weibo-archiver Tools",
		Version:     "0.4.4",
		Description: "Download and serve weibo images",
	}

	opts := utils.InitFlags(info)

	if opts.IsDownload {
		runDownloader(opts.ImgsPath, opts.DownloadFolder, opts.Concurrency, opts.Delay)
	} else {
		runServer(opts.DownloadFolder)
	}
}

func runDownloader(imgsPath, downloadFolder string, concurrency, delay int) {
	// 读取 CSV 文件
	urls, err := readURLs(imgsPath)
	if err != nil {
		fmt.Printf("读取 %s 失败: %v\n", imgsPath, err)
		os.Exit(1)
	}

	// 创建下载目录
	if err := os.MkdirAll(downloadFolder, 0755); err != nil {
		fmt.Printf("创建下载目录失败: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("imgs.csv 路径: %s\n下载目录: %s\n", imgsPath, downloadFolder)
	fmt.Printf("找到 %d 张图片需要下载，按 Ctrl+C 可以中断下载。\n", len(urls))

	// 创建进度条
	bar := progressbar.Default(int64(len(urls)))

	// 创建下载队列
	q := queue.NewPQueue(concurrency, time.Duration(delay)*time.Second)
	downloaded := 0

	// 添加下载任务
	for _, url := range urls {
		url := strings.TrimSpace(url)
		if url == "" {
			continue
		}

		q.Add(func() error {
			defer bar.Add(1)
			if err := downloadImage(url, downloadFolder); err == nil {
				downloaded++
			}
			return nil
		})
	}

	// 等待所有下载完成
	q.Wait()
	q.Close()

	fmt.Printf("\nDownload completed! %d images downloaded.\n", downloaded)
}

func runServer(folderPath string) {
	// 检查文件夹是否存在
	if _, err := os.Stat(folderPath); os.IsNotExist(err) {
		fmt.Printf("图片文件夹 %s 不存在\n", folderPath)
		os.Exit(1)
	}

	// 创建文件服务器
	fileServer := http.FileServer(http.Dir(folderPath))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// 设置缓存头
		w.Header().Set("Cache-Control", "public, max-age=3600")
		w.Header().Set("Expires", time.Now().Add(time.Hour).UTC().Format(http.TimeFormat))

		// 检查客户端是否支持 gzip
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
			fileServer.ServeHTTP(w, r)
			return
		}

		// 设置 gzip 压缩
		w.Header().Set("Content-Encoding", "gzip")
		gz := gzip.NewWriter(w)
		defer gz.Close()

		// 创建代理响应写入器
		gzWriter := gzipResponseWriter{Writer: gz, ResponseWriter: w}
		fileServer.ServeHTTP(gzWriter, r)
	})

	// 启动服务器
	port := 3000
	fmt.Printf("图片文件夹: %s\n", folderPath)
	fmt.Printf("图片服务器已在 http://localhost:%d 启动\n", port)

	for {
		err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
		if err != nil {
			if isPortInUse(err) {
				fmt.Printf("端口 %d 已被占用，尝试使用 %d...\n", port, port+1)
				port++
				continue
			}
			fmt.Printf("服务器启动失败: %v\n", err)
			os.Exit(1)
		}
		break
	}
}

// 以下是辅助函数
func readURLs(filepath string) ([]string, error) {
	file, err := os.Open(filepath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var urls []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		urls = append(urls, strings.Split(scanner.Text(), ",\n")...)
	}

	return urls, scanner.Err()
}

func downloadImage(url, folder string) error {
	// 提取文件名
	parts := strings.Split(url, "/")
	filename := strings.Split(parts[len(parts)-1], "?")[0]

	// 提取域名
	domain := ""
	if strings.HasPrefix(url, "http") {
		parts = strings.Split(strings.Split(url, "://")[1], "/")
		domain = parts[0]
	}

	if domain == "" {
		return fmt.Errorf("无效的 URL")
	}

	filepath := filepath.Join(folder, fmt.Sprintf("%s-%s", domain, filename))

	// 检查文件是否存在
	if _, err := os.Stat(filepath); err == nil {
		return nil
	}

	// 创建 HTTP 请求
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Referer", "https://weibo.com/")

	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// 检查是否为图片
	if !strings.HasPrefix(resp.Header.Get("Content-Type"), "image") {
		return fmt.Errorf("不是图片文件")
	}

	// 创建文件
	file, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer file.Close()

	// 写入文件
	_, err = io.Copy(file, resp.Body)
	return err
}

type gzipResponseWriter struct {
	io.Writer
	http.ResponseWriter
}

func (w gzipResponseWriter) Write(b []byte) (int, error) {
	return w.Writer.Write(b)
}

func isPortInUse(err error) bool {
	return strings.Contains(err.Error(), "address already in use")
}
