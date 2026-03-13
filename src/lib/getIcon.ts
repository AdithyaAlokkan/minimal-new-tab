const handleResponse = (message: object) => {
  return message
}

const handleError = (error: unknown) => {
  console.log('Error on sending message: ', error)
}

export default function getIcon(url: string) {
  const message = chrome.runtime.sendMessage({
    type: 'fetchIcons',
    url: url,
  })

  return message.then(handleResponse).catch(handleError)
}
