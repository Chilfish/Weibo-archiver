package utils

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/pflag"
)

type AppInfo struct {
	Name        string
	Version     string
	Description string
}

type Options struct {
	IsDownload     bool
	IsServer       bool
	ImgsPath       string
	DownloadFolder string
	Concurrency    int
	Delay          int
}

func InitFlags(info AppInfo) Options {
	// 定义命令行参数
	opts := Options{}
	pflag.BoolVarP(&opts.IsDownload, "dl", "d", false, "下载模式")
	pflag.BoolVarP(&opts.IsServer, "server", "s", false, "服务器模式")
	pflag.StringVarP(&opts.ImgsPath, "imgs-path", "i", "imgs.csv", "imgs.csv 的路径")
	pflag.StringVarP(&opts.DownloadFolder, "download-folder", "o", "images", "图片保存的文件夹")
	pflag.IntVarP(&opts.Concurrency, "concurrency", "c", 4, "同时下载的最大数量")
	pflag.IntVarP(&opts.Delay, "delay", "t", 0, "每次下载的间隔时间（秒）")
	help := pflag.BoolP("help", "h", false, "显示帮助信息")

	pflag.Parse()

	// 显示帮助信息
	if *help {
		fmt.Printf("%s v%s - %s\n\n", info.Name, info.Version, info.Description)
		fmt.Printf("用法: %s [选项]\n\n", filepath.Base(os.Args[0]))
		fmt.Println("选项:")
		pflag.PrintDefaults()

		fmt.Println("\n示例:")
		fmt.Println("  " + filepath.Base(os.Args[0]) + " --dl --imgs-path imgs.csv --download-folder images")
		fmt.Println("  " + filepath.Base(os.Args[0]) + " --server --download-folder images")
		os.Exit(0)
	}

	// 检查运行模式
	if opts.IsDownload && opts.IsServer {
		fmt.Println("错误: 不能同时运行下载模式和服务器模式")
		os.Exit(1)
	}

	if !opts.IsDownload && !opts.IsServer {
		fmt.Println("错误: 必须指定 --dl 或 --server 模式")
		os.Exit(1)
	}

	// 解析路径
	absImgsPath, _ := filepath.Abs(opts.ImgsPath)
	absDownloadFolder, _ := filepath.Abs(opts.DownloadFolder)
	opts.ImgsPath = absImgsPath
	opts.DownloadFolder = absDownloadFolder

	return opts
}
