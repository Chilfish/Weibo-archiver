package ui

import (
	"fmt"
	"strings"
	"weibo-archiver/internal/utils"
)

func CheckCSVFile(m Model) string {
	errorMsg := ""
	if m.CsvFile == "" {
		errorMsg = fmt.Sprintf("%s不能为空", Text.CSVFileLabel)
	}

	if !utils.FileExists(m.CsvFile) {
		errorMsg = fmt.Sprintf("文件不存在: %s", m.CsvFile)
	}

	if !strings.HasSuffix(strings.ToLower(m.CsvFile), ".csv") {
		errorMsg = fmt.Sprintf("%s 不是CSV文件", m.CsvFile)
	}

	return errorMsg
}

func CheckImageDir(m Model) string {
	errorMsg := ""
	if m.ImgDir == "" {
		errorMsg = fmt.Sprintf("%s不能为空", Text.ImageDirLabel)
	}

	if !utils.FileExists(m.ImgDir) {
		errorMsg = fmt.Sprintf("文件夹不存在: %s", m.ImgDir)
	}

	if !utils.IsDir(m.ImgDir) {
		errorMsg = fmt.Sprintf("%s 不是文件夹", m.ImgDir)
	}

	return errorMsg
}
