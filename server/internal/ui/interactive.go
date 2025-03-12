package ui

import (
	"weibo-archiver/internal/config"

	tea "github.com/charmbracelet/bubbletea"
)

// RunInteractive 运行交互式UI并返回用户选择的选项
func RunInteractive() (*config.Config, error) {
	p := tea.NewProgram(NewModel())

	teaModel, err := p.Run()

	model := teaModel.(Model)

	cfg := &config.Config{
		ImagesPath:     model.ImgDir,
		CSVPath:        model.CsvFile,
		IsDownloadMode: model.IsDownload,
		IsServerMode:   model.IsServer,
		IsExited:       model.IsExited,
		Concurrency:    6,
		DownloadDelay:  1,
	}

	return cfg, err
}
