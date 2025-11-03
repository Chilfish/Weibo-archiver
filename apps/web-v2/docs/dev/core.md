# `packages/core` 技术架构与 API 文档

## 1. 概述 (Overview)

`packages/core` 是 Weibo Archiver 项目的核心数据处理引擎。它独立于任何特定的用户界面，封装了与新浪微博 API 交互、数据抓取、解析和规范化的所有核心逻辑。该包的目标是提供一套稳定、可重用的服务，供项目中的其他应用（如浏览器扩展、CLI 工具、Web 应用）消费。

该包提供的主要能力包括：

- **API 请求封装**: 提供一个统一的 `FetchService` 来处理对微博 API 的所有请求，包括身份验证（Cookies）和错误处理。
- **数据抓取**: 实现获取用户微博、评论、收藏夹、关注列表等数据的逻辑。
- **数据解析与标准化**: 将来自微博 API 的原始、复杂的 JSON 响应解析为干净、结构化的 TypeScript 对象（如 `Post`, `User`, `Comment`）。
- **高级业务逻辑**: 封装了如“获取指定用户的所有微博”、“获取长微博全文”、“获取所有关注”等复杂的、需要多次 API 调用的业务场景。

## 2. 在项目中的位置与关系 (Role and Relationships)

`packages/core` 是一个底层库，不直接面向最终用户。它是整个项目生态系统的基石，被上层应用所依赖：

- **油猴脚本 (`apps/monkey`)**: 直接调用 `core` 包的服务来抓取在浏览器当前页面看到的数据。
- **浏览器插件 (`apps/extension`)**: 依赖 `core` 包执行后台数据抓取任务，并将解析后的数据存储在浏览器本地。
- **CLI (`apps/cli`)**: 使用 `core` 包提供的服务来执行命令行的批量备份任务。
- **Web 应用 (`apps/web-v2`)**: 虽然主要是数据展示端，但在需要时（例如，未来可能的数据迁移或重新分析）可以利用 `core` 包的解析能力。

**数据流**:
上层应用（调用方）通过实例化 `core` 包中的服务（如 `PostService`, `UserService`）来发起数据请求。`core` 包内部完成与微博服务器的通信，然后将解析和处理完毕的结构化数据返回给调用方。

## 3. 核心概念与数据模型 (Core Concepts & Data Models)

核心设计理念是**分层与解耦**。`FetchService` 专注于“如何获取”，`ParseService` 专注于“如何解析”，而 `PostService` 和 `UserService` 则专注于“提供什么业务能力”。这种设计使得每一层都易于维护和扩展。

以下是核心的数据结构定义，它们是理解和使用 API 的基础。

```typescript
// /packages/core/src/types/user.ts

/**
 * 基础用户对象
 */
export interface User {
  uid: string // 用户唯一ID
  name: string // 用户昵称
  avatar: string // 头像URL
  remark?: string // 备注名 (可选)
}

/**
 * 包含详细信息的用户对象
 */
export interface UserInfo extends User {
  bio: string // 个人简介
  followers: number // 粉丝数
  followings: number // 关注数
  createdAt?: string // 账号创建日期 (可选)
  birthday?: string // 生日 (可选)
  followingIds: string[] // 关注的人的ID列表
}

/**
 * 关注列表中的用户对象
 */
export interface Following extends User {
  followers: number
  followings: number
  bio: string
  location: string
  createdAt: string
}
```

```typescript
// /packages/core/src/types/post.ts

/**
 * 微博评论
 */
export interface Comment {
  id: string
  text: string
  createdAt: string
  regionName: string // 发布地区
  likesCount: number
  commentsCount: number
  floor: number // 楼层号
  user: User
  img?: string // 评论中的图片 (可选)
}

/**
 * 微博中引用的链接卡片 (如文章、视频)
 */
export interface LinkCard {
  link: string
  title: string
  img: string
  desc?: string
}

/**
 * 被转发的微博
 */
export interface Retweet {
  id: string
  mblogid: string
  text: string
  imgs: string[]
  repostsCount: number
  commentsCount: number
  likesCount: number
  user?: User // 转发的作者 (可能因不可见而为空)
  createdAt: string
  source?: string
  regionName: string
}

/**
 * 核心微博对象
 */
export interface Post {
  id: string // 微博ID
  userId: string // 作者ID
  mblogid: string // 微博 mblogid，用于长微博等场景
  text: string // 微博正文 (已处理)
  imgs: string[] // 微博图片URL列表
  repostsCount: number // 转发数
  commentsCount: number // 评论数
  likesCount: number // 点赞数
  createdAt: string // 发布时间
  source?: string // 发布来源 (如 "iPhone客户端")
  regionName: string // 发布地区
  card?: LinkCard // 链接卡片 (可选)
  comments: Comment[] // 评论列表
  retweet?: Retweet // 被转发的微博 (可选)
  isShowBulletIn: '0' | '2' // 是否显示评论弹幕
}

/**
 * 收藏的微博对象
 */
export interface Favorite extends Post {
  favBy: string // 收藏者UID
}
```

