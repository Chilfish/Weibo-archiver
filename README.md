<div align="center">
  <img
    alt="logo"
    width="100"
    src="https://p.chilfish.top/weibo/icon.webp"
  />

  <div>
    <a href="https://deepwiki.com/Chilfish/Weibo-archiver"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
    <img src="https://wakatime.com/badge/user/0842a71f-c026-4b09-8aa0-f8398b4c3423/project/3416f224-f0dc-4b08-805c-af30dbd396b2.svg" alt="wakatime">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/chilfish/weibo-archiver">
    <img alt="GitHub Downloads" src="https://img.shields.io/github/downloads/chilfish/weibo-archiver/total">
    <img alt="beta build" src="https://github.com/Chilfish/Weibo-archiver/actions/workflows/beta-build.yml/badge.svg">
  </div>
</div>

## Weibo-archiver

将你的新浪微博回忆归档，为号被完全夹没前未雨绸缪 😭 官网：[weibo-archiver.chilfish.top](https://weibo-archiver.chilfish.top)

![封面](https://p.chilfish.top/weibo/cover.webp)

### 使用方式

可以详见 [在线文档] 说明

> 旧版本可见 [v0.5 分支](https://github.com/Chilfish/Weibo-archiver/tree/v0.5) 或是 https://weibo.chilfish.top/ ，可见 [文档：从旧版本迁移](https://weibo-archiver.chilfish.top/docs/intro.html#从旧版本迁移) 部分说明

### 对开发者

项目采用 monorepo 的结构，使用 pnpm 管理，因此需要先安装 pnpm：`npm i -g pnpm`

在 packages 目录下：

- [/core](packages/core/) 包含了工具函数、数据处理的核心

在 apps 目录下，为最终的应用

- [/web](apps/web-v2/) 是用于最终查看微博数据的网页，目前托管在 [vercel] 上
- [/monkey](apps/monkey/) 用于打包成油猴脚本
- [/cli](apps/cli) Nodejs 命令行版本

> 直接部署到 vercel 前，需要先去 vercel 的项目设置中将 Root Directory 设为 `apps/web-v2`，才能正确识别项目并构建

在 server 目录下是使用 go 语言编写的一个本地服务器，用于下载图片和浏览微博数据，具体使用方法可见 [本地服务器使用说明](server/README.md)

### 鸣谢

- 感谢 [speechless] 提供的基本思路
- [vite-plugin-monkey] 提供了打包成油猴脚本的工具
- Shadcn/ui 提供的漂亮 UI 组件库
- [vercel] 提供的在线云平台部署😚
- Github Copilot & v0.dev 😇

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
[微博网页版]: https://weibo.com
[在线文档]: https://weibo-archiver.chilfish.top/docs/
