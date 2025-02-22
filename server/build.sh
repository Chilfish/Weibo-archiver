#!/bin/bash

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"

# 创建输出目录
mkdir -p "$OUT_DIR"
rm -rf "$OUT_DIR"/*

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

# 构建所有平台
for platform in "${!PLATFORMS[@]}"; do
    # 分割平台字符串
    IFS='/' read -r OS ARCH <<< "$platform"
    SUFFIX="${PLATFORMS[$platform]}"
    
    echo "Building for $OS/$ARCH..."
    
    # 构建工具
    OUT_NAME="weibo-archiver-$OS$SUFFIX"
    GOOS=$OS GOARCH=$ARCH go build -o "$OUT_DIR/$OUT_NAME" ./cmd
    
    if [ $? -ne 0 ]; then
        echo "Failed to build for $OS/$ARCH"
        exit 1
    fi
done

echo "Build completed! Check the dist directory for the binaries." 