package main

import (
	"log"
	"os"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/ui"
	"weibo-archiver/internal/utils"
)

func main() {
	info := utils.AppInfo{
		Name:        "Weibo-archiver Tools",
		Version:     "0.5.0",
		Description: "Download and serve weibo images",
	}

	var opts config.Config
	var err error

	if len(os.Args) < 2 {
		err = ui.RunInteractive()
		if err != nil {
			log.Fatalf("交互式配置失败: %v", err)
		}

		return
	}

	// 解析命令行参数
	opts = utils.InitFlags(info)
	// 创建配置
	cfg := &config.Config{
		Version:        info.Version,
		Port:           opts.Port,
		Concurrency:    opts.Concurrency,
		DownloadDelay:  opts.DownloadDelay,
		ImagesPath:     opts.ImagesPath,
		WebPath:        opts.WebPath,
		CSVPath:        opts.CSVPath,
		IsDownloadMode: opts.IsDownloadMode,
		IsServerMode:   opts.IsServerMode,
	}

	utils.Run(cfg)
}
