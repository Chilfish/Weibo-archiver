import { Gem as DiamondIcon, Link as LinkIcon } from 'lucide-vue-next'
import { defineComponent } from 'vue'
import WeiboEmoji from './WeiboEmoji.vue'

const Link = defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs }) {
    // 超话链接
    const isSuperGroup = props.url.startsWith('https://weibo.com/p/')
    const showLinkIcon = props.icon && !isSuperGroup && !props.text?.startsWith('@')

    return () => (
      <a
        href={props.url}
        class="text-primary hover:underline mx-1"
        target="_blank"
        rel="noopener noreferrer"
        {...attrs}
      >
        {isSuperGroup && <DiamondIcon class="w-4 h-4 inline-block mr-1" />}
        {showLinkIcon && <LinkIcon class="w-4 h-4 inline-block mr-1" />}
        <span>
          {htmlDecode(props.text || props.url)}
        </span>
      </a>
    )
  },
})

const Mention = defineComponent({
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <Link
        url={`https://weibo.com/n/${props.username}`}
        text={`@${props.username}`}
      />
    )
  },
})

const Hashtag = defineComponent({
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <Link
        url={`https://s.weibo.com/weibo?q=%23${props.topic}%23`}
        text={`#${props.topic}#`}
      />
    )
  },
})

/**
 * Segment type for parsing text into segments
 */
interface Segment {
  type: 'text' | 'mention' | 'hashtag' | 'url' | 'emoji'
  content: string
  link?: string
}

function htmlDecode(input: string) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent || input
}

function normalizeText(text: string): string {
  const reBreak = /<br ?\/>/g
  const reLink = /<a href="([^"]+)" target="_blank">([^<]+)<\/a>/g
  const reHashtag = /#([^#]+)#/g
  const reNestedLink = /<a href="([^"]+)" target="_blank">/g

  return text
    .replace(reBreak, '\n')
    .replace(reHashtag, '#$1#')
    .replace(reLink, '$2')
    .replace(reNestedLink, '')
}

function parseText(text: string): Segment[] {
  if (!text)
    return []

  const segments: Segment[] = []

  const urlRegex = /<a target="_blank" href="([^"]+)">([^<]+)<\/a>/g
  const hashtagRegex = /#([^#]+)#/g
  const emojiRegex = /(\[.*?\])/g
  const mentionRegex = /@([\w\u4E00-\u9FA5]+)/g

  const normalizedText = normalizeText(text)
  const urlParts = normalizedText.split(urlRegex)

  for (let i = 0; i < urlParts.length; i++) {
    const part = urlParts[i]

    // 视频链接将使用 card 组件
    const isVideo = part.includes('video.weibo.com')
    if (isVideo) {
      continue
    }

    const link = urlParts[i]
    const text = urlParts[i + 1]
    if (link && (link.startsWith('http') || link.startsWith('//'))) {
      if (text) {
        i += 1
        segments.push({ type: 'url', content: text, link })
        continue
      }
    }

    const mentionParts = part.split(mentionRegex)

    for (let j = 0; j < mentionParts.length; j++) {
      const mentionPart = mentionParts[j]

      // Every odd index is a mention username
      if (j % 2 === 1) {
        segments.push({ type: 'mention', content: mentionPart })
        continue
      }

      // Process hashtags
      const hashtagParts = mentionPart.split(hashtagRegex)

      for (let k = 0; k < hashtagParts.length; k++) {
        const hashtagPart = hashtagParts[k]

        // Every odd index is a hashtag
        if (k % 2 === 1) {
          segments.push({ type: 'hashtag', content: hashtagPart })
          continue
        }

        const emojiParts = hashtagPart.split(emojiRegex)
        for (let l = 0; l < emojiParts.length; l++) {
          const emojiPart = emojiParts[l]
          const isEmoji = emojiRegex.test(emojiPart)
          if (isEmoji) {
            segments.push({ type: 'emoji', content: emojiPart })
          }
          else if (emojiPart) {
            segments.push({ type: 'text', content: htmlDecode(emojiPart) })
          }
        }
      }
    }
  }

  return segments
}

export const WeiboText = defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      default: 'mb-2',
    },
  },
  setup(props) {
    const segments = parseText(props.text)
    console.log(segments)

    return () => (
      <p class={props.class}>
        {segments.map((segment) => {
          switch (segment.type) {
            case 'text':
              return segment.content
            case 'mention':
              return <Mention username={segment.content} />
            case 'hashtag':
              return <Hashtag topic={segment.content} />
            case 'url':
              return (
                <Link
                  text={segment.content}
                  url={segment.link!}
                  icon={true}
                />
              )
            case 'emoji':
              return <WeiboEmoji emojiPhrase={segment.content} />
            default:
              return segment.content
          }
        })}
      </p>
    )
  },
})
