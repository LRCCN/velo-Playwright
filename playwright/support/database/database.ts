import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

const connectionString = process.env.DATABASE_URL_TEST || process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL_TEST or DATABASE_URL must be configured to run database-backed Playwright tests.')
}

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString,
    max: 10,
    ssl: { rejectUnauthorized: false },
  })
})

export const db = new Kysely<Database>({
  dialect,
})
