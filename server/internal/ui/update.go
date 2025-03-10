package ui

import (
	"fmt"
	"os"
	"strings"

	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
)

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
			return validateAndComplete(m)
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
func validateAndComplete(m Model) (tea.Model, tea.Cmd) {
	m.ImgDir = m.Inputs[0].Value()

	// 验证图片目录
	if m.ImgDir == "" {
		m.Error = fmt.Errorf("%s不能为空", Text.ImageDirLabel)
		m.CurInput = 0 // 聚焦有问题的字段
		return m, nil
	}

	// 下载模式需验证CSV文件
	if m.IsDownload {
		m.CsvFile = m.Inputs[1].Value()

		// 验证CSV文件
		if m.CsvFile == "" {
			m.Error = fmt.Errorf("%s不能为空", Text.CSVFileLabel)
			m.CurInput = 1
			return m, nil
		}

		// 检查CSV文件是否存在
		if !fileExists(m.CsvFile) {
			m.Error = fmt.Errorf("文件不存在: %s", m.CsvFile)
			m.CurInput = 1
			return m, nil
		}

		// 检查是否为CSV文件
		if !strings.HasSuffix(strings.ToLower(m.CsvFile), ".csv") {
			m.Error = fmt.Errorf("%s 不是CSV文件", m.CsvFile)
			m.CurInput = 1
			return m, nil
		}
	} else {
		// 服务器模式不需要CSV文件
		m.CsvFile = DefaultValues.CSVFile
	}

	// 验证通过，退出程序
	return m, tea.Quit
}

// View 渲染视图
func (m Model) View() string {
	switch m.State {
	case StateSelectMode:
		return renderModeSelection(m)
	case StateConfigForm:
		return renderConfigForm(m)
	default:
		return "未知状态"
	}
}

// renderModeSelection 渲染模式选择界面
func renderModeSelection(m Model) string {
	return fmt.Sprintf("\n %s\n\n%s",
		Styles.Title.Render(Text.AppTitle),
		m.ModeList.View())
}

// renderConfigForm 渲染配置表单界面
func renderConfigForm(m Model) string {
	var b strings.Builder

	// 标题
	modeTitle := Text.ServerMode
	if m.IsDownload {
		modeTitle = Text.DownloadMode
	}
	b.WriteString(fmt.Sprintf("\n %s - %s\n\n",
		Styles.Title.Render(Text.AppTitle),
		modeTitle))

	// 提示文本
	b.WriteString(fmt.Sprintf(" %s\n\n", fmt.Sprintf(Text.ConfigPrompt, modeTitle)))

	// 图片目录输入框
	b.WriteString(fmt.Sprintf(" %s: %s\n\n", Text.ImageDirLabel, m.Inputs[0].View()))

	// CSV文件输入框 (仅下载模式)
	if m.IsDownload {
		b.WriteString(fmt.Sprintf(" %s: %s\n\n", Text.CSVFileLabel, m.Inputs[1].View()))
	}

	// 确认按钮
	button := Text.ConfirmButton
	if m.CurInput == len(m.Inputs) {
		button = Styles.Button.Render(button)
	}
	b.WriteString(fmt.Sprintf("\n %s\n\n", button))

	// 错误信息
	if m.Error != nil {
		b.WriteString(Styles.Error.Render(fmt.Sprintf(" 错误: %s\n\n", m.Error)))
	}

	// 帮助文本
	b.WriteString(Styles.Help.Render(fmt.Sprintf(" %s\n", Text.HelpText)))

	return b.String()
}

// fileExists 检查文件或目录是否存在
func fileExists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
