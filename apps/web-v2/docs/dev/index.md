# 开发文档

### 项目架构

项目采用 Monorepo 结构，由统一的核心引擎驱动多个应用：

**核心模块**
- **`packages/core`**: 核心引擎，处理微博 API 交互、数据抓取和解析
- **网页端**: 数据查看器，提供美观的微博浏览体验
- **浏览器插件**: 后台数据采集，支持定时备份和数据同步
- **命令行工具**: 高级用户工具，支持批量处理和自动化
- **本地服务器**: 提供离线图片服务，实现完全本地化

**数据流程**
插件/CLI 抓取数据 → 核心引擎处理 → 网页端/本地服务器展示

### 开发快速上手

1.  **安装依赖**:
    - 在项目根目录运行 `pnpm install` 来安装所有工作空间的依赖。

2.  **启动网页端 (Web-v2)**:
    ```bash
     切换到 web-v2 目录
    cd apps/web-v2
     启动开发服务器
    pnpm run dev
    ```
    - 访问 Vite 提供的 `localhost` 地址即可进行开发和调试。

3.  **启动浏览器插件 (Extension)**:
    ```bash
     切换到 extension 目录
    cd apps/extension
     启动 WXT 开发模式
    pnpm run dev
    ```
    - 这会在 `apps/extension/.output/` 目录下生成插件文件。
    - 打开 Chrome/Edge 的 `chrome://extensions/` 页面，或 Firefox 的 `about:debugging#/runtime/this-firefox`。
    - 启用“开发者模式”，点击“加载已解压的扩展程序”，然后选择 `apps/extension/.output/chrome-mv3` (或对应的 firefox-mv3) 目录。

### 技术栈

- **前端**: Vue 3 (网页端), React (插件), TypeScript
- **CLI/工具**: Node.js (CLI), Go (本地服务器)
- **核心库**: TypeScript
- **构建工具**: Vite (网页端), WXT (插件)
- **状态管理**: Pinia (网页端), Zustand (插件)
- **UI 框架**: Shadcn/ui, Tailwind CSS
