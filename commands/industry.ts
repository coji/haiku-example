import { anthropic } from './services/ahthropic'
import { fetchWebDOM, fetchWebContent } from './helpers/fetch-web-content'

export const industryCommand = async (query: string) => {
  const results = await listupUrlByGoogle(query)
  for (const result of results) {
    await extructAndDetectUrl(result)
    console.log()
  }
}

const listupUrlByGoogle = async (query: string) => {
  // Google検索を行い、検索結果ページのDOMを取得する
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  const window = await fetchWebDOM(url)

  // DOMから検索結果のURLリストを取得する
  const results = Array.from(window.document.querySelectorAll('h3'))
    .filter((h3) => h3.parentElement?.tagName === 'A')
    .map((h3) => h3.parentElement?.getAttribute('href'))
    .filter(
      (text) =>
        text?.startsWith('http') && !text.startsWith('https://www.google.com/'),
    )
  return results as string[]
}

/**
 * URLからWebページの内容を取得し、Anthropicに投げて業種を判別する
 * @param url
 */
const extructAndDetectUrl = async (url: string) => {
  const content = await fetchWebContent(url)

  const stream = await anthropic.messages.create({
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `Webページの内容を解析して、その会社の業種を判別し結果だけを出力してください:

出力結果: CSVフォーマット。項目は以下の4つ。
- URL
- 会社名
- 業種
- 会社概要要約

対象URL: ${url}
Webページの内容: ${content}
`,
      },
    ],
    model: 'claude-3-haiku-20240307',
    stream: true,
  })

  for await (const message of stream) {
    if (message.type === 'content_block_delta') {
      process.stdout.write(message.delta.text)
    }
  }
  console.log()
}
