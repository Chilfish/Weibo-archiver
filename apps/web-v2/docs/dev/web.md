# Weibo Archiver 网页版开发文档

**目标读者**: 本文档面向具备 Vue 3, TypeScript, 和 Pinia 开发经验的开发者，旨在帮助他们快速理解项目架构、核心流程和开发规范。

### 1. 技术栈总览 (Tech Stack Overview)

根据项目配置文件 (`package.json`, `vite.config.ts`)，项目采用现代前端技术栈构建。

- **框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript (同时使用 `.ts` 和 `.tsx` 以发挥各自优势)
- **路由**: Vue Router 4.x
- **状态管理**: Pinia
- **UI 组件库**: shadcn-vue (基于 Radix Vue)，结合自定义组件
- **样式**: Tailwind CSS
- **测试与文档**:
    - **Vitest**: 用于单元/组合测试。
    - **Storybook**: 用于组件的隔离开发、测试和文档化展示。

### 2. 项目架构与设计理念 (Architecture & Design Philosophy)

- **整体架构**: 本应用是一个纯客户端的单页应用 (SPA)，专门用于查看和浏览通过 Weibo Archiver 其他工具导出的 `weibo-data.json` 备份文件。
- **核心设计**: 严格遵循 **“无后端、数据本地化”** 原则。所有的数据导入、解析、处理和展示完全在用户浏览器内部完成，不依赖任何远程服务器。这最大化地保证了用户的隐私和数据安全。关闭或刷新页面后，内存中的数据会丢失，需要重新导入。
- **组件化策略**: 项目采用高度组件化的开发模式。代码通过 `pages` (页面级组件), `components` (可复用UI组件), 和 `composables` (复用逻辑) 进行组织，实现了良好的功能解耦和逻辑复用。

### 3. 目录结构详解 (Directory Structure Breakdown)

`src` 目录是应用的核心，其结构清晰地反映了功能划分。

- `src/pages`: 页面级组件，直接与 `vue-router` 的路由规则对应。
    - `index.vue`: 应用主页，展示微博时间线。
    - `album.vue`: 相册页面，网格布局展示所有图片。
    - `followings.vue`: 关注列表页面，使用表格展示用户数据。
    - `search.vue`: 搜索结果展示页。
    - `sync.vue`: 用于与浏览器插件等其他数据源进行同步的页面。

- `src/components`: 可复用的 UI 组件，按功能或领域进行分组。
    - `common`: 项目通用的基础组件，如 `Pagination.vue`, `ImageGallery.vue`, `ImportData.vue`。是构建页面的基础。
    - `weibo`: 专门用于展示微博内容的组件，如 `WeiboCard.vue` (微博卡片), `WeiboProfile.vue` (用户信息), `WeiboComments.vue` (评论区)。
    - `settings`: 设置页面相关的组件，如 `GeneralSettings.vue`。
    - `followings`: 关注列表页面的表格组件，如 `DataTable.vue` 和 `dataColumns.tsx`，展示了如何结合 TSX 构建复杂表格。
    - `album`: 相册页相关组件，如 `AlbumPhotos.vue`。
    - `ui`: 由 `shadcn/ui` CLI 自动生成的底层 UI 组件，不应手动修改。

- `src/stores`: Pinia 状态管理模块，是应用的“单一数据源”。
    - `postStore.ts`: **核心数据仓库**。负责管理所有微博 (`Post`) 数据。包括存储微博列表、处理分页、执行搜索和过滤等。
    - `userStore.ts`: 负责管理用户 (`User`) 数据，包括当前登录用户信息和所有在微博中出现过的用户信息。

- `src/composables`: Vue Composition API 的可复用逻辑钩子 (Hooks)。
    - `useSearch.ts`: 封装了客户端搜索逻辑，与 `SearchBar.vue` 和 `search.service.ts` 协同工作。
    - `useSync.ts`: 推断是处理与浏览器扩展数据同步的逻辑。
    - `usePingExtension.ts`: 用于检测和通信浏览器扩展的钩子。
    - `useMessage.ts`: 封装了消息提示（如 Toast 或 Notification）的功能，提供统一的反馈API。

- `src/lib`: 存放非 Vue 响应式的纯 TypeScript/JavaScript 工具函数或服务。
    - `search.service.ts`: 提供了核心的搜索算法实现。它接收数据和查询字符串，返回匹配结果，被 `useSearch.ts` 调用。将搜索算法与Vue逻辑解耦，便于独立测试和优化。
    - `importFromExt.ts`: 实现了从浏览器扩展导入数据的具体逻辑。
    - `utils.ts`: 通用的辅助函数（如日期格式化、数据转换等）。

- `src/routes`: `vue-router` 的路由配置文件 (`index.ts`)。

- `src/types.ts`: 定义了项目全局共享的 TypeScript 类型，如 `Post`, `User` 等。是保证代码类型安全的基础。

- `src/stories`: Storybook 的故事文件，用于在隔离环境中开发、测试和文档化UI组件。

### 4. 核心流程与数据流分析 (Core Workflow & Data Flow)

