package utils

import (
	"log"
	"time"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/server"
)

func Run(cfg *config.Config) {
	if cfg.IsDownloadMode {
		dl := NewDownloader(cfg)
		if err := dl.Start(); err != nil {
			log.Fatal(err)
		}

		// 等2秒再退出
		time.Sleep(2 * time.Second)
	} else {
		srv := server.New(cfg)
		if err := srv.Start(); err != nil {
			log.Fatal(err)
		}
	}
}
