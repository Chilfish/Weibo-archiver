package utils

import (
	"log"
	"weibo-archiver/internal/config"
	"weibo-archiver/internal/server"
)

func Run(cfg *config.Config) {
	if cfg.IsDownloadMode {
		dl := NewDownloader(cfg)
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
