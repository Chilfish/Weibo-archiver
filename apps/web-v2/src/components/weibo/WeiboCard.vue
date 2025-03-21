<script setup lang="ts">
import type { Post } from '@workspace/shared'
import { Heart, MessageCircle, Repeat } from 'lucide-vue-next'
import ImageGallery from '../common/ImageGallery.vue'

const props = defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="weibo-card bg-white rounded-2xl shadow-sm p-5">
    <div class="flex items-start gap-3 mb-4">
      <img
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&auto=format&fit=crop&crop=face"
        alt="用户头像" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
      >
      <div>
        <h3 class="font-bold text-gray-900">
          Alex Chen
        </h3>
        <div class="text-xs text-gray-500">
          昨天 16:30
        </div>
      </div>
    </div>

    <div class="mb-4">
      <p class="text-gray-800">
        终于拿到了心仪已久的《地球上的星星》限量版黑胶唱片！封面设计太惊艳了，音质也非常棒，低音质感十足。现在的黑胶收藏真的已经成为了一种生活方式。 <a
          href="#" class="text-blue-500"
        >#黑胶</a> <a href="#" class="text-blue-500">#音乐收藏</a>
      </p>
    </div>

    <ImageGallery :images="post.imgs" />

    <div class="flex justify-between text-gray-500">
      <div class="flex items-center gap-6">
        <button class="flex items-center gap-1 hover:text-red-500 transition-colors">
          <Heart class="w-4 h-4" />
          <span>52</span>
        </button>
        <button class="flex items-center gap-1 hover:text-blue-500 transition-colors">
          <MessageCircle class="w-4 h-4" />
          <span>9</span>
        </button>
        <button class="flex items-center gap-1 hover:text-green-500 transition-colors">
          <Repeat class="w-4 h-4" />
          <span>4</span>
        </button>
      </div>
      <div>
        <span class="text-xs text-gray-400">来自 iPhone 14 Pro</span>
      </div>
    </div>
  </div>
</template>

<style>
.weibo-card {
  transition: all 0.25s ease;
}

.weibo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05);
}

/* 视频标识 */
.video-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* URL 卡片样式 */
.url-card {
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #f9f9fb;
  transition: all 0.2s ease;
}

.url-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
  background-color: #f0f7ff;
}

.url-card-img {
  width: 120px;
  min-height: 100%;
  object-fit: cover;
}

.url-card-content {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
