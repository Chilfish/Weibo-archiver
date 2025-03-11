package utils

import (
	"bufio"
	"os"

)

func ReadCSV(path string) ([]string, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	urls := []string{}
	for scanner.Scan() {
		urls = append(urls, scanner.Text())
	}

	return urls, nil
}

// fileExists 检查文件或目录是否存在
func FileExists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

// isDir 检查是否是目录
func IsDir(path string) bool {
	stat, err := os.Stat(path)
	return err == nil && stat.IsDir()
}
