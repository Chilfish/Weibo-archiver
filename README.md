###  Weibo-archiver

将你的新浪微博归档，为号被完全夹没前绸缪 😭

![monkey](docs/v0.1.10.png)

![宫格图片](docs/v0.1.0.png)

![卡片预览](docs/v0.1.1.png)

![图片预览](docs/v0.1.2.png)

![评论区](docs/v0.1.3.png)

![夜间模式](docs/v0.1.6.png)

### 预先说明

这个脚本一开始更多的只是处于自用的角度编写的，有很多我认为习以为常的操作可能对多数人来说是比较懵的，有很多繁琐的步骤。先凑合着用吧，之后有时间发布成桌面应用，自动处理数据来简化操作，以让更多人能使用得上。

打算实现的功能

- [ ] 打包成桌面App (预选 tarui 来实现)
- [ ] 只需输入用户名就能一键导出
- [x] 更多的导出选项
- [ ] 多用户切换
- [ ] 导入数据

......

### 使用方式

安装至油猴脚本：[weibo-archiver.user.js][releases]，在个人主页刷新后将自动启动脚本，点击开始后将开始获取数据。期间请不要刷新或关闭页面，否则就要重新获取（因为微博 api 限制了只能一页一页地往后翻页）。当然也可以按时间范围来选择。

由于目前更多的是面向有编程基础的用户，关于更多操作细节可见 [讨论区]。v0.1.11 版本在 [#5] 有对应的改动说明

### 处理导出后的数据

完成后将导出包含微博数据的 data.mjs 和微博原图链接 imgs.csv 这两个文件。

在 [releases] 中下载 preview.zip，解压后里面包含了用于预览的 HTML 文件和一些工具脚本。

首先需要将导出后的 data.mjs 这个文件复制并替换到预览文件夹里的 assets 目录（用于加载微博数据），将 imgs.csv 复制到 preview 文件夹中（用于下载微博图片）。

接下来需要使用 download.mjs 来下载图片，在 Preview 文件夹中打开控制台（CMD），使用 Node.js 运行下面的命令

> Node.js 可以在 [Node.js 官网] 下载最新版本，可找教程配置环境

```shell
node ./download.mjs -u 你的数字uid
```

### 查看结果

至于在线查看，暂不支持直接点击 index.html 来查看，需要启动本地的服务器。还是在控制台中运行下面的命令

```shell
node ./server.mjs
```

### 合并追加的数据

如果使用了像是时间范围内导出，并想要将它与之前的 data.mjs 合并，那么你需要先将新的 data.mjs 复制到 index.html 目录中，在终端运行

```shell
node ./merge.mjs
```

> 忘了图片链接的合并了，可以手动复制粘贴追加hhh

### 注意事项

该工具仅能获取公开可见的微博，对于那些仅半年可见之外的、仅粉丝（自己）可见的等不是自己的微博，将无法获取。

- 若账号被封，但访问自己的主页微博，也能获取备份。也就是 **只要能能看得见，就能存档**

- 评论区：获取时，将默认同时获取前三条热评，加上博主的评论，总数不超过 15 条

- **完全免费**，使用 MIT 协议开源，不会有任何收费行为

- 媒体文件：只能获取图片，且是原图大小，包括被转发的微博。图片将以图片链接文件的形式导出，需要同时使用压缩包里的 download.py 脚本下载才能预览。这目的是为了能够离线预览，以及微博图片有比较强的防盗链措施，出了 weibo.com 这个网站就看不到图片了，同时也是为了防止某天图片突然被夹没了😅。并且由于视频文件可能会过大、过长，将采用外链的形式来呈现

- 数据合并：如果你多次地导出 data.mjs 数据，那么可以使用压缩包里的 merge.mjs 来将他们合并，并最终按发布时间的倒序来呈现

### 对开发者

项目采用 monorepo 的结构，使用 pnpm 管理

- `/core` 包含了工具函数、pinia 等数据处理的核心
- `/components` 包含 UI 部分的组件
- `/preview` 是用于最终查看微博的 UI 部分
- `/monkey` 是用于打包成油猴脚本的

只需要在根目录中 `pnpm i`，`pnpm dev:monkey` 对应的是在 /monkey 中的 `pnpm dev`

### 鸣谢

感谢 [speechless] 提供的思路

[releases]: https://github.com/Chilfish/Weibo-archiver/releases/latest
[speechless]: https://github.com/meterscao/Speechless
[讨论区]: https://github.com/Chilfish/Weibo-archiver/issues/1
[#5]: https://github.com/Chilfish/Weibo-archiver/issues/5
[Node.js 官网]: https://nodejs.org/en/download