#### 用户故事：首次使用

1.  **访问应用**: 用户打开网页，看到一个欢迎界面 (`Landing.tsx`)，引导其导入数据。
2.  **导入数据**: 用户点击导入按钮 (`ImportData.vue`)，选择本地的 `weibo-data.json` 文件。
3.  **解析与存储**: 文件内容在浏览器中被读取和解析。
4.  **状态初始化**: 解析后的数据被送入 Pinia 的 `postStore` 和 `userStore`。
5.  **渲染视图**: `postStore` 更新后，`index.vue` 页面监听到状态变化，从 `postStore` 获取第一页的微博数据，并通过 `v-for` 循环渲染出一系列 `WeiboCard.vue` 组件，形成时间线。
6.  **完成**: 用户现在可以看到自己的微博备份了。

#### 数据流图 (Text-based Flowchart)

```
[User Action: Selects JSON file]
       |
       v
[Component: ImportData.vue]
   - Reads & Parses File
       |
       v
[Pinia Action: postStore.init(data)]
   - Saves all posts to state
   - Calculates total pages
       |
       v
[Pinia Action: userStore.init(data)]
   - Extracts and saves user info
       |
       v
[Reactive State Updated]
   - postStore.posts
   - postStore.totalPages
   - userStore.users
       |
       v
[Vue Component: index.vue]
   - Reads state from postStore
   - Re-renders UI with WeiboCard components
```

#### 交互数据流 (例如：分页)

```
[User Action: Clicks page 2]
       |
       v
[Component: Pagination.vue]
   - Emits 'update:page' event
       |
       v
[Page: index.vue]
   - Calls Pinia Action: `postStore.setCurrentPage(2)`
       |
       v
[Pinia Mutation]
   - Updates `postStore.currentPage` state to 2
       |
       v
[Vue Component: index.vue]
   - Computed property for current page's posts re-evaluates
   - UI automatically updates to show posts for page 2
```

### 5. 关键模块实现解析 (Key Modules Deep Dive)

- **客户端搜索**:
    1.  **UI层**: `SearchBar.vue` 捕获用户输入的搜索词。
    2.  **逻辑层**: 它调用 `useSearch.ts` composable 中的函数。
    3.  **协调层**: `useSearch.ts` 从 `postStore` 获取全量微博数据，并调用 `search.service.ts`。
    4.  **服务层**: `search.service.ts` 执行高效的文本匹配算法，返回过滤后的结果。
    5.  **状态更新**: 结果被存储在 `postStore` 的一个专门用于搜索结果的 state 中，并导航到 `search.vue` 页面进行展示。这种分层确保了UI、业务逻辑和纯算法的解耦。

- **数据同步/迁移**:
    - `sync` 页面 (`pages/sync.vue`) 和相关组件 (`sync/ArchiveConfiguration.tsx`, `bookmarks/BookmarkMigrationDialog.vue`) 提供了与外部数据源（主要是浏览器扩展）交互的能力。
    - `usePingExtension.ts` 和 `useSync.ts` 封装了与扩展通信的逻辑，可能使用 `window.postMessage` 或 `chrome.runtime.sendMessage` API。
    - `importFromExt.ts` 负责处理从扩展接收到的数据，并将其适配到当前应用的数据结构中，最终通过 Pinia Store 更新状态。

- **TSX 驱动的数据表格**:
    - `followings` 目录展示了一种使用 `.tsx` 文件来构建复杂数据表格的先进模式。
    - **为什么用TSX?**: 对于需要程序化生成、逻辑复杂的渲染内容（如表格列），TSX比Vue模板提供了更强的类型检查和编程灵活性。
    - `dataColumns.tsx`: 利用 TSX 的灵活性定义表格的列、表头以及单元格的渲染逻辑，可以轻松嵌入自定义组件（如 `Avatar.vue`）并享受完整的TypeScript类型提示。
    - `DataTable.vue`: 是一个通用的表格框架组件，它接收 `columns` (来自 `dataColumns.tsx`) 和 `data` (来自 `userStore`) 作为 props。
    - `FollowingsTable.vue` 将所有部分组合在一起，渲染出功能完整的关注列表，包括排序、分页等。

### 6. 新开发者上手指南 (Onboarding Guide)

#### 环境设置

项目使用 `pnpm` 作为包管理器。首先，在 **项目根目录** 运行：
```bash
pnpm install
```
此命令会安装所有工作空间（包括 `web-v2`）的依赖。

#### 启动开发环境

```bash
 切换到 web-v2 目录
cd apps/web-v2
 启动开发服务器，支持热模块替换 (HMR)
pnpm run dev
```
现在可以在浏览器中打开 `http://localhost:5173` (或Vite指定的其他端口) 查看应用。

#### 组件开发 (推荐流程)

强烈推荐使用 Storybook 进行组件的隔离开发。这能帮助你专注于单个组件的 UI 和逻辑，而无需运行整个应用。

```bash
 在 web-v2 目录下运行
pnpm run storybook
```
访问 Storybook 的 URL，你可以在这里看到所有组件的文档和不同变体。
