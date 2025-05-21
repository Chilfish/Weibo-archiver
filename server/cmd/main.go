package main

import (
	"fmt"
	"log"
	"os"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/ui"
	"weibo-archiver/internal/utils"
)

func main() {
	info := utils.AppInfo{
		Name:        "Weibo-archiver Tools",
		Version:     "0.6.0",
		Description: "Download and serve weibo images",
	}

	var opts config.Config

	if len(os.Args) < 2 {
		cfg, err := ui.RunInteractive()
		if err != nil {
			log.Fatalf("交互式配置失败: %v", err)
		}
		opts = *cfg
	} else {
		opts = utils.InitFlags(info)
	}

	if opts.IsExited {
		return
	}

	// 创建配置
	cfg := &config.Config{
		Version:        info.Version,
		Port:           opts.Port,
		Concurrency:    opts.Concurrency,
		DownloadDelay:  opts.DownloadDelay,
		ImagesPath:     opts.ImagesPath,
		CSVPath:        opts.CSVPath,
		IsDownloadMode: opts.IsDownloadMode,
		IsServerMode:   opts.IsServerMode,
	}

	fmt.Println("使用配置:")
	for k, v := range map[string]interface{}{
		"  图片目录":  cfg.ImagesPath,
		"  CSV文件": cfg.CSVPath,
		"  端口":    cfg.Port,
		"  并发数":   cfg.Concurrency,
		"  下载延迟":  cfg.DownloadDelay,
	} {
		fmt.Printf("%s: %v\n", k, v)
	}

	utils.Run(cfg)
}
