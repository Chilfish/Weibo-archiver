import { createVNode, render } from 'vue'
import PostList from '@cp/post/List.vue'
import type { PicInfo, Post } from './types'

export const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export const weibo = 'https://weibo.com'

export const link = (text: string, url = weibo) => `<a href="${url}" target="_blank">${text}</a>`

/**
 * 解析正文，例如 @user => link(user, userUrl)
 */
export function parseText(text: string) {
  const url = `${weibo}/n/`
  const reg = /@([^:，\s]+)/g
  return text.replace(reg, (_, user) => link(`@${user}`, url + user))
}

export function parseImg(pic_ids?: string[], img_infos?: Record<string, PicInfo>) {
  if (!pic_ids || !img_infos)
    return []
  return pic_ids.map(id => img_infos[id].largest.url)
}

/**
 * 数据清洗
 */
export function filterPosts(posts?: any[]): Post[] {
  if (!posts || !posts.length || !posts[0]?.id)
    return []
  return posts.map(post => ({
    id: post.id,
    text: post.text_raw,
    imgs: parseImg(post.pic_ids, post.pic_infos),
    reposts_count: post.reposts_count,
    comments_count: post.comments_count,
    attitudes_count: post.attitudes_count,
    created_at: post.created_at,
    user: {
      id: post.user.idstr,
      screen_name: post.user.screen_name,
      profile_image_url: post.user.profile_image_url,
    },
    source: post.source,
    region_name: post.region_name,
    isLongText: post.isLongText,
    mblogid: post.mblogid,
    retweeted_status: filterPosts([post.retweeted_status])[0],
  }))
}

export function preview() {
  const container = document.createElement('div')
  const vnode = createVNode(PostList)
  render(vnode, container)

  const app = document.querySelector('#app') || document.querySelector('#preview')!
  app.id = 'preview'
  app.innerHTML = ''
  app.appendChild(container)
}
