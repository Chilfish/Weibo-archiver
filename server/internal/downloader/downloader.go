package downloader

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"net/url"
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

type ImageInfo struct {
	URL      string
	Domain   string
	Filename string
}

func New(cfg *config.Config) *Downloader {
	return &Downloader{config: cfg}
}

// parseImageURL 解析图片URL并返回图片信息
func parseImageURL(rawURL string) (*ImageInfo, error) {
	rawURL = strings.TrimSpace(rawURL)
	if rawURL == "" {
		return nil, fmt.Errorf("空URL")
	}

	parsedURL, err := url.Parse(rawURL)
	if err != nil {
		return nil, fmt.Errorf("解析URL失败: %w", err)
	}

	if !strings.HasPrefix(parsedURL.Scheme, "http") {
		return nil, fmt.Errorf("不支持的协议: %s", parsedURL.Scheme)
	}

	// 提取文件名（移除查询参数）
	pathParts := strings.Split(parsedURL.Path, "/")
	filename := pathParts[len(pathParts)-1]
	if idx := strings.Index(filename, "?"); idx != -1 {
		filename = filename[:idx]
	}

	// 提取域名（移除端口号）
	domain := parsedURL.Host
	if idx := strings.Index(domain, ":"); idx != -1 {
		domain = domain[:idx]
	}

	return &ImageInfo{
		URL:      rawURL,
		Domain:   domain,
		Filename: filename,
	}, nil
}

// getFullFilename 生成完整的文件名
func (info *ImageInfo) getFullFilename() string {
	return fmt.Sprintf("%s-%s", info.Domain, info.Filename)
}

// readURLs 读取CSV文件中的URL列表
func (d *Downloader) readURLs() ([]string, error) {
	file, err := os.Open(d.config.ImagesCSVPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var urls []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		// 处理可能的多个URL（以逗号分隔）
		for _, url := range strings.Split(line, ",") {
			url = strings.TrimSpace(url)
			if url != "" {
				urls = append(urls, url)
			}
		}
	}

	return urls, scanner.Err()
}

// buildDownloadMap 构建下载映射
func (d *Downloader) buildDownloadMap(urls []string) (map[string]*ImageInfo, error) {
	urlMap := make(map[string]*ImageInfo)
	var invalidURLs []string

	for _, rawURL := range urls {
		info, err := parseImageURL(rawURL)
		if err != nil {
			invalidURLs = append(invalidURLs, rawURL)
			continue
		}
		urlMap[info.getFullFilename()] = info
	}

	if len(invalidURLs) > 0 {
		fmt.Printf("警告: 发现 %d 个无效URL\n", len(invalidURLs))
	}

	return urlMap, nil
}

// getExistingFiles 获取已存在的文件列表
func (d *Downloader) getExistingFiles() (map[string]struct{}, error) {
	existingFiles := make(map[string]struct{})

	entries, err := os.ReadDir(d.config.ImagesPath)
	if err != nil {
		return nil, fmt.Errorf("读取下载目录失败: %w", err)
	}

	for _, entry := range entries {
		if !entry.IsDir() {
			existingFiles[entry.Name()] = struct{}{}
		}
	}

	return existingFiles, nil
}

// downloadImage 下载单个图片
func (d *Downloader) downloadImage(info *ImageInfo) error {
	filepath := filepath.Join(d.config.ImagesPath, info.getFullFilename())

	// 创建 HTTP 请求
	client := &http.Client{}
	req, err := http.NewRequest("GET", info.URL, nil)
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

func (d *Downloader) Start() error {
	// 创建下载目录
	if err := os.MkdirAll(d.config.ImagesPath, 0755); err != nil {
		return fmt.Errorf("创建下载目录失败: %w", err)
	}

	// 读取CSV文件
	urls, err := d.readURLs()
	if err != nil {
		return fmt.Errorf("读取 %s 失败: %w", d.config.ImagesCSVPath, err)
	}

	// 构建下载映射
	urlMap, err := d.buildDownloadMap(urls)
	if err != nil {
		return fmt.Errorf("构建下载映射失败: %w", err)
	}

	// 获取已存在的文件列表
	existingFiles, err := d.getExistingFiles()
	if err != nil {
		return err
	}

	// 准备下载列表
	var downloadList []*ImageInfo
	for filename, info := range urlMap {
		if _, exists := existingFiles[filename]; !exists {
			downloadList = append(downloadList, info)
		}
	}

	fmt.Printf("imgs.csv 路径: %s\n下载目录: %s\n", d.config.ImagesCSVPath, d.config.ImagesPath)
	fmt.Printf("找到 %d 张有效图片，已存在 %d 张图片，实际需要下载 %d 张图片。按 Ctrl+C 可以中断下载。\n",
		len(urlMap), len(existingFiles), len(downloadList))

	if len(downloadList) == 0 {
		fmt.Println("所有图片已下载完成！")
		return nil
	}

	// 创建进度条
	bar := progressbar.Default(int64(len(downloadList)))

	// 创建下载队列
	q := queue.NewPQueue(d.config.Concurrency, time.Duration(d.config.DownloadDelay)*time.Second)
	downloaded := 0

	// 添加下载任务
	for _, info := range downloadList {
		info := info // 创建副本以避免闭包问题
		q.Add(func() error {
			defer bar.Add(1)
			if err := d.downloadImage(info); err == nil {
				downloaded++
			}
			return nil
		})
	}

	// 等待所有下载完成
	q.Wait()
	q.Close()

	fmt.Printf("\n下载完成！本次成功下载 %d 张图片\n", downloaded)
	return nil
}
