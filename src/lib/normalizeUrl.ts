export default function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url)

    const hostname = parsed.hostname.replace(/^www\./, '')
    const pathname = parsed.pathname.replace(/\/$/, '')

    return `${hostname}${pathname}`
  } catch {
    return url
  }
}
