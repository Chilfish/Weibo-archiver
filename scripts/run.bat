chcp 65001

@echo off
title 微博备份工具

:begin
cd %~dp0

echo 请选择要执行的操作：
echo 1. 下载微博配图
echo 2. 查看微博备份
echo 3. 合并新微博数据
set /p UserChoice="请输入您的选择（1、2 或 3）: "

if "%UserChoice%"=="1" (
  set /p UserID="请输入微博账号ID: "
  node ./download.mjs -u %UserID%
  pause
) else if "%UserChoice%"=="2" (
  node ./server.mjs
  pause
) else if "%UserChoice%"=="3" (
  node ./merge.mjs
  pause
) else (
  echo 无效的选择，请输入1、2或3。
  goto begin
)
