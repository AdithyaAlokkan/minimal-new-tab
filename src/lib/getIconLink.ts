export function getIconLink(): Promise<string> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs?.[0]
      if (!tab) {
        console.warn('No active tab found')
        return resolve('')
      }

      const fallback = tab.favIconUrl || ''

      chrome.tabs.sendMessage(
        tab.id as number,
        { topic: 'iconLinks' },
        function (response) {
          if (chrome.runtime && chrome.runtime.lastError) {
            return resolve(fallback)
          }

          const iconLinks: string[] = response?.iconLinks || []
          if (!iconLinks.length) return resolve(fallback)

          let bestLink = fallback
          let bestSize = 0

          const loadImage = (url: string) =>
            new Promise<{ url: string; width: number }>((res) => {
              const img = new Image()
              let settled = false

              const cleanup = () => {
                img.onload = null
                img.onerror = null
              }

              img.crossOrigin = 'anonymous'
              img.onload = function () {
                if (settled) return
                settled = true
                cleanup()
                // use naturalWidth as a fallback
                const w =
                  (img as HTMLImageElement).naturalWidth || img.width || 0
                res({ url, width: w })
              }
              img.onerror = function () {
                if (settled) return
                settled = true
                cleanup()
                res({ url, width: 0 })
              }

              // Safety timeout so we don't wait forever for a broken resource
              setTimeout(() => {
                if (settled) return
                settled = true
                cleanup()
                res({ url, width: 0 })
              }, 2000)

              // Start loading after handlers are attached
              img.src = url
            })

          Promise.all(iconLinks.map(loadImage))
            .then((results) => {
              results.forEach(({ url, width }) => {
                if (width > bestSize) {
                  bestSize = width
                  bestLink = url
                }
              })
              resolve(bestLink || fallback)
            })
            .catch(() => resolve(fallback))
        },
      )
    })
  })
}