## 4. API 参考 (API Reference)

所有服务都通过 `packages/core` 的入口 `index.ts` 导出。

### **FetchService**

负责所有底层的 API 请求。通常不直接使用，而是通过 `PostService` 或 `UserService` 间接调用。

- **构造函数**: `new FetchService(cookies?: string)`
- **功能描述**: 创建一个新的 API 请求服务实例。
- **参数说明**:
  - `cookies` (`string`): [可选] 用于身份验证的微博 Cookie。
- **核心方法**:
  - `setFetcher(cookies: string): Fetcher`: 动态设置或更新 Cookie。

### **UserService**

提供与用户相关的业务逻辑。

- **构造函数**: `new UserService(fetchService: FetchService)`
- **核心属性**:
  - `cookieUid` (`string`): **必须设置**。当前操作用户的数字 UID，用于获取收藏、关注等个人信息。
- **核心方法**:
  - `getDetail(uid?: string): Promise<UserInfo>`
    - **功能描述**: 获取指定用户的详细信息。
    - **参数说明**:
      - `uid` (`string`): [可选] 要查询的用户 UID，如果未提供，则使用 `cookieUid`。
    - **返回值**: `Promise<UserInfo>`: 包含用户详情的对象。

  - `getAllFollowings(args: { uid: string; onFetch?: (result) => any }): Promise<Following[]>`
    - **功能描述**: 获取指定用户的所有关注列表（自动处理分页）。
    - **参数说明**:
      - `uid` (`string`): [必选] 要查询的用户 UID。
      - `onFetch` (`(result: { data: Following[], page: number }) => any`): [可选] 每成功获取一页数据后的回调函数。
    - **返回值**: `Promise<Following[]>`: 包含所有关注用户的数组。

### **PostService**

提供与微博内容相关的业务逻辑。

- **构造函数**: `new PostService(userService: UserService, fetchService: FetchService)`
- **核心方法**:
  - `getAllPosts(args: { uid: string; isFetchAll?: boolean; startAt?: Date|string; endAt?: Date|string; commentsCount?: number; onFetched: (data) => any }): Promise<void>`
    - **功能描述**: 获取一个用户的所有微博。支持全量获取或按日期范围获取。这是一个长期运行的任务，通过回调函数返回数据。
    - **参数说明**:
      - `uid` (`string`): [必选] 目标用户的 UID。
      - `isFetchAll` (`boolean`): [可选] 是否获取全部微博，默认为 `true`。若为 `false`，则必须提供 `startAt`。
      - `startAt` / `endAt` (`Date|string`): [可选] 按时间范围获取时的开始和结束日期。
      - `commentsCount` (`number`): [可选] 每条微博需要同时获取的评论数量，默认为10。
      - `onFetched` (`(data: { posts: Post[], page: number, fetchedCount: number, postsTotal: number }) => any`): [必选] 每获取一批微博数据后的回调。

  - `getFavorites(args?: { onFetch: (posts: Favorite[]) => any }): Promise<Favorite[]>`
    - **功能描述**: 获取当前登录用户的所有收藏（自动处理分页）。
    - **参数说明**:
      - `onFetch` (`(posts: Favorite[]) => any`): [可选] 每成功获取一页收藏后的回调函数。
    - **返回值**: `Promise<Favorite[]>`: 包含所有收藏微博的数组。

  - `getLongText(postMBlogId: string): Promise<string | undefined>`
    - **功能描述**: 获取单条长微博的完整正文。
    - **参数说明**:
      - `postMBlogId` (`string`): [必选] 微博的 `mblogid`。
    - **返回值**: `Promise<string | undefined>`: 完整的微博 HTML 文本，如果获取失败则为 `undefined`。

  - `getComments(postId: string, isShowBulletIn?: '0' | '2', count?: number): Promise<Comment[]>`
    - **功能描述**: 获取单条微博的评论列表。
    - **参数说明**:
      - `postId` (`string`): [必选] 微博的 ID。
      - `isShowBulletIn` (`'0' | '2'`): [可选] 微博的评论弹幕设置，影响评论接口。
      - `count` (`number`): [可选] 希望获取的评论数量，默认为 20。
    - **返回值**: `Promise<Comment[]>`: 评论对象数组。

