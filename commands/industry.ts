import { anthropic } from './services/ahthropic'
import { fetchWebDOM, fetchWebContent } from './helpers/fetch-web-content'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z, infer } from 'zod'

const schema = z.object({
  url: z.string().url(),
  companyName: z.string(),
  industry: z.string(),
  summary: z.string(),
})

export const industryCommand = async (query: string) => {
  const results = await listupUrlByGoogle(query)
  for (const result of results) {
    const company = await extructAndDetectIndustry(result)
    console.log(company)
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
const extructAndDetectIndustry = async (url: string) => {
  const content = await fetchWebContent(url)
  const parser = new StructuredOutputParser(schema)
  const messages: Parameters<typeof anthropic.messages.create>[0]['messages'] =
    [
      {
        role: 'user',
        content: `Webページの内容を解析して、その会社の業種を判別し結果だけを出力してください。

${parser.getFormatInstructions()}

条件:
- 出力は簡潔な日本語でお願いします。

対象URL: ${url}
Webページの内容: ${content?.slice(0, 100000)}
`,
      },
    ]

  let tried = 0
  let company: z.infer<typeof schema> | null = null
  while (tried <= 3 && company === null) {
    tried++
    try {
      const response = await anthropic.messages.create({
        max_tokens: 1000,
        model: 'claude-3-haiku-20240307',
        messages,
      })
      company = await parser.parse(response.content[0].text)
    } catch {}
  }

  return company
}
