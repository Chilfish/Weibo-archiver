import {
  Gem as DiamondIcon,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-vue-next'
import { defineComponent } from 'vue'
import { emitter } from '@/composables'
import WeiboEmoji from './WeiboEmoji.vue'

/**
 * Segment type for parsing text into segments
 */
type Segment = {
  type: 'text' | 'mention' | 'hashtag' | 'emoji'
  content: string
} | {
  type: 'url' | 'image'
  link: string
  content?: string
}

const rePatterns = {
  image: /^\[img:\/\/(.*?)\]/,
  url: /^<a target="_blank" href="([^"]+)">([^<]+)<\/a>/,
  plainUrl: /^(https?:\/\/[^\s<]+)/i,
  mention: /^@(\S+)([\n ]{0,2})/,
  hashtag: /^#([^#\n]+)#/,
  emoji: /^\[((?!\[img:\/\/).)*?\]/,

  br: /<br ?\/>/g,
  link: /<a( target="_blank")? href="((?:https?:)?\/\/[^"]+)"( target="_blank")?>([^<]+)<\/a>/g,
  hashtagLink: /<a href="(?:https?:)?\/\/s\.weibo\.com\/weibo\?q=%23[^"]+" target="_blank">(#[^<]+#)<\/a>/g,
  nestedLink: /<a href="([^"]+)" target="_blank">/,
  imageLink: /<a target="_blank"[^>]*href="(https:\/\/wx\d\.sinaimg\.cn\/[^"]+\.(?:jpg|png|gif|jpeg))">查看图片<\/a>/,
}

function htmlDecode(input: string) {
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent || input
}

function normalizeText(text: string): string {
  // First handle directly the specific format we're seeing in the example
  const normalizedText = text.replace(
    /<a href="\/\/s\.weibo\.com\/weibo\?q=%23[^"]+" target="_blank">(#[^<]+#)<\/a>/g,
    '$1',
  )

  return normalizedText
    .replaceAll(rePatterns.br, '\n')
    // Process hashtag links to preserve the hashtag content
    .replace(rePatterns.hashtagLink, '$1')
    // Convert image links to [img://url] format
    .replace(rePatterns.imageLink, '[img://$1]')
    // Then handle regular links
    .replace(rePatterns.link, '$4')
    .replace(rePatterns.nestedLink, '')
}

const Link = defineComponent({
  name: 'WeiboTextLink',
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
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    // 超话链接
    const isSuperGroup = props.url.startsWith('https://weibo.com/p/')
    const showLinkIcon = props.icon && !isSuperGroup && !props.text?.startsWith('@')
    const text = props.text || props.url

    return () => (
      <a
        href={props.url}
        class={['text-primary hover:underline mx-1', props.class]}
        target="_blank"
        rel="noopener noreferrer"
        {...attrs}
      >
        {isSuperGroup && <DiamondIcon class="w-4 h-4 inline-block mr-1" />}
        {showLinkIcon && <LinkIcon class="w-4 h-4 inline-block mr-1" />}
        <span>
          {htmlDecode(text)}
        </span>
      </a>
    )
  },
})

const Mention = defineComponent({
  name: 'WeiboTextMention',
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
  name: 'WeiboTextHashtag',
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <Link
        url={`/search?q=%23${props.topic}%23`}
        text={`#${props.topic}#`}
      />
    )
  },
})

const InlineImageButton = defineComponent({
  name: 'WeiboTextInlineImageButton',
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '查看图片',
    },
  },
  setup(props) {
    function handleClick() {
      emitter.emit('open-image-preview', {
        imgs: [props.imageUrl],
        index: 0,
      })
    }

    return () => (
      <button
        onClick={handleClick}
        class="inline-flex px-1 h-4 align-middle items-center text-primary hover:underline"
      >
        <ImageIcon class="w-4 h-4 inline-block" />
        <span>{props.text}</span>
      </button>
    )
  },
})

