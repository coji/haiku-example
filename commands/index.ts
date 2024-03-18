import { command } from 'cleye'
import { industryCommand } from './industry'
import { zennScrapToArticleCommand } from './zenn-scrap-to-article'
export const commands = [
  command(
    {
      name: 'industry',
      help: {
        description:
          'Google検索を行い1ページ目の結果からそれぞれの業種を特定します',
        examples: ['haiku industry-identification 業種の特定 会社概要'],
      },
      parameters: ['<query...>'],
    },
    ({ _ }) => industryCommand(_.query.join(' ')),
  ),
  command(
    {
      name: 'zenn-scrap-to-article',
      help: {
        description: 'Zennのスクラップを記事に変換します',
        examples: [
          'haiku zenn-scrap-to-article https://zenn.dev/username/scrap/xxxxxx',
        ],
      },
      parameters: ['<scrap_url>'],
    },
    ({ _ }) => zennScrapToArticleCommand(_.scrapUrl),
  ),
]
