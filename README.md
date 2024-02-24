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

![monkey](https://p.chilfish.top/weibo/cover.png)

![宫格图片](https://p.chilfish.top/weibo/gallery.png)

![卡片预览](https://p.chilfish.top/weibo/repost.png)

![图片预览](https://p.chilfish.top/weibo/inline-image.png)

![夜间模式](https://p.chilfish.top/weibo/darkmode.png)

### 使用方式

需要浏览器装有 [Tampermonkey](https://tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) 插件。

安装至油猴脚本：[weibo-archiver.user.js][releases]（如果下载缓慢可用境内加速的 [个人镜像地址]）。在用户个人主页（必须是通过点击头像来进入）刷新后将自动启动脚本，点击开始后将开始获取数据。期间请不要刷新或关闭页面，否则就要重新获取。当然也可以按时间范围来选择。

由于目前更多的是面向有编程基础的用户，关于更多操作细节可见 [#1]。v0.1.11 之后的版本在 [#5] 有对应的改动说明

有关项目的进展路线等，可见 [项目的 Todo] 部分

#### 处理导出后的数据

完成后将导出包含微博数据的 data.mjs 和微博原图链接 imgs.csv 这两个文件。以及 preview.zip，解压后里面包含了用于预览的 HTML 文件和一些工具脚本。

首先需要将导出后的 data.mjs 这个文件复制并替换到预览文件夹里的 assets 目录（用于加载微博数据），将 imgs.csv 复制到 preview 文件夹中（用于下载微博图片）。

接下来需要使用 download.mjs 来下载图片，在 Preview 文件夹中打开控制台（CMD），使用 Node.js 运行下面的命令

> Node.js 可以在 [Node.js 官网] 下载最新版本，可找教程配置环境

```shell
node ./download.mjs -u 你的数字uid
```

其中数字 uid 可以在网页版的个人主页中查看，如 https://weibo.com/u/1111681197 （如果是昵称或别的，需要手动再点一下头像来跳转到该链接）

#### 查看结果

至于在线查看，暂不支持直接点击 index.html 来查看，需要启动本地的服务器。还是在控制台中运行下面的命令，就会自动打开浏览器

```shell
node ./server.mjs
```

#### 合并追加的数据

如果使用了像是时间范围内导出，并想要将它与之前的 data.mjs 合并，那么你需要先将新的 data.mjs 复制到 index.html 目录中，在终端运行

```shell
node ./merge.mjs
```

> 忘了图片链接的合并了，可以手动复制粘贴追加hhh

### 注意事项

该工具仅能获取公开可见的微博，对于那些仅半年可见之外的、仅粉丝（自己）可见的等不是自己的微博，将无法获取。

- **完全免费**，使用 MIT 协议开源，不会有任何收费行为。但如果要二次创作或者引用，需要注明出处和署名😇

- 若账号被封，但访问自己的主页微博，也能获取备份。也就是 **只要能能看得见，就能存档**

- 评论区：获取时，将默认同时获取前三条热评，加上博主的评论，总数不超过 15 条。这是为了避免频繁调用接口，而可能会导致的不明问题。暂时也不支持楼中楼获取

- 媒体文件：只能获取图片，将以图片链接文件的形式导出，需要同时使用压缩包里的 download.mjs 脚本下载好之后，才能在预览页面中可见。这是为了能够离线预览，以及微博图片有比较强的防盗链措施，出了 weibo.com 这个网站就看不到图片了，同时也是为了防止某天图片突然被夹没了😅。并且由于视频文件可能会过大、过长，将采用外链的形式来呈现

- 数据合并：如果你多次地导出 data.mjs 数据，那么可以使用压缩包里的 merge.mjs 来将他们合并，并最终按发布时间的倒序来呈现

- 版本更新：如果是已经爬取到了数据文件和图片，只需要将 data.mjs 和 imgs 文件夹，按照原来的相对位置复制到新的预览文件夹中即可。如果是要更新脚本，那么只需要在油猴脚本管理器中，点击更新即可

### 对开发者

项目采用 monorepo 的结构，使用 pnpm 管理。

在 packages 目录下：

- [/core](packages/core/) 包含了工具函数、pinia 等数据处理的核心
- [/ui](packages/ui/) 包含 UI 部分的组件代码
- [/database](packages/database/) Sqlite3 Drizzle-ORM

在 apps 目录下，为最终的应用

- [/web](apps/web/) 是用于最终查看微博数据的网页
- [/monkey](apps/monkey/) 用于打包成油猴脚本
- [/desktop](apps/desktop/) 桌面端版本

只需要在根目录中 `pnpm i` 即为所有子项目安转依赖，`pnpm dev:monkey` 对应的是在 /monkey 中的 `pnpm dev`

目前我还在学习着 electron 开发，桌面端部分还得再等等🥺原型什么的还在设计

有关项目的进展路线等，可见 [项目的 Todo] 部分

### 鸣谢

- 感谢 [speechless] 提供的基本思路
- [vite-plugin-monkey] 提供了打包成油猴脚本的工具
- [naive-ui] 提供的漂亮 UI 组件库
- Github Copilot 😇

### 赞助

如果你觉得这个项目对你有帮助，可以考虑赞助我一杯咖啡😇这将给我更多的动力来维护这个项目：[赞助地址]

[releases]: https://github.com/Chilfish/Weibo-archiver/releases/latest
[speechless]: https://github.com/meterscao/Speechless
[naive-ui]: https://www.naiveui.com/zh-CN/os-theme
[#1]: https://github.com/Chilfish/Weibo-archiver/issues/1
[#5]: https://github.com/Chilfish/Weibo-archiver/issues/5
[Node.js 官网]: https://nodejs.org/en/download
[vite-plugin-monkey]: https://github.com/lisonge/vite-plugin-monkey
[个人镜像地址]: https://p.chilfish.top/weibo-archiver.user.js
[项目的 Todo]: https://github.com/Chilfish/Weibo-archiver/issues/7
[赞助地址]: https://chilfish.top/sponsors
