import Anthropic from '@anthropic-ai/sdk'
import jsdom from 'jsdom'
import { config } from 'dotenv'
config()

const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const listupUrlByGoogle = async (query: string) => {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  const { window } = new jsdom.JSDOM(
    await (
      await fetch(url, {
        headers: { 'User-Agent': userAgent },
      })
    ).text(),
  )
  const results = Array.from(window.document.querySelectorAll('h3'))
    .filter((h3) => h3.parentElement?.tagName === 'A')
    .map((h3) => h3.parentElement?.getAttribute('href'))
    .filter((text) => text?.startsWith('http'))
  return results as string[]
}

const fetchWebContent = async (url: string) => {
  const { window } = new jsdom.JSDOM(
    await (
      await fetch(url, {
        headers: {
          'User-Agent': userAgent,
        },
      })
    ).text(),
  )
  return window.document.body.textContent
}

const extructAndDetectUrl = async (url: string) => {
  console.log('URL:', url)
  const content = await fetchWebContent(url)

  const stream = await anthropic.messages.create({
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: `以下のWebページの内容を元に、会社の業種を判別してください:

URL: ${url}
内容: ${content}
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

const main = async () => {
  const results = await listupUrlByGoogle('企業情報 会社概要')
  for (const result of results) {
    await extructAndDetectUrl(result)
    console.log()
  }
}

await main()
