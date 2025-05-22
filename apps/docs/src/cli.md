# 使用CLI爬取

Weibo Archiver CLI (Command Line Interface，命令行界面工具) 是为有一定技术背景或希望进行更精细化备份的用户设计的。它允许你通过在终端输入命令来下载和归档微博用户的微博、评论、图片、关注列表和收藏列表。

**你需要什么？**

- **Node.js 环境：** CLI 工具是基于 Node.js 开发的。你需要先在你的电脑上安装 Node.js。你可以从 Node.js 官网 ([https://nodejs.org/](https://nodejs.org/)) 下载并安装适合你操作系统的版本（推荐 LTS 长期支持版）。安装 Node.js 时，通常会自动安装 npm（Node 包管理器）。
- **pnpm (可选但推荐)：** pnpm 是一个快速、节省磁盘空间的包管理工具。你可以通过 npm 来安装它：在终端输入 `npm install -g pnpm`。

## 安装使用

```bash
pnpm add -g weibo-archiver@latest
```

```bash
weibo-archiver [参数]
```

## 参数选项

| 参数                | 描述                             | 类型        | 是否必需  | 默认值     |
|:------------------|:-------------------------------|:----------|:------|:--------|
| `--uid`           | 用户的数字 ID (必填)                  | `string`  | **是** |         |
| `--cookie`        | 微博登录的 Cookie 字符串               | `string`  | 否     |         |
| `--fetchAll`      | 是否获取所有数据 (若为 `false`，则尝试增量更新)  | `boolean` | 否     | `true`  |
| `--hasRepost`     | 是否包含转发的微博                      | `boolean` | 否     | `true`  |
| `--hasComment`    | 是否包含微博的评论                      | `boolean` | 否     | `true`  |
| `--repostPic`     | 是否包含转发微博中的图片                   | `boolean` | 否     | `true`  |
| `--commentCount`  | 每条微博获取的评论数量上限                  | `number`  | 否     | `5`     |
| `--sinceId`       | 从此微博 ID 之后开始获取 (爬取全部微博所需的游标)   | `string`  | 否     | `""`    |
| `--startAt`       | 开始日期 (格式: `YYYY-MM-DD`)，用于筛选微博 | `string`  | 否     |         |
| `--endAt`         | 结束日期 (格式: `YYYY-MM-DD`)，用于筛选微博 | `string`  | 否     |         |
| `--curPage`       | 从指定的微博列表页码开始获取 (一般无需手动设置)      | `number`  | 否     | `1`     |
| `--hasFollowings` | 是否爬取用户的关注列表                    | `boolean` | 否     | `true`  |
| `--hasFavorites`  | 是否爬取用户的收藏列表                    | `boolean` | 否     | `true`  |
| `--hasWeibo`      | 是否爬取用户的微博列表                    | `boolean` | 否     | `true`  |
| `--useConfig`     | 是否使用配置文件中的设置 (见下文)             | `boolean` | 否     | `false` |

**配置文件 (`config.json`)**

当你首次成功为一个用户（或在一个新的保存路径下）归档数据后，工具会在该用户的保存目录下（例如 `~/.config/weibo-archiver/{uid}/config.json`）创建一个 `config.json` 文件。

- **用途：** 这个文件会保存你的 `cookie`（这样下次运行时就不用再手动输入了）等配置。
- **使用：** 如果你想使用配置文件中的设置，可以在命令中加入 `--useConfig` 参数。

### 核心参数说明

**`--uid <用户ID>` (必填项):** 这是你想要备份的微博用户的数字 ID。

**如何获取UID：** 在浏览器中通过点击头像打开目标用户（比如你自己或其他人）的微博主页，查看浏览器地址栏。地址通常是 `https://weibo.com/u/xxxxxxxxxx` 或。其中 `xxxxxxxxxx` 这串数字就是用户 UID。

**`--cookie "<你的微博Cookie>"`:** Cookie 是一小段文本信息，它包含了你的登录状态。备份微博（尤其是他人微博或需要登录才能看的内容）时，必须提供有效的 Cookie。

**如何获取 Cookie：**

1.  在你的网页浏览器（如 Chrome, Edge）中登录你的微博账号。
2.  按下 `F12` 键，打开浏览器的“开发者工具”。
3.  切换到“网络 (Network)”或“网络请求 (Network requests)”标签页。
4.  在“筛选器 (Filter)”中输入 `statuses` 或者 `home`，然后刷新一下你的微博首页，或者点击任何一个微博相关的请求。
5.  在请求列表中，找到一个发往 `weibo.com` 或 `m.weibo.cn` 的请求。点击它。
6.  在右侧（或下方）的详情面板中，找到“请求标头 (Request Headers)”部分。
7.  在请求标头里，找到名为 `Cookie:` 的一行，它后面跟着的一长串文本就是你的 Cookie 值。**完整复制这一整串内容 (不要包含 `Cookie:` 这几个字本身)**。

![get-cookie.webp](https://p.chilfish.top/get-cookie.webp)

**注意：** Cookie 包含你的登录凭证，非常敏感！请妥善保管，**绝对不要泄露给任何人或在不安全的网络环境中使用。**

## 数据保存位置

默认情况下，备份的数据会保存在用户配置目录下的 `weibo-archiver/{uid}` 文件夹中。

- **Windows:** `C:\Users\{你的用户名}\.config\weibo-archiver\{uid}`
- **macOS:** `/Users/{你的用户名}/.config/weibo-archiver/{uid}`
- **Linux:** `/home/{你的用户名}/.config/weibo-archiver/{uid}`

> (`{你的用户名}` 和 `{uid}` 会替换为实际的名称和用户ID)

## 使用示例

**首次完整备份某个用户的全部微博数据 (需要提供 cookie)：**

```bash
pnpm dlx weibo-archiver@latest --uid=1234567890 --cookie="这里粘贴你复制的Cookie字符串"
```

> *(请将 `1234567890` 替换为实际的用户 UID，并将 `"这里粘贴你复制的Cookie字符串"` 替换为你真实的 Cookie 值)*

**使用已保存的配置文件进行增量更新 (假设之前已备份过该用户)：**

```bash
pnpm dlx weibo-archiver@latest --uid=1234567890 --useConfig --fetchAll=false
```

**按时间范围筛选，并且只导出微博帖子 (不包含转发、评论、关注和收藏)：**

```bash
pnpm dlx weibo-archiver@latest --uid=1234567890 --cookie="你的Cookie" --startAt="2023-01-01" --endAt="2023-12-31" --hasWeibo=true --hasRepost=false --hasComment=false --hasFollowings=false --hasFavorites=false
```

**仅备份用户的关注列表和收藏列表 (不备份微博帖子)：**

```bash
pnpm dlx weibo-archiver@latest --uid=1234567890 --cookie="你的Cookie" --hasWeibo=false --hasFollowings=true --hasFavorites=true
```
