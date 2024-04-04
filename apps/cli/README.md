## Weibo-archiver CLI 版本

运行方式：`node weibo-archiver.mjs 参数`

首次运行将生成配置文件 `~/.config/weibo-archiver.json` （Windows 下 `~` 代指 `C:\Users\{你的用户名}`）

具体参数如下

```bash
USAGE weibo-archiver [OPTIONS]

OPTIONS

                           --uid    微博用户的 uid
  --savePath="~/weibo-archiver/"    微博数据的保存路径
                        --cookie    微博的 cookie
                    --no-restart    是否重新开始获取
                       --startAt    开始时间（YYYY-MM-DD）
                         --endAt    结束时间（YYYY-MM-DD）
                   --no-fetchAll    是否抓取全部微博（优先级高于范围获取）
                   --no-largePic    是否导出为原图
                  --no-repostPic    是否导出转发的图片
                     --no-repost    是否导出转发
                    --no-comment    是否导出评论
                --followingsOnly    是否只导出关注的人
             --commentCount="10"    导出评论的数量
                    --proxyAgent    代理地址
```

微博数据的保存方式：以 `(meta | data)-${uid}.json` 的形式命名（meta 为用户元数据，data 为微博数据），追加的形式保存在 `savePath` 目录下。

### 例子

若不带任何参数，则从配置文件的设置开始，默认不保留上次的进度。

如果要按时间范围筛选：

```bash
node weibo-archiver.mjs --uid=1 --no-fetchAll --startAt=2021-12-12 --endAt=2024-01-20
```
