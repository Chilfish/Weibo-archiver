package utils

import (
	"fmt"
	"os"
	"path/filepath"

	"weibo-archiver/internal/config"

	"github.com/spf13/pflag"
)

type AppInfo struct {
	Name        string
	Version     string
	Description string
}

func InitFlags(info AppInfo) config.Config {
	// 定义命令行参数
	opts := config.Config{}
	pflag.BoolVarP(&opts.IsDownloadMode, "dl", "d", false, "下载模式")
	pflag.BoolVarP(&opts.IsServerMode, "server", "s", false, "服务器模式")
	pflag.StringVarP(&opts.CSVPath, "imgs-path", "i", "imgs.csv", "imgs.csv 的路径")
	pflag.StringVarP(&opts.ImagesPath, "download-folder", "o", "images", "图片保存的文件夹")
	pflag.IntVarP(&opts.Concurrency, "concurrency", "c", 4, "同时下载的最大数量")
	pflag.IntVarP(&opts.DownloadDelay, "delay", "t", 0, "每次下载的间隔时间（秒）")
	help := pflag.BoolP("help", "h", false, "显示帮助信息")

	pflag.Parse()

	// 显示帮助信息
	if *help {
		exeName := filepath.Base(os.Args[0])

		fmt.Printf("%s v%s - %s\n\n", info.Name, info.Version, info.Description)
		fmt.Printf("用法: %s [选项]\n\n", exeName)
		fmt.Println("选项:")
		pflag.PrintDefaults()

		fmt.Println("\n示例:")
		fmt.Println("\t" + exeName + " --dl -i imgs.csv -o images")
		fmt.Println("\t" + exeName + " --server -o images")
		fmt.Println("\t" + exeName + " (无参数，将进入交互模式)")
		os.Exit(0)
	}

	// 检查运行模式
	if opts.IsDownloadMode && opts.IsServerMode {
		fmt.Println("错误: 不能同时运行下载模式和服务器模式")
		os.Exit(1)
	}

	// 解析路径
	absImgsPath, _ := filepath.Abs(opts.CSVPath)
	absImagesPath, _ := filepath.Abs(opts.ImagesPath)
	opts.CSVPath = absImgsPath
	opts.ImagesPath = absImagesPath

	return opts
}
