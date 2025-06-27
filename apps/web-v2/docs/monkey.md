# 油猴脚本

油猴脚本是 Weibo Archiver 项目中最易于上手的工具，它直接在你的浏览器中运行，让你在浏览微博的同时就能方便地进行备份。

## 如何使用油猴脚本备份微博？

首先需要在浏览器中安装 [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) 插件，建议使用较新版本的浏览器，以免出现页面混乱等问题

然后安装 [weibo-archiver.user.js](https://p.chilfish.top/weibo/weibo-archiver.user.js) 脚本文件，在微博网页版按以下步骤运行即可。

1. **确保已登录微博：** 在使用脚本前，请务必先在浏览器中登录你的微博网页版 (https://weibo.com)。在页面的右上角会有脚本的logo。
2. **搜索需要备份的用户：** 在脚本的界面输入框中使用用户名或用户的数字id搜索用户。
3. **启动备份：** 点击脚本提供的备份按钮。你可能看到一些选项，例如：
    - 是否包含评论
    - 是否按时间范围筛选
    - 是否继续上次的记录（如果之前备份中断过）
4. **耐心等待：** 脚本会自动翻页并抓取微博内容。
5. **保存结果：** 备份完成后，脚本会提示你下载数据文件。通常包含：
     - `weibo-data.json`：这是主要的微博数据文件，包含了微博文字、时间、转发、评论（部分）等信息。
     - `imgs.csv`：这是一个记录了所有微博中图片原始链接的文件。你需要配合后面的“本地服务器”工具来下载这些图片。

之后就能将这份 json 文件导入到 [在线网页版](https://weibo-archiver.chilfish.top/post) 中查看了🥳
