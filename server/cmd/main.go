package main

import (
	"log"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/downloader"
	"weibo-archiver/internal/server"
	"weibo-archiver/internal/utils"
)

func main() {
	info := utils.AppInfo{
		Name:        "Weibo-archiver Tools",
		Version:     "0.5.0",
		Description: "Download and serve weibo images",
	}

	// 解析命令行参数
	opts := utils.InitFlags(info)

	// 获取web根目录
	webRoot, err := config.GetWebRoot()
	if err != nil {
		log.Fatal(err)
	}

	// 创建配置
	cfg := &config.Config{
		Version:        info.Version,
		ImagesPath:     opts.DownloadFolder,
		WebRoot:        webRoot,
		Port:           3000,
		Concurrency:    opts.Concurrency,
		DownloadDelay:  opts.Delay,
		ImagesCSVPath:  opts.ImgsPath,
		IsDownloadMode: opts.IsDownload,
		IsServerMode:   opts.IsServer,
	}

	if cfg.IsDownloadMode {
		dl := downloader.New(cfg)
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
