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

export function lazyLoadImage() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-preview-src')
        img.src = src || '/placeholder.webp'
        img.onerror = () => img.src = '/placeholder.webp'
        observer.unobserve(img)
      }
    })
  })

  const imgs = document.querySelectorAll<HTMLImageElement>('.n-image img')

  imgs.forEach((img) => {
    if (img.src.endsWith('/placeholder.webp'))
      observer.observe(img)
  })
}
