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
