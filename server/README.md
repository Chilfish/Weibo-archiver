# Weibo-archiver 本地服务器

这是 Weibo-archiver 的本地服务程序，提供两个功能：

1. 下载微博中的图片，防止链接失效
2. 在本地运行一个服务器，用于离线浏览备份的微博数据和图片

## 使用方法

这是一个命令行程序，需要在终端中运行，或者直接双击运行按提示输入参数。

### 下载图片

从 imgs.csv 下载图片到当前目录的 images 文件夹内

```bash
./weibo-archiver.exe --dl -i imgs.csv -o images
```

参数说明：

```bash
用法: main.exe [选项]

选项:
  -d, --dl                       下载模式
  -s, --server                   服务器模式
  -i, --imgs-path string         imgs.csv 的路径 (default "imgs.csv")
  -o, --download-folder string   图片保存的文件夹 (default "images")
  -c, --concurrency int          同时下载的最大数量 (default 4)
  -t, --delay int                每次下载的间隔时间（秒）
  -h, --help                     显示帮助信息
```

### 启动本地服务

启动后访问 `http://localhost:3000` 即可浏览备份的微博数据。

```bash
./weibo-archiver.exe --server -o images
```

## 注意事项

1. 下载的图片会按特定的规则重命名，然后被网页端识别
2. 本地服务支持离线浏览，下载后无需联网

如果实在不懂如何操作，可以把这份说明复制到 ChatGPT 等大语言模型中提问，并附上你的疑惑，或许可以得到答案。
