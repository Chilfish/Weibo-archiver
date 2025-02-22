package downloader

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/queue"

	"github.com/schollz/progressbar/v3"
)

type Downloader struct {
	config *config.Config
}

func New(cfg *config.Config) *Downloader {
	return &Downloader{config: cfg}
}

func (d *Downloader) Start() error {
	// 读取CSV文件
	urls, err := d.readURLs()
	if err != nil {
		return fmt.Errorf("读取 %s 失败: %w", d.config.ImagesCSVPath, err)
	}

	// 创建下载目录
	if err := os.MkdirAll(d.config.ImagesPath, 0755); err != nil {
		return fmt.Errorf("创建下载目录失败: %w", err)
	}

	fmt.Printf("imgs.csv 路径: %s\n下载目录: %s\n", d.config.ImagesCSVPath, d.config.ImagesPath)
	fmt.Printf("找到 %d 张图片需要下载，按 Ctrl+C 可以中断下载。\n", len(urls))

	// 创建进度条
	bar := progressbar.Default(int64(len(urls)))

	// 创建下载队列
	q := queue.NewPQueue(d.config.Concurrency, time.Duration(d.config.DownloadDelay)*time.Second)
	downloaded := 0

	// 添加下载任务
	for _, url := range urls {
		url := strings.TrimSpace(url)
		if url == "" {
			continue
		}

		q.Add(func() error {
			defer bar.Add(1)
			if err := d.downloadImage(url); err == nil {
				downloaded++
			}
			return nil
		})
	}

	// 等待所有下载完成
	q.Wait()
	q.Close()

	fmt.Printf("\n下载完成！共下载 %d 张图片\n", downloaded)
	return nil
}

func (d *Downloader) readURLs() ([]string, error) {
	file, err := os.Open(d.config.ImagesCSVPath)
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

func (d *Downloader) downloadImage(url string) error {
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

	filepath := filepath.Join(d.config.ImagesPath, fmt.Sprintf("%s-%s", domain, filename))

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