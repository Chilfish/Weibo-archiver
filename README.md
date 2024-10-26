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
    <img alt="beta build" src="https://github.com/Chilfish/Weibo-archiver/actions/workflows/beta-build.yml/badge.svg">
  </div>
</div>

## Weibo-archiver

将你的新浪微博回忆归档，为号被完全夹没前未雨绸缪 😭

![封面](https://p.chilfish.top/weibo/cover.webp)
![功能展示](https://p.chilfish.top/weibo/feature.webp)
![设置页](https://p.chilfish.top/weibo/settings.webp)

### 使用方式

需要浏览器装有 [Tampermonkey](https://tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) 插件。

安装至油猴脚本：[weibo-archiver.user.js][releases]（如果下载缓慢可用境内加速的 [镜像地址]）。在用户个人主页（必须是通过点击头像来进入）刷新后将自动启动脚本，点击开始后将开始获取数据。支持断点续传，可恢复到上次的进度。

更多操作细节可见 [使用教程]

同时也支持 ClI 模式，可以在 [Node.js 官网] 下载安装 Node.js 后，使用 `npx weibo-archiver` 来启动，具体的使用方法可见 `npx weibo-archiver --help` 和 [README](apps/cli/README.md)

> [!IMPORTANT]
> 该项目还在锐意开发中，可能会有很多不稳定的 bug 等，欢迎大家提 issues 或发起讨论😇

如果想体验预览版，在 [actions] 中会自动构建每次提交的 beta 版本

### 注意事项 | 声明

该工具仅能获取公开可见的微博，对于那些仅半年可见之外的、仅粉丝（自己）可见的等，若不是自己的微博，将无法获取。

- **完全免费**，使用 **Apache 2.0** 协议开源，不会有任何收费行为。但如果要二次创作或者引用，需要注明出处和署名，不得修改协议或是去除版权声明，详见 [LICENSE](LICENSE)😇

- 为了减轻微博服务器的压力，或是避免一些不必要的麻烦，请尽量在比较人少的时间段使用

- 若微博账号被封，但访问自己的主页微博，也能获取备份。也就是 **只要能看得见，就能存档**

- 关于在线预览页面。上传的微博数据完全保存在你的浏览器本地，你和别人都 **无法通过链接来直接查看这些微博数据**。但如果你想分享给其他人查看，可以将 `weibo-data.json` 发送给他们，并按提示导入即可，同时再设置里将图片链接设为远程 CDN 链接，或是填上你的图床地址

- 评论区：获取时，将默认同时获取前 6 条热评，总数不超过 20 条。这是为了避免频繁调用接口，而可能会导致的不明问题。暂时也不支持楼中楼

- 媒体文件：只能获取图片，将以图片链接文件的形式导出，需要同时使用压缩包里的 `download.mjs` 脚本下载好之后，才能在预览页面中可见。这是为了能够离线预览，同时也是为了防止某天图片突然被夹没了😅。并且由于视频文件可能会过大、过长，将采用外链的形式来呈现。

- 不过可以将下载后的图片上传到你自己的图床服务器里，注意不要改变文件目录，再在预览页面的设置中填写你的图床链接即可

### 对开发者

项目采用 monorepo 的结构，使用 pnpm 管理，因此需要先安装 pnpm：`npm i -g pnpm`

在 packages 目录下：

- [/core](packages/core/) 包含了工具函数、数据处理的核心
- [/ui](packages/ui/) 包含 UI 部分的组件代码
- [/shared](packages/shared/) 不含 vue 的共用 lib 库

在 apps 目录下，为最终的应用

- [/web](apps/web/) 是用于最终查看微博数据的网页，目前托管在 [vercel] 上
- [/monkey](apps/monkey/) 用于打包成油猴脚本
- [/cli](apps/cli) Nodejs 命令行版本

只需要在根目录中 `pnpm i` 即为所有子项目安转依赖，`pnpm dev:monkey` 对应的是在 /monkey 中的 `pnpm dev`

至于运行打包后的结果，由于是静态的资源，可以直接用 nginx 服务，或是运行 `pnpx serve .\.output\public\` 来查看

> 直接部署到 vercel 前，需要先去 vercel 的项目设置中将 Root Directory 设为 `apps/web`，才能正确识别项目并构建

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
[Node.js 官网]: https://nodejs.org/en/download
[vite-plugin-monkey]: https://github.com/lisonge/vite-plugin-monkey
[镜像地址]: https://p.chilfish.top/weibo-archiver.user.js
[项目的 Todo]: https://github.com/Chilfish/Weibo-archiver/issues/7
[赞助地址]: https://chilfish.top/sponsors
[vercel]: https://vercel.com
[使用教程]: https://docs.qq.com/doc/DTWttbXlMUGxZZnZq
[actions]: https://github.com/Chilfish/Weibo-archiver/actions/workflows/beta-build.yml?query=branch:main+event:push+is:success
