package ui

import (
	"fmt"
	"path/filepath"

	tea "github.com/charmbracelet/bubbletea"
)

// UI 是面向utils包的交互式UI实现
type UI struct{}

// Run 运行交互式UI并返回用户选择的选项
func (u *UI) Run() (map[string]interface{}, error) {
	options, err := RunInteractive()
	if err != nil {
		return nil, err
	}
	return options.ToMap(), nil
}

// NewUI 创建一个新的UI实例
func NewUI() *UI {
	return &UI{}
}

// RunInteractive 运行交互式UI并返回用户选择的选项
func RunInteractive() (Options, error) {
	// 创建模型
	model := NewModel()

	// 创建程序
	p := tea.NewProgram(model)

	// 运行程序
	finalModel, err := p.Run()
	if err != nil {
		return Options{}, fmt.Errorf("UI运行出错: %v", err)
	}

	// 获取最终模型
	m := finalModel.(Model)

	// 获取绝对路径
	imgDir, _ := filepath.Abs(m.ImgDir)
	csvFile, _ := filepath.Abs(m.CsvFile)

	// 构造结果
	options := Options{
		IsDownload:     m.IsDownload,
		IsServer:       m.IsServer,
		ImgsPath:       csvFile,
		DownloadFolder: imgDir,
		Concurrency:    DefaultValues.Concurrency,
		Delay:          DefaultValues.Delay,
	}

	return options, nil
}