function parseText(text: string): Segment[] {
  if (!text)
    return []

  const segments: Segment[] = []
  const normalizedText = normalizeText(text)
  // console.log(normalizedText)

  let remainingText = normalizedText

  // Process the text sequentially to maintain ordering
  while (remainingText.length > 0) {
    // Check for image pattern first
    const imageMatch = remainingText.match(rePatterns.image)
    if (imageMatch) {
      segments.push({ type: 'image', link: imageMatch[1], content: '查看图片' })
      remainingText = remainingText.substring(imageMatch[0].length)
      continue
    }

    // Check for URL pattern
    const urlMatch = remainingText.match(rePatterns.url)
    if (urlMatch) {
      const [fullMatch, url, linkText] = urlMatch

      // Skip video links as they will be handled by card component
      const isVideo = url.includes('video.weibo.com')
      if (!isVideo) {
        segments.push({ type: 'url', content: linkText, link: url })
      }

      remainingText = remainingText.substring(fullMatch.length)
      continue
    }

    // Check for plain URL text
    const plainUrlMatch = remainingText.match(rePatterns.plainUrl)
    if (plainUrlMatch) {
      const url = plainUrlMatch[1]
      segments.push({ type: 'url', content: '网页链接', link: url })
      remainingText = remainingText.substring(url.length)
      continue
    }

    // Check for mention pattern
    const mentionMatch = remainingText.match(rePatterns.mention)
    if (mentionMatch) {
      const [fullMatch, username, space] = mentionMatch
      // 转发链中，用户名后会跟着一个冒号和可能没有的空格
      // 如果不处理，@name:words 会被识别为 mention
      // 同时用户名是不会含有 `:` 的
      const [realName, restText] = username.split(':')

      segments.push({ type: 'mention', content: realName })

      // 有时候@后面会跟着换行符，这个要保留
      // 或者是上面那种情况的 words 就当作 text 处理
      const text = restText ? `: ${restText}${space}` : space
      segments.push({ type: 'text', content: text })

      // mention 的正则就会把 @name:words 都当作 match 了
      // 所以需要减去这部分长度
      remainingText = remainingText.substring(fullMatch.length)
      continue
    }

    // Check for hashtag pattern
    const hashtagMatch = remainingText.match(rePatterns.hashtag)
    if (hashtagMatch) {
      segments.push({ type: 'hashtag', content: hashtagMatch[1] })
      remainingText = remainingText.substring(hashtagMatch[0].length)
      continue
    }

    // Check for emoji pattern (handles standard Weibo emojis, NOT image links)
    const emojiMatch = remainingText.match(rePatterns.emoji)
    if (emojiMatch) {
      segments.push({ type: 'emoji', content: emojiMatch[0] })
      remainingText = remainingText.substring(emojiMatch[0].length)
      continue
    }

    // If none of the special patterns match, take the next character as regular text
    // Accumulate text until we hit a special pattern
    let textSegment = ''
    let nextSpecialIndex = remainingText.length

    // Find the nearest special pattern

    const patterns = [
      { regex: /\[img:\/\/[^\]]*\]/, type: 'image' },
      { regex: /<a target="_blank" href="[^>]*>[^<]*<\/a>/, type: 'url' },
      { regex: /https?:\/\/[^\s<]+/i, type: 'plainUrl' },
      { regex: /@[\w\u4E00-\u9FA5]+/, type: 'mention' },
      { regex: /#[^#]+#/, type: 'hashtag' },
      { regex: /\[((?!\[img:\/\/)[^\]]*)\]/, type: 'emoji' },
    ]
    for (const pattern of patterns) {
      const match = remainingText.match(pattern.regex)
      if (match && match.index && match.index < nextSpecialIndex) {
        nextSpecialIndex = match.index
      }
    }

    if (nextSpecialIndex > 0) {
      textSegment = remainingText.substring(0, nextSpecialIndex)
      if (textSegment) {
        segments.push({ type: 'text', content: htmlDecode(textSegment) })
      }
      remainingText = remainingText.substring(nextSpecialIndex)
    }
    else {
      // No more special patterns, add the rest as text
      if (remainingText) {
        segments.push({ type: 'text', content: htmlDecode(remainingText) })
      }
      break
    }
  }

  return segments
}

export const WeiboText = defineComponent({
  name: 'WeiboText',
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
      .filter((segment) => {
        if (segment.type === 'text') {
          return segment.content !== ' '
        }
        return true
      })

    // console.log(segments)

    return () => (
      <p class={[props.class, '']}>
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
                  url={segment.link}
                  icon={true}
                />
              )
            case 'emoji':
              return <WeiboEmoji emojiPhrase={segment.content} />
            case 'image':
              return (
                <InlineImageButton
                  imageUrl={segment.link}
                  text={segment.content}
                />
              )
            default:
              return props.text
          }
        })}
      </p>
    )
  },
})

export default WeiboText
