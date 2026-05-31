import { defineConfig } from 'drizzle-kit'

/*
  url: './dev.sqlite',
  нужен для drizzle-kit generate.
  Это dev-only путь, не runtime DB path,
  В реальном приложении БД будет лежать через app.getPath('userData')
*/
export default defineConfig({
  schema: './src/main/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './dev.sqlite'
  }
})
