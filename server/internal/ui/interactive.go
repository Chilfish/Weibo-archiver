package ui

import (
	"fmt"
	"path/filepath"

	"weibo-archiver/internal/config"

	tea "github.com/charmbracelet/bubbletea"
)

// RunInteractive 运行交互式UI并返回用户选择的选项
func RunInteractive() (config.Config, error) {
	// 创建模型
	model := NewModel()

	// 创建程序
	p := tea.NewProgram(model)

	// 运行程序
	finalModel, err := p.Run()
	if err != nil {
		return config.Config{}, fmt.Errorf("UI运行出错: %v", err)
	}

	// 获取最终模型
	m := finalModel.(Model)

	// 获取绝对路径
	imgDir, _ := filepath.Abs(m.ImgDir)
	csvFile, _ := filepath.Abs(m.CsvFile)

	return config.Config{
		CSVPath:    csvFile,
		ImagesPath: imgDir,
	}, nil
}
