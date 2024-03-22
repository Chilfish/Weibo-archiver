<div align="center">
  <img
    alt="logo"
    width="100"
    src="https://p.chilfish.top/weibo/icon.webp"
  />

  <div>
    <img src="https://wakatime.com/badge/user/0842a71f-c026-4b09-8aa0-f8398b4c3423/project/3416f224-f0dc-4b08-805c-af30dbd396b2.svg" alt="wakatime">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/chilfish/weibo-archiver">
    <img alt="GitHub Downloads" src="https://img.shields.io/github/downloads/chilfish/weibo-archiver/total">
  </div>
</div>

## Weibo-archiver

将你的新浪微博归档，为号被完全夹没前绸缪 😭

![monkey](https://p.chilfish.top/weibo/cover.webp)

![宫格图片](https://p.chilfish.top/weibo/gallery.png)

![卡片预览](https://p.chilfish.top/weibo/repost.png)

![设置页](https://p.chilfish.top/weibo/settings.webp)

![夜间模式](https://p.chilfish.top/weibo/darkmode.png)

### 使用方式

需要浏览器装有 [Tampermonkey](https://tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) 插件。

安装至油猴脚本：[weibo-archiver.user.js][releases]（如果下载缓慢可用境内加速的 [镜像地址]）。在用户个人主页（必须是通过点击头像来进入）刷新后将自动启动脚本，点击开始后将开始获取数据。期间请不要刷新或切换页面，否则就要重新获取。当然也可以按时间范围来选择。

> [!IMPORTANT]
> 该项目还在锐意开发中，可能会有很多不稳定的 bug 等，欢迎大家提 issues 或发起讨论😇暂时只接受改 bug 的 pr <br/>
> 有关项目的进展路线等，可见 [项目的 Todo] 部分

#### 处理导出后的数据

完成后将导出包含微博数据的 `weibo-data.json` 和包含微博图片链接的 `imgs.csv`，这两个文件。以及自动下载 `scripts.zip`，解压后里面包含了用于下载图片和查看图片工具脚本。

1. 首先将 imgs.csv 复制到 scripts 文件夹中（用于下载微博图片）

2. 然后使用 `download.mjs` 来下载图片到本地（这一步也可以跳过，在预览页中的设置中启用“使用远程 CDN”即可，但为了永久保存图片不被突然被夹掉，还是建议下载图片）

scripts 文件夹中包含了交互式脚本，按用途提示点击运行即可

> 其中，运行下载图片脚本之前需要安装 Node.js，可以在 [Node.js 官网] 下载最新版本

#### 查看结果

访问我们提供的在线预览平台：https://weibo.chilfish.top 。点击右上角的设置按钮，按提示导入刚才导出的 `weibo-data.json` 即可查看（也支持旧版导出的 `data.mjs`）

不过正在开发桌面版app，届时将不再需要这些复杂的操作，直接双击打开即可查看

### 注意事项 | 声明

该工具仅能获取公开可见的微博，对于那些仅半年可见之外的、仅粉丝（自己）可见的等，若不是自己的微博，将无法获取。

- **完全免费**，使用 **Apache 2.0** 协议开源，不会有任何收费行为。但如果要二次创作或者引用，需要注明出处和署名，不得修改协议或是去除版权声明，详见 [LICENSE](LICENSE)😇

- 若微博账号被封，但访问自己的主页微博，也能获取备份。也就是 **只要能看得见，就能存档**

- 关于在线预览页面。上传的微博数据完全保存在你的浏览器本地，你和别人都 **无法通过链接来直接查看这些微博数据**。但如果你想分享给其他人查看，可以将 `weibo-data.json` 发送给他们，并按提示导入即可，同时再设置里将图片链接设为远程 CDN 链接，或是填上你的图床地址

- 评论区：获取时，将默认同时获取前 6 条热评，总数不超过 20 条。这是为了避免频繁调用接口，而可能会导致的不明问题。暂时也不支持楼中楼

- 媒体文件：只能获取图片，将以图片链接文件的形式导出，需要同时使用压缩包里的 `download.mjs` 脚本下载好之后，才能在预览页面中可见。这是为了能够离线预览，同时也是为了防止某天图片突然被夹没了😅。并且由于视频文件可能会过大、过长，将采用外链的形式来呈现。

- 不过可以将下载后的图片上传到你自己的图床服务器里，注意不要改变文件目录，再在预览页面的设置中填写你的图床链接即可

### 对开发者

项目采用 monorepo 的结构，使用 pnpm 管理，因此需要先安装 pnpm：`npm i -g pnpm`

在 packages 目录下：

- [/core](packages/core/) 包含了工具函数、pinia 等数据处理的核心
- [/ui](packages/ui/) 包含 UI 部分的组件代码
- [/database](packages/database/) Sqlite3 Drizzle-ORM

在 apps 目录下，为最终的应用

- [/web](apps/web/) 是用于最终查看微博数据的网页，目前托管在 [vercel] 上
- [/monkey](apps/monkey/) 用于打包成油猴脚本
- [/desktop](apps/desktop/) 桌面端版本

只需要在根目录中 `pnpm i` 即为所有子项目安转依赖，`pnpm dev:monkey` 对应的是在 /monkey 中的 `pnpm dev`

而如果只需要开发或打包 web 端，可以运行 `pnpm install:web`，这将只安装 web 端的依赖，届时再运行 `pnpm dev:web` 即可。至于运行打包后的结果，由于是静态的资源，可以直接用 nginx 服务，或是运行 `pnpm dlx serve .\.output\public\` 来查看

目前我还在学习着 electron 开发，桌面端部分还得再等等🥺原型什么的还在设计

有关项目的进展路线等，可见 [项目的 Todo] 部分

### 鸣谢

- 感谢 [speechless] 提供的基本思路
- [vite-plugin-monkey] 提供了打包成油猴脚本的工具
- [naive-ui] 提供的漂亮 UI 组件库
- [vercel] 提供的强大云平台😚
- Github Copilot 😇

### 赞助

如果你觉得这个项目对你有帮助，可以考虑赞助v我😇这将给我更多的动力来维护这个项目：[赞助地址]

[releases]: https://raw.githubusercontent.com/Chilfish/Weibo-archiver/monkey/weibo-archiver.user.js
[scripts.zip]: https://github.com/Chilfish/Weibo-archiver/raw/monkey/scripts.zip
[speechless]: https://github.com/meterscao/Speechless
[naive-ui]: https://www.naiveui.com/zh-CN/os-theme
[#1]: https://github.com/Chilfish/Weibo-archiver/issues/1
[#5]: https://github.com/Chilfish/Weibo-archiver/issues/5
[#20]: https://github.com/Chilfish/Weibo-archiver/discussions/20
[@HayashiKaori]: https://github.com/HayashiKaori
[Node.js 官网]: https://nodejs.org/en/download
[vite-plugin-monkey]: https://github.com/lisonge/vite-plugin-monkey
[镜像地址]: https://p.chilfish.top/weibo-archiver.user.js
[项目的 Todo]: https://github.com/Chilfish/Weibo-archiver/issues/7
[赞助地址]: https://chilfish.top/sponsors
[vercel]: https://vercel.com
