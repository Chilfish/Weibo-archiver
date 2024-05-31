import { useStorage } from '@vueuse/core'
import { ImgPlaceholder } from '../constants'

/**
 * Wait for an element to be added to the DOM.
 */
export function waitForElement<T extends Element = HTMLElement>(
  selector: string,
  $ = (e: string) => document.querySelector<T>(e),
) {
  return new Promise<T | null>((resolve) => {
    if ($(selector))
      return resolve($(selector))

    const observer = new MutationObserver(() => {
      if ($(selector)) {
        resolve($(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

export function lazyLoadImage(
  imgs?: NodeListOf<HTMLImageElement> | HTMLImageElement[],
) {
  const imgHost = useStorage('imgHost', '/')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-preview-src') || ImgPlaceholder

        // 使用缩略图
        img.src = src.startsWith(imgCdn) || imgHost.value === 'weibo'
          ? src.replace('large', 'orj360')
          : src

        img.onerror = () => {
          img.src = ImgPlaceholder
          img.parentElement?.classList.add('img-error')
        }
        img.onload = () => {
          img.parentElement?.classList.add('loaded')
        }
        observer.unobserve(img)
      }
    })
  })

  if (imgs) {
    imgs.forEach((img) => {
      if (img.src.endsWith(ImgPlaceholder))
        observer.observe(img)
    })
  }

  return {
    observe: (img: HTMLImageElement) => observer.observe(img),
    disconnect: () => observer.disconnect(),
  }
}
