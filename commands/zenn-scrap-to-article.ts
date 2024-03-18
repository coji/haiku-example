import { fetchWebContent } from './helpers/fetch-web-content'
import { anthropic } from './services/ahthropic'

export const zennScrapToArticleCommand = async (url: string) => {
  const content = await fetchWebContent(url)

  const stream = await anthropic.messages.create({
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Zenn のスクラップ記事を元に、Zenn の記事にまとめてください。

条件:
 - 記事は日本のWebプログラマー向けに、わかりやすく章立てでまとめます。
 - 初心者にも伝わりやすいように、わかりやすい言葉で簡潔にまとめます。
 - ステップバイステップで解説していきます。途中のソースコードやコマンド出力なども含めてください。
 - 記事のタイトルは最後にまとめて1行で記載してください。

出力フォーマット: Zenn 形式のマークダウン
元になるスクラップの内容: ${content}
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
