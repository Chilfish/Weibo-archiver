#!/bin/bash

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"
TMP_DIR="$SCRIPT_DIR/tmp"

# 创建输出目录
mkdir -p "$OUT_DIR"
mkdir -p "$TMP_DIR"
rm -rf "$OUT_DIR"/*
rm -rf "$TMP_DIR"/*

# 从 package.json 读取版本号
if command -v jq >/dev/null 2>&1; then
    # 如果有 jq 命令，使用它来解析 JSON
    VERSION="v$(jq -r '.version' "$SCRIPT_DIR/../package.json")"
else
    # 如果没有 jq，使用简单的 grep 和 sed 来提取版本号
    VERSION="v$(grep '"version":' "$SCRIPT_DIR/../package.json" | sed 's/.*: "\(.*\)",/\1/')"
fi

echo "Version: $VERSION"

# 定义目标平台
declare -A PLATFORMS=(
    ["windows/amd64"]=".exe"
    ["linux/amd64"]=""
    ["darwin/amd64"]=""
)

# 安装依赖
echo "Installing dependencies..."
go mod tidy

# 检查前端文件是否存在
WEB_DIST="../apps/web-v2/dist"
if [ ! -d "$WEB_DIST" ]; then
    echo "Error: Web dist folder not found at $WEB_DIST"
    exit 1
fi

# 构建所有平台
for platform in "${!PLATFORMS[@]}"; do
    # 分割平台字符串
    IFS='/' read -r OS ARCH <<< "$platform"
    SUFFIX="${PLATFORMS[$platform]}"
    
    echo "Building for $OS/$ARCH..."
    
    # 创建临时目录
    PLATFORM_TMP_DIR="$TMP_DIR/weibo-archiver-$OS-$ARCH"
    mkdir -p "$PLATFORM_TMP_DIR"
    
    # 构建工具
    OUT_NAME="weibo-archiver$SUFFIX"
    GOOS=$OS GOARCH=$ARCH go build -o "$PLATFORM_TMP_DIR/$OUT_NAME" ./cmd
    
    if [ $? -ne 0 ]; then
        echo "Failed to build for $OS/$ARCH"
        exit 1
    fi
    
    # 复制前端文件到临时目录
    cp -r "$WEB_DIST"/* "$PLATFORM_TMP_DIR/"
    
    # 创建压缩包
    cd "$TMP_DIR"
    if [ "$OS" = "windows" ]; then
        zip -r "$OUT_DIR/weibo-archiver-$OS-$ARCH.zip" "weibo-archiver-$OS-$ARCH"
    else
        tar -czf "$OUT_DIR/weibo-archiver-$OS-$ARCH.tar.gz" "weibo-archiver-$OS-$ARCH"
    fi
    cd - > /dev/null
done

# 清理临时目录
rm -rf "$TMP_DIR"

echo "Build completed! Check the dist directory for the binaries." 