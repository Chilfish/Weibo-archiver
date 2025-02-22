package config

import (
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	Version        string
	ImagesPath     string
	WebRoot        string
	Port           int
	Concurrency    int
	DownloadDelay  int
	ImagesCSVPath  string
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

// GetWebRoot 获取前端文件目录
func GetWebRoot() (string, error) {
	exeDir, err := GetExecutableDir()
	if err != nil {
		return "", err
	}
	return exeDir, nil
} 