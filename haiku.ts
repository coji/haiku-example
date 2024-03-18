import { cli } from 'cleye'
import { commands } from './commands'

const args = cli({
  name: 'haiku',
  help: { description: 'Claude3 Haiku API を使ってあれこれします' },
  commands: commands,
})
if (args.command === undefined) {
  args.showHelp()
}
