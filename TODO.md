<!-- # 1. Установить зависимости:

```bash
npm i drizzle-orm better-sqlite3
npm i -D drizzle-kit electron-builder @electron/rebuild
```

# 2. Проверить `package.json`:

```json
{
  "type": "module",
  "main": "./out/main/index.js"
}
``` -->

<!-- # 3. Добавить scripts:

```json
{
  "db:generate": "drizzle-kit generate",
  "rebuild:native": "electron-rebuild -f -w better-sqlite3",
  "postinstall": "npm run rebuild:native",
  "dist": "npm run build && electron-builder"
} -->
<!-- ``` -->

# 4. Настроить структуру:

```txt
src/main/db/
src/main/ipc/
src/preload/
src/renderer/src/
drizzle/
```

# 5. Создать `drizzle.config.ts`.

# 6. Описать первую SQLite schema в `src/main/db/schema`.

# 7. Сделать `src/main/db/client.ts`:

- `better-sqlite3`
- `drizzle`
- singleton connection
- путь БД через `app.getPath('userData')`
- файл: `userData/data/nodex.sqlite`

# 8. Добавить SQLite pragmas:

- `journal_mode = WAL`
- `foreign_keys = ON`

# 9. Сделать runtime migrations:

- `src/main/db/migrate.ts`
- запускать при старте app
- migrations читать из `drizzle/`

# 10. Добавить IPC слой:

- handlers в `src/main/ipc`
- renderer не должен напрямую трогать БД

# 11. Настроить preload:

- только `contextBridge`
- не отдавать сырой `ipcRenderer`
- expose `window.nodex`

# 12. Проверить `BrowserWindow`:

- `contextIsolation: true`
- `nodeIntegration: false`
- preload path корректный

# 13. Настроить Vue Router:

- использовать `createWebHashHistory()`
- не `createWebHistory()`

# 14. Добавить Pinia store, который ходит только через `window.nodex`.

# 15. Настроить `.env`:

- `.env`
- `.env.development`
- `.env.production`
- использовать `MAIN_VITE_`, `RENDERER_VITE_`, `VITE_`
- не хранить секреты в env

# 16. Настроить `electron.vite.config.ts`:

- `better-sqlite3` оставить external
- main/preload/renderer output в `out/`

# 17. Настроить `electron-builder`:

- `files`: `out/**/*`, `drizzle/**/*`, `package.json`
- `asar: true`
- `npmRebuild: true`
- targets: Windows `nsis`, Linux `AppImage/deb/rpm`, macOS `dmg/zip`

# 18. Проверить native module:

- после install запускать `npm run rebuild:native`
- если будет ошибка ASAR, добавить:

```json
"asarUnpack": ["**/*.node"]
```

# 19. Сделать smoke test:

- `npm run dev`
- создать запись в SQLite
- закрыть/открыть app
- проверить сохранение данных

# 20. Проверить production build:

```bash
npm run build
npm run dist
```

# 21. Проверить собранный бинарник:

- стартует без ошибок
- БД создается в `userData/data`
- миграции применяются
- Vue routes не ломаются
- IPC работает

# 22. Потом уже делать доменную схему Nodex/BudgetModule поверх Drizzle.
