chcp 65001
@echo off

echo Weibo-archiver v0.3.6

set /p imgsPath=请输入 imgs.csv 文件的完整路径（留空则使用默认路径） 

node download.mjs %imgsPath%
pause
