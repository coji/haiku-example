import jsdom from 'jsdom'
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

/**
 * JSDOM でURLからWebページのDOMを取得する
 */
export const fetchWebDOM = async (url: string) => {
  const { window } = new jsdom.JSDOM(
    await (await fetch(url, { headers: { 'User-Agent': userAgent } })).text(),
  )
  return window
}

/**
 * URLからWebページのテキストを取得する。
 */
export const fetchWebContent = async (url: string) => {
  const window = await fetchWebDOM(url)
  return window.document.body.textContent
}
