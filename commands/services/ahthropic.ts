import Anthropic from '@anthropic-ai/sdk'
import { config } from 'dotenv'
config() // .env を読み込んで API Key を取得する

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})
