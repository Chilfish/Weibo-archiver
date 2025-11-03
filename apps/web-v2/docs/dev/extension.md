# Weibo Archiver 浏览器插件开发文档

### 1. 技术栈总览 (Tech Stack Overview)

- **插件开发框架**: [WXT](https://wxt.dev/) - 提供模块化、自动化的现代插件开发体验。
- **UI 框架**: [React](https://react.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand) - 用于 `popup` 和 `window` 页面的 UI 状态管理。
- **持久化存储**: [@webext-core/storage](https://github.com/webext-core/webext-core) - 对 `browser.storage.local` 的类型安全封装。
- **内部通信**: 自定义 `tipc` RPC 框架 (基于 `webext-bridge`) - 实现了插件各部分之间端到端的类型安全远程过程调用。
- **UI 组件库**: [Shadcn/ui](https://ui.shadcn.com/)
- **CSS**: [Tailwind CSS](https://tailwindcss.com/)

### 2. 插件架构与设计理念 (Architecture & Design Philosophy)

- **整体架构**: 一个基于 WXT 构建的 Manifest V3 插件，其核心是**面向服务的架构**和**类型安全的远程过程调用 (RPC)**。
- **设计核心 - `tipc`**: 项目实现了一个受 tRPC 启发的微型 RPC 框架 `tipc`。该框架定义了严格的 API 契约，使得 `popup`, `background`, `content` 脚本之间的通信如同调用本地函数一样简单和安全，完全消除了运行时因消息格式不匹配导致的风险。
- **关注点分离**: 插件的三个主要入口 (`background`, `content`, `popup`) 职责清晰：`background` 是纯粹的业务逻辑服务端；`popup` 是纯粹的客户端 UI；`content` 则是连接 `background` 与外部网页的专用双向桥梁。

### 3. 目录结构与入口详解 (Directory Structure & Entrypoints)

- `entrypoints`: WXT 框架的核心，定义了插件的所有入口点。
    - **`background/index.ts`**: **后台 RPC 服务端与总控制器**。
        - **初始化**: 插件启动时，该脚本执行 `initialize` 函数，完成以下核心任务：
            1.  **注册 RPC 路由**: 调用 `createTipcHandler` 两次，分别将 `window_background_router` 和 `popup_background_router` 中定义的所有 RPC 过程（Procedures）注册到 `webext-bridge` 的消息监听器上。这使得 `background` 能够响应来自不同上下文的类型安全调用。
            2.  **初始化服务**: 调用 `setupUserService` 和 `taskScheduler.initializeTaskSchedules()` 来准备网络服务和加载计划任务。
            3.  **追踪目标标签页**: 调用 `setupTab` 监听标签页更新，使用 `alien-signals` 的 `curTabId` 来实时记录项目网页版的标签页 ID。此 ID 用于在执行长时任务（如 `fetchAllPosts`）时，将进度消息准确地定向发送回发起请求的页面。
    - **`content/index.ts`**: **双向 RPC 桥梁**。
        - **职责**: 其唯一职责是作为通信桥梁，连接浏览器插件的内部世界与外部的网页世界。
        - **初始化**: 脚本被注入页面后，会执行以下操作：
            1.  **对内服务**: 调用 `createTipcHandler` 注册 `background_content_router` 和 `popup_content_router`，使 `background` 和 `popup` 可以调用它在 `content` 上下文中执行的 RPC 过程（如 `getLocalUsers`）。
            2.  **对外开放**: 调用 `allowWindowMessaging`，允许它接收来自宿主页面（如 `weibo-archiver.chilfish.top`）通过 `window.postMessage` 发送的消息，从而将外部请求桥接到插件内部的 RPC 网络。
    - **`popup`**: **React UI 客户端**。
        - `main.tsx`: 标准的 React 应用入口，负责将根组件 `App.tsx` 渲染到 `index.html` 的 `#root` 元素中。
        - `App.tsx`: (推断) Popup 的根组件。负责搭建整个应用的组件树，包括设置 UI 主题、初始化 `tipc` 客户端，并通过 React Context 将该客户端实例提供给所有子组件，以便它们可以发起 RPC 调用。

- `lib`: 插件的核心业务逻辑与工具库。
    - **`message.ts`**: **项目通信的神经中枢**。此文件使用 `tipc` 定义了整个插件的 RPC API 契约，导出了多个 `router`，如 `popup_background_router` 和 `window_background_router`。
    - **`storageManager.ts`**: **唯一数据持久化服务**。基于 `@webext-core/storage` 实现，不仅提供类型安全的 CRUD，还内置了数据去重、排序、任务清理、数据导入导出等关键业务逻辑。

- `types/storage.ts`: 定义了 `StorageSchema` 和所有持久化数据的 TypeScript 接口，是数据安全的基石。

### 4. 核心流程与通信机制 (Core Workflows & Communication)

1.  **任务更新流程 (Popup -> Background via `tipc`)**:
    - 用户在 `popup` UI 中操作，触发 `useTaskOperations.ts` hook。
    - 该 hook 调用 `tipc` 客户端的方法，例如 `client.updateTask({ ... })`。
    - `tipc` 客户端将此调用转换为 `webext-bridge` 消息（包含过程名 `updateTask` 和参数）并发送给 `background`。
    - `background` 的 `tipc` 处理器接收到消息，根据过程名 `updateTask` 找到对应的 `action` 函数并执行，进而调用 `taskScheduler` 完成业务逻辑。

2.  **全量微博抓取流程 (Web App -> Background -> Web App)**:
    - 用户在项目网页版点击“开始备份”。
    - 网页版通过 `window.postMessage` 通知 `content` 脚本。
    - `content` 脚本桥接此请求，调用 `tipc` 客户端的 `fetchAllPosts` 过程。
    - `background` 服务接收到调用，开始执行 `fetchManager.fetchAllWeibo`。在抓取过程中，`fetchManager` 会定期调用 `sendMessage('fetch:all-posts-paged', ...)`。
    - 这个 `sendMessage` 调用会利用 `curTabId` 信号量中存储的 ID，确保进度消息被准确地发送回发起请求的那个网页标签页，从而实现实时进度更新。

### 5. 状态与数据管理 (State & Data Management)

- **持久化数据 (Source of Truth)**: `chrome.storage.local` 是唯一的数据源，由 `lib/storageManager.ts` 进行独占式、类型安全的管理。
- **UI 状态**: `popup` 中的 Zustand stores 是 UI 的状态容器。它们的数据通过 `tipc` 调用从 `background` 服务获取和初始化。UI 组件不直接修改持久化数据，而是通过调用 `tipc` 过程来请求后台服务进行修改。
- **数据同步与响应**: UI 的实时更新主要依赖 `chrome.storage.onChanged` 事件。当 `background` 服务通过 `storageManager` 更新数据后，监听 `storage` 变化的 hooks 会得到通知，进而更新 Zustand store，最终触发 React 组件的重新渲染。

### 6. 开发设置 (Development Setup)

1.  **安装依赖**:
    - 首先，请确保已在项目根目录运行 `pnpm install` 安装了所有依赖。

2.  **启动开发模式**:
    ```bash
     切换到 extension 目录
    cd apps/extension
     启动 WXT 开发模式，它会监听文件变化并自动重新构建
    pnpm run dev
    ```

3.  **加载到浏览器**:
    - WXT 会在 `apps/extension/.output/` 目录下生成特定于浏览器的插件文件。
    - **对于 Chrome/Edge**:
        - 打开 `chrome://extensions/` 页面。
        - 启用右上角的“开发者模式”。
        - 点击“加载已解压的扩展程序”。
        - 选择 `apps/extension/.output/chrome-mv3` 目录。
    - **对于 Firefox**:
        - 打开 `about:debugging#/runtime/this-firefox` 页面。
        - 点击“临时载入附加组件”。
        - 选择 `apps/extension/.output/firefox-mv3/manifest.json` 文件。

- 插件加载后，你对代码的任何修改都会被 WXT 自动检测到，并重新构建。通常，你只需要在浏览器的扩展管理页面点击“刷新”按钮即可看到更新。
