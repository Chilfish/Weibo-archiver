package utils

import (
	"fmt"
)

// InteractiveUI 是一个接口，表示交互式UI
type InteractiveUI interface {
	Run() (map[string]interface{}, error)
}

// 当前UI实现
var currentUI InteractiveUI

// SetInteractiveUI 设置当前UI实现
func SetInteractiveUI(ui InteractiveUI) {
	currentUI = ui
}

// RunInteractive 通过交互式UI获取用户选择的选项
func RunInteractive() (Options, error) {
	if currentUI == nil {
		return Options{}, fmt.Errorf("UI未初始化")
	}

	// 调用UI模块的Run函数
	optMap, err := currentUI.Run()
	if err != nil {
		return Options{}, err
	}

	// 转换为utils.Options
	options := Options{
		IsDownload:     optMap["is_download"].(bool),
		IsServer:       optMap["is_server"].(bool),
		ImgsPath:       optMap["imgs_path"].(string),
		DownloadFolder: optMap["download_folder"].(string),
		Concurrency:    optMap["concurrency"].(int),
		Delay:          optMap["delay"].(int),
	}

	return options, nil
}
