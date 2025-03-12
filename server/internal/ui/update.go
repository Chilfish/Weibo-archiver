package ui

import (
	"errors"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/utils"

	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
)

// View 渲染视图
func (m Model) View() string {
	switch m.State {
	case StateSelectMode:
		return RenderModeSelection(m)
	case StateConfigForm:
		return RenderConfigForm(m)
	default:
		return "未知状态"
	}
}

// Update 处理消息并返回更新后的模型
func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		// 更新窗口大小
		m.Width = msg.Width
		m.Height = msg.Height

		// 更新列表大小
		m.ModeList.SetSize(msg.Width, msg.Height-4)
		return m, nil

	case tea.KeyMsg:
		// 通用键盘处理
		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		}

		// 根据状态处理按键
		switch m.State {
		case StateSelectMode:
			return updateModeSelection(m, msg)
		case StateConfigForm:
			return updateConfigForm(m, msg)
		}
	}

	return m, nil
}

// updateModeSelection 处理模式选择界面的按键
func updateModeSelection(m Model, msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	// 处理确认键
	if msg.String() == "enter" {
		selected, ok := m.ModeList.SelectedItem().(Item)
		if !ok {
			return m, nil
		}

		// 设置模式
		if selected.TitleText == Text.DownloadMode {
			m.IsDownload = true
			m.IsServer = false
		} else {
			m.IsDownload = false
			m.IsServer = true
		}

		// 切换到配置表单
		m.State = StateConfigForm
		m.CurInput = 0
		m.Inputs[0].Focus()
		return m, textinput.Blink
	}

	// 更新列表
	var cmd tea.Cmd
	m.ModeList, cmd = m.ModeList.Update(msg)
	return m, cmd
}

// updateConfigForm 处理配置表单界面的按键
func updateConfigForm(m Model, msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "tab", "shift+tab", "enter", "up", "down":
		s := msg.String()

		// 确认按钮被选中并按下回车
		if s == "enter" && m.CurInput == len(m.Inputs) {
			m = validateAndComplete(m)

			if m.Error != nil {
				return m, nil
			}

			cfg := &config.Config{
				ImagesPath: m.ImgDir,
				CSVPath:    m.CsvFile,
			}

			utils.Run(cfg)
			return m, nil
		}

		// 输入框导航
		if s == "up" || s == "shift+tab" {
			m.CurInput--
		} else {
			m.CurInput++
		}

		if m.CurInput > len(m.Inputs) {
			m.CurInput = 0
		} else if m.CurInput < 0 {
			m.CurInput = len(m.Inputs)
		}

		// 聚焦/失焦输入框
		cmds := make([]tea.Cmd, len(m.Inputs))
		for i := 0; i < len(m.Inputs); i++ {
			if i == m.CurInput {
				cmds[i] = m.Inputs[i].Focus()
			} else {
				m.Inputs[i].Blur()
			}
		}

		return m, tea.Batch(cmds...)
	}

	// 处理输入框文字输入
	if m.CurInput < len(m.Inputs) {
		var cmd tea.Cmd
		m.Inputs[m.CurInput], cmd = m.Inputs[m.CurInput].Update(msg)
		return m, cmd
	}

	return m, nil
}

// validateAndComplete 验证输入并完成
func validateAndComplete(m Model) Model {
	m.ImgDir = m.Inputs[0].Value()

	if errorMsg := CheckImageDir(m); errorMsg != "" {
		m.Error = errors.New(errorMsg)
		return m
	}

	// 下载模式需验证CSV文件
	if m.IsDownload {
		m.CsvFile = m.Inputs[1].Value()
		if errorMsg := CheckCSVFile(m); errorMsg != "" {
			m.Error = errors.New(errorMsg)
			return m
		}
	}
	m.Error = nil
	return m
}
