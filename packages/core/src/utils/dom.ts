export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export async function readFile(e: Event) {
  return new Promise<string>((resolve, reject) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) {
      reject(new Error('No file selected'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      resolve(data)
    }
    reader.readAsText(file)
  })
}