### **解析服务 (Parsers)**

这些类通常在服务内部使用，但了解它们有助于理解数据转换过程。

- **`WeiboParser.parseAll(rawData: RawPost[]): Post[]`**: 将原始微博 API 响应数组解析为 `Post` 对象数组。
- **`WeiboParser.parseBookmarks(rawData: RawFavorite[], favBy: string): Favorite[]`**: 将原始收藏 API 响应数组解析为 `Favorite` 对象数组。
- **`UserParser.parse(user: any): UserInfo`**: 将原始用户对象解析为 `UserInfo`。
- **`PostParser.parse(rawPost: RawPost): Post | undefined`**: 将单条原始微博对象解析为 `Post`。

### **工具函数 (Utils)**

`utils` 目录提供了一系列可重用的辅助函数和类。

- **`createFetcher(args): Fetcher`**
  - **文件**: `utils/fetch.ts`
  - **功能描述**: 创建一个 `axios` 实例，用于向微博 API 发送请求。它封装了 `baseURL`、`headers`，并对返回数据进行了预处理，检查 `ok` 字段并抛出自定义的 `WeiboError`。
  - **参数说明**:
    - `args` (`CreateAxiosDefaults & { beforeFetch?: (path: string) => any }`): [必选] `axios` 的配置对象，并可额外传入一个在请求前执行的 `beforeFetch` 钩子。
  - **返回值**: `Fetcher`: 一个异步函数，用于执行具体的 API 请求。

- **`PQueue`**
  - **文件**: `utils/pqueue.ts`
  - **功能描述**: 一个简单的 Promise 队列，用于控制并发请求数量，防止因请求过于频繁而被 API 限制。
  - **构造函数**: `new PQueue(options?: { concurrency: number })`
    - `concurrency`: [可选] 最大并发数，默认为 `Infinity`。
  - **核心方法**:
    - `add<T>(fn: () => Promise<T>): Promise<T>`: 向队列中添加一个返回 Promise 的函数，并返回该 Promise。
    - `onIdle(): Promise<void>`: 返回一个在队列完全空闲（所有任务完成）时解析的 Promise。

- **`IndexedDB`**
  - **文件**: `utils/IndexedDB.ts`
  - **功能描述**: `Dexie.js` 的封装，为浏览器环境提供了一个结构化的本地数据库。它定义了 `users`, `posts`, `followings`, `favorites` 等数据表，并提供了对这些数据进行增删改查的便捷方法。
  - **构造函数**: `new IndexedDB()`
  - **核心方法**:
    - `addPosts(posts: Post[]): Promise<void>`: 批量添加微博到数据库。
    - `getPosts(page: number, pageSize: number): Promise<Post[]>`: 分页查询微博。
    - `setCurUser(userId: string): Promise<void>`: 设置当前操作的用户，后续查询将基于此用户进行。

- **`emitter`**
  - **文件**: `utils/emitter.ts`
  - **功能描述**: 一个微型的发布/订阅（Pub/Sub）事件发射器（基于 `mitt`）。用于在应用的不同部分之间解耦通信。
  - **核心方法**:
    - `on(type, handler)`: 监听一个事件。
    - `off(type, handler)`: 取消监听。
    - `emit(type, event)`: 触发一个事件。

- **`WeiboError`**
  - **文件**: `utils/error.ts`
  - **功能描述**: 自定义错误类，用于表示与微博 API 相关的特定错误（如登录过期、请求失败等），方便上层进行针对性的捕获和处理。
