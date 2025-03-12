package config

import (
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	Version        string
	Port           int
	Concurrency    int
	DownloadDelay  int
	ImagesPath     string
	CSVPath        string
	IsDownloadMode bool
	IsServerMode   bool
}

// GetExecutableDir 获取可执行文件所在目录
func GetExecutableDir() (string, error) {
	exe, err := os.Executable()
	if err != nil {
		return "", fmt.Errorf("获取可执行文件路径失败: %w", err)
	}
	return filepath.Dir(exe), nil
}
