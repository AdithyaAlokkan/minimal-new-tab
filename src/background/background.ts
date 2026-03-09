chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'fetchIcons') {
    chrome.tabs.create({ url: message.url, active: false }, (tab) => {
      if (!tab.id) {
        sendResponse('')
        return
      }

      const listener = (tabId: number, changeInfo: { status?: string }) => {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener)

          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id! },
              func: async () => {
                const links = Array.from(
                  document.querySelectorAll(
                    'link[rel~="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
                  ),
                ).map((link) => (link as HTMLLinkElement).href)

                if (!links.length) return ''

                // Function to load images and return width
                const loadImage = (url: string) =>
                  new Promise<{ url: string; width: number }>((res) => {
                    const img = new Image()
                    let settled = false

                    const cleanup = () => {
                      img.onload = null
                      img.onerror = null
                    }

                    img.crossOrigin = 'anonymous'
                    img.onload = () => {
                      if (settled) return
                      settled = true
                      cleanup()
                      res({ url, width: img.naturalWidth || 0 })
                    }
                    img.onerror = () => {
                      if (settled) return
                      settled = true
                      cleanup()
                      res({ url, width: 0 })
                    }

                    setTimeout(() => {
                      if (settled) return
                      settled = true
                      cleanup()
                      res({ url, width: 0 })
                    }, 2000)

                    img.src = url
                  })

                const results = await Promise.all(links.map(loadImage))
                results.sort((a, b) => b.width - a.width)
                return results[0]?.url || ''
              },
            },
            (results) => {
              const bestIcon = results?.[0]?.result || ''
              sendResponse(bestIcon)

              // Remove the tab after sending
              setTimeout(() => chrome.tabs.remove(tab.id!), 100)
            },
          )
        }
      }

      chrome.tabs.onUpdated.addListener(listener)
    })

    return true
  }
})
