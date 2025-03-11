package ui

import (
	"github.com/charmbracelet/bubbles/list"
	"github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
)

// 状态常量
const (
	StateSelectMode = "select_mode"
	StateConfigForm = "config_form"
)

// Item 是列表项的简单实现
type Item struct {
	TitleText, DescText string
}

func (i Item) Title() string       { return i.TitleText }
func (i Item) Description() string { return i.DescText }
func (i Item) FilterValue() string { return i.TitleText }

// Model 是应用程序的主模型
type Model struct {
	// 状态
	State string

	// UI组件
	ModeList list.Model
	Inputs   []textinput.Model
	CurInput int

	// 数据
	IsDownload bool
	IsServer   bool
	ImgDir     string
	CsvFile    string

	// 界面属性
	Width, Height int
	Error         error
}

// NewModel 创建并初始化一个新模型
func NewModel() Model {
	// 创建模式选择列表项
	items := []list.Item{
		Item{TitleText: Text.DownloadMode, DescText: Text.DownloadDesc},
		Item{TitleText: Text.ServerMode, DescText: Text.ServerDesc},
	}

	// 设置列表
	delegate := list.NewDefaultDelegate()
	modeList := list.New(items, delegate, 0, 0)
	modeList.Title = Text.ModeSelection
	modeList.SetShowStatusBar(false)
	modeList.SetShowHelp(true)

	// 创建输入框
	inputs := make([]textinput.Model, 2)

	// 图片目录输入框
	inputs[0] = textinput.New()
	inputs[0].Placeholder = DefaultValues.ImgDir
	inputs[0].Width = 40
	inputs[0].Prompt = "› "
	inputs[0].CharLimit = 100
	inputs[0].SetValue(DefaultValues.ImgDir)

	// CSV文件输入框
	inputs[1] = textinput.New()
	inputs[1].Placeholder = DefaultValues.CSVFile
	inputs[1].Width = 40
	inputs[1].Prompt = "› "
	inputs[1].CharLimit = 100
	inputs[1].SetValue(DefaultValues.CSVFile)

	return Model{
		State:    StateSelectMode,
		ModeList: modeList,
		Inputs:   inputs,
	}
}

// Init 初始化模型
func (m Model) Init() tea.Cmd {
	return nil
}
