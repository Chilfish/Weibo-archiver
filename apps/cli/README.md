## Weibo-archiver CLI 版本

运行方式：`node weibo-archiver.mjs 参数`

默认保存在 `~/weibo-archiver/{uid}` 中（Windows 下 `~` 代指 `C:\Users\{你的用户名}`）

具体参数如下

```bash
USAGE weibo-archiver [OPTIONS] --uid

OPTIONS

     --uid (required)    微博用户的 uid
           --savePath    微博数据的保存路径
             --cookie    微博的 cookie
         --no-restart    是否重新开始抓取
            --startAt    开始时间（YYYY-MM-DD）
              --endAt    结束时间（YYYY-MM-DD）
        --no-fetchAll    是否抓取全部微博（优先级高于范围获取）
        --no-largePic    是否导出为原图
       --no-repostPic    是否导出转发的图片
          --no-repost    是否导出转发
         --no-comment    是否导出评论
          --weiboOnly    是否只导出微博
  --commentCount="10"    导出评论的数量
         --proxyAgent    代理地址
```

微博数据的保存方式：以 `(meta | data)-${uid}.json` 的形式命名（meta 为用户元数据，data 为微博数据），追加的形式保存在 `savePath` 目录下。

- 默认不保留上次的进度，除非传入 `--no-restart` 参数
- uid 是必传参数，可在微博网页版点击用户头像后，地址栏中的 `https://weibo.com/u/${uid}` 中获取
- 首次爬取需要传入 cookie 参数，以后会保存在该用户的配置文件中

如下图获取该用户的 cookie，经测试，只需要其中的 `SUB=xxx; SUBP=xxx;` 这一段就行了

![get-cookie.webp](https://p.chilfish.top/get-cookie.webp)

一些详细的细节可见 [说明文档](https://docs.qq.com/doc/DTWttbXlMUGxZZnZq)

### 例子

如果要按时间范围筛选，并只导出微博数据：

```bash
node weibo-archiver.mjs --uid=1 --startAt=2021-12-12 --endAt=2024-01-20 --restart=false --weiboOnly
```

如果要指定保存路径，记得要在第一次设置时也要传入 cookie 参数，因为配置文件是跟随保存路径的

```bash
node weibo-archiver.mjs --uid=1 --savePath=D:/backups/my-weibo --cookie=your_cookie
```
