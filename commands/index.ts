import { command } from 'cleye'
import { industryCommand } from './industry'

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
]
