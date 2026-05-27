# nodex

## PACKAGE SCRIPTS:

 ### `format`:
  Форматирует весь проект через Prettier.

   ```bash
   npm run format
   ```

  > Использовать для приведения кода к единому стилю
  ---

 ### `lint`:
  Проверяет проект через ESLint.
   ```bash
   npm run lint
   ```

  > Использовать для поиска проблем в TypeScript/Vue-коде и нарушений правил линтинга.
  ---

 ### `typecheck:node`:
  Проверяет TypeScript-код Node/Electron-части.

  ```bash
  npm run typecheck:node
  ```

  > Проверяет main process, preload, Electron/Vite config и другой Node-код по `tsconfig.node.json`.
  ---

 ### `typecheck:web`:

  Проверяет TypeScript/Vue-код renderer-части.

  ```bash
  npm run typecheck:web
  ```

  > Проверяет Vue-компоненты, Pinia, Vue Router и frontend-код по `tsconfig.web.json`.
  ---

 ### `typecheck`:
  Запускает полную проверку типов для Node/Electron и Web-части.

   ```bash
   npm run typecheck
   ```
  Выполняет:

   ```bash
   npm run typecheck:node && npm run typecheck:web
   ```
  > Использовать перед сборкой и перед коммитом.
  ---

 ### `start`:
  Запускает уже собранное приложение через `electron-vite preview`.

  ```bash
  npm run start
  ```

  > Использовать для проверки production-сборки локально после `npm run build`.
  ---

 ### `dev`:
  Запускает приложение в режиме разработки.

  ```bash
  npm run dev
  ```

  > Использовать для обычной разработки. Поднимает Electron + Vite dev environment.
  ---

 ### `build`:
  Проверяет типы и собирает приложение через `electron-vite build`.
   ```bash
   npm run build
   ```

  Выполняет:
   ```bash
   npm run typecheck && electron-vite build
   ```

  > Результат сборки попадает в `out/`.
  ---

 ### `build:unpack`:
  Собирает приложение и создает unpacked-версию без полноценного installer/package.

  ```bash
  npm run build:unpack
  ```

  > Использовать для быстрой проверки production-билда без создания `.exe`, `.dmg`, `.AppImage`, `.deb` и т.д.
  ---

 ### `build:win`:
  Собирает Windows-дистрибутив через `electron-builder`.

  ```bash
  npm run build:win
  ```

  > Использовать для сборки Windows-версии приложения.
  ---

 ### `build:mac`:
  Собирает macOS-дистрибутив через `electron-builder`.

  ```bash
  npm run build:mac
  ```

  > Использовать для сборки macOS-версии приложения.
  ---

 ### `build:linux`:
  Собирает Linux-дистрибутив через `electron-builder`.

  ```bash
  npm run build:linux
  ```

  > Использовать для сборки Linux-версии приложения.
  ---

 ### `db:generate`:
  Генерирует Drizzle migrations на основе текущей схемы БД.

  ```bash
  npm run db:generate
  ```

  > Использовать после изменений в `src/main/db/schema`.
  ---

 ### `rebuild:native`:
  Пересобирает native-модуль `better-sqlite3` под ABI текущей версии Electron.

  ```bash
  npm run rebuild:native
  ```

  > Нужно, потому что `better-sqlite3` — native dependency, а Electron использует свою версию Node.js.
  ---

 ### `postinstall`:
  Автоматически запускается после `npm install`.

  ```bash
  npm install
  ```

  Выполняет:
   ```bash
   npm run rebuild:native
   ```

  > Нужен, чтобы `better-sqlite3` был сразу пересобран под Electron после установки зависимостей.
  ---

 ### `dist`:
  Собирает приложение и создает production-дистрибутив через `electron-builder`.

  ```bash
  npm run dist
  ```

  Выполняет:
   ```bash
   npm run build && electron-builder
   ```

  > Использовать для финальной сборки приложения.
  ---
