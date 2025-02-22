# Weibo-archiver 本地服务器

这是 Weibo-archiver 的本地服务程序，提供两个功能：

1. 下载微博中的图片，防止链接失效
2. 在本地运行一个服务器，用于离线浏览备份的微博数据和图片

## 使用方法

这是一个命令行程序，需要在终端中运行：

### Windows 用户

1. 下载并解压 `weibo-archiver-windows-amd64.zip`
2. 在解压目录中按住 Shift + 右键，选择"在此处打开 PowerShell 窗口"
   - 或按 `Win + R`，输入 `cmd`，再用 `cd` 进入解压目录路径

### macOS/Linux 用户

1. 下载并解压对应的压缩包
2. 打开终端，进入解压目录

## 基本命令

### 下载图片
```bash
# 从 imgs.csv 下载图片到 images 目录
./weibo-archiver --dl -i imgs.csv -o images

# 设置4线程下载，每次间隔1秒（推荐）
./weibo-archiver --dl -i imgs.csv -o images -c 4 -t 1
```

参数说明：
- `-i` 或 `--imgs-path`：图片链接文件路径
- `-o` 或 `--download-folder`：图片保存位置
- `-c` 或 `--concurrency`：同时下载数量（默认4）
- `-t` 或 `--delay`：下载间隔（秒）

### 启动本地服务

```bash
./weibo-archiver --server -o images
```

启动后访问 `http://localhost:3000` 即可浏览备份的微博数据。

## 常见问题

1. **双击程序没反应**
   - 正常现象，需要在终端中运行

2. **下载失败**
   - 增加下载间隔：`-t 2`
   - 减少并发数：`-c 2`
   - 已下载的图片会自动跳过

3. **端口被占用**
   - 程序会自动尝试其他端口
   - 或关闭占用端口的程序

## 注意事项

1. 建议每次下载间隔 1-2 秒，避免被限制
2. 下载的图片会按域名分类存储
3. 本地服务支持离线浏览，无需联网

如果实在不懂如何操作，可以把这份说明复制到 ChatGPT 等大语言模型中提问，并附上你的疑惑，或许可以得到答案。
