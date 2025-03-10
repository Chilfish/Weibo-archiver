package ui

import (
	"weibo-archiver/internal/config"

	"github.com/charmbracelet/lipgloss"
)

// Text 集中管理UI中使用的文本
var Text = struct {
	AppTitle      string
	DownloadMode  string
	ServerMode    string
	ConfigPrompt  string
	ImageDirLabel string
	CSVFileLabel  string
	ConfirmButton string
	HelpText      string
	ModeSelection string
	DownloadDesc  string
	ServerDesc    string
}{
	AppTitle:      "Weibo-archiver 本地工具",
	DownloadMode:  "下载模式",
	ServerMode:    "服务器模式",
	ConfigPrompt:  "请配置%s参数：",
	ImageDirLabel: "图片目录",
	CSVFileLabel:  "CSV文件路径",
	ConfirmButton: "[ 确认 ]",
	HelpText:      "(使用方向键/tab 切换, enter 确认, ctrl+c 退出)",
	ModeSelection: "请选择运行模式",
	DownloadDesc:  "从CSV文件下载微博图片",
	ServerDesc:    "启动Web服务器浏览图片",
}

// Styles 集中管理UI中使用的样式
var Styles = struct {
	Title  lipgloss.Style
	Error  lipgloss.Style
	Help   lipgloss.Style
	Button lipgloss.Style
}{
	Title:  lipgloss.NewStyle().Bold(true),
	Error:  lipgloss.NewStyle().Foreground(lipgloss.Color("161")),
	Help:   lipgloss.NewStyle().Foreground(lipgloss.Color("240")),
	Button: lipgloss.NewStyle().Foreground(lipgloss.Color("#7D56F4")),
}

var Config = config.Config{}

// DefaultValues 默认值
var DefaultValues = struct {
	ImgDir      string
	CSVFile     string
	Concurrency int
	Delay       int
}{
	ImgDir:      "images",
	CSVFile:     "imgs.csv",
	Concurrency: 4,
	Delay:       0,
}
