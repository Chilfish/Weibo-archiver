chcp 65001
@echo off

set /p imgsPath=请输入 imgs.csv 文件的完整路径（留空则使用默认路径） 

node download.mjs -i %imgsPath%
pause
