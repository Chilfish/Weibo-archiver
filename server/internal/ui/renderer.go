package ui

import (
	"fmt"
	"strings"
)


// renderModeSelection 渲染模式选择界面
func RenderModeSelection(m Model) string {
	return fmt.Sprintf("\n %s\n\n%s",
		Styles.Title.Render(Text.AppTitle),
		m.ModeList.View())
}

// renderConfigForm 渲染配置表单界面
func RenderConfigForm(m Model) string {
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
