import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env file
config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
  },
  datasource: {
    provider: 'postgresql',
    // Use DIRECT_URL for migrations (bypasses connection pooler)
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || '',
  },
})
