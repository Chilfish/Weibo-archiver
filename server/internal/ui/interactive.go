package ui

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
)

// RunInteractive 运行交互式UI并返回用户选择的选项
func RunInteractive() error {
	model := NewModel()
	p := tea.NewProgram(model)

	_, err := p.Run()
	if err != nil {
		return fmt.Errorf("UI运行出错: %v", err)
	}
	return nil
}
