package main

import (
	"log"
	"os"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/server"
	"weibo-archiver/internal/ui"
	"weibo-archiver/internal/utils"
)

func main() {
	info := utils.AppInfo{
		Name:        "Weibo-archiver Tools",
		Version:     "0.5.0",
		Description: "Download and serve weibo images",
	}

	// 检查是否有命令行参数
	var opts config.Config
	var err error

	if len(os.Args) > 1 {
		// 解析命令行参数
		opts = utils.InitFlags(info)
	} else {
		// 使用交互式方式获取参数
		opts, err = ui.RunInteractive()
		if err != nil {
			log.Fatalf("交互式配置失败: %v", err)
		}
	}

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

	run(cfg)
}

func run(cfg *config.Config) {
	if cfg.IsDownloadMode {
		dl := utils.NewDownloader(cfg)
		if err := dl.Start(); err != nil {
			log.Fatal(err)
		}
	} else {
		srv := server.New(cfg)
		if err := srv.Start(); err != nil {
			log.Fatal(err)
		}
	}
}
