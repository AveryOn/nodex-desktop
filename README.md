# nodex

## Getting Started

 ### 1. Клонировать репозиторий:
  * Через SSH:
    ```bash
    git clone git@github.com:AveryOn/nodex-desktop.git
    cd nodex-desktop
    ````

  * Через HTTPS:
    ```bash
    git clone https://github.com/AveryOn/nodex-desktop.git
    cd nodex-desktop
    ```
  ---

 ### 2. Переключиться от `main`:
  **`main` считается релизной веткой. Разработка напрямую в `main` без pull request запрещена!**

  * Перед началом работы создать отдельную рабочую ветку:
    ```bash
    git checkout main
    git pull origin main
    git checkout -b feat/<short-task-name>
    ```

  * Пример для новой фичи:
    ```bash
    git checkout -b feat/{num-if-exists}-<any-branch-name>
    ```

  * Пример для багфикса:
    ```bash
    git checkout -b fix/{num-if-exists}-<any-branch-name>
    ```
  ---

 ### 3. Установить зависимости:

  ```bash
  npm install
  ```

  _После установки автоматически выполнится:_

    ```bash
    npm run rebuild:native
    ```

   > _Это пересобирает `better-sqlite3` под Electron_

  ---

 ### 4. Запустить локальную разработку:
  ```bash
  npm run dev
  ```

  > Команда запускает Electron-приложение в development mode через `electron-vite`.
  ---

 ### 5. Проверить типы:

  ```bash
  npm run typecheck
  ```

  * Проверяет отдельно:

    ```bash
    npm run typecheck:node
    npm run typecheck:web
    ```

  ---

 ### 6. Проверить lint:

  ```bash
  npm run lint
  ```
  ---

 ### 7. Сгенерировать миграции при изменении DB schema:

  * Если изменялись файлы схемы Drizzle:

    ```bash
    npm run db:generate
    ```
  ---

 ### 8. Проверить production build локально:

  ```bash
  npm run build
  npm run start
  ```

  - `build` собирает приложение в `out/`.
  - `start` запускает собранную версию через `electron-vite preview`.

  ---

 ### 9. Собрать desktop build:

  - Для быстрой unpacked-сборки:

    ```bash
    npm run build:unpack
    ```

  - Для текущей платформы:

    ```bash
    npm run dist
    ```

  - Для конкретной ОС:

    ```bash
    npm run build:linux
    npm run build:win
    npm run build:mac
    ```
  ---

## Branch policy
 - `main` - релизная ветка.
 - В `main` нельзя коммитить напрямую.
 - Рабочие ветки создаются от актуального `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/<short-task-name>
   ```

 - После завершения работы ветка отправляется в remote:
   ```bash
   git push -u origin feat/<short-task-name>
   ```
 - Дальше создается Pull Request в `main`.
 - Перед Pull Request обязательно выполнить:
   ```bash
   npm run typecheckё
   npm run lint
   npm run build
   ```

## PACKAGE SCRIPTS (Полное описание всех скриптов):

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

  > Использовать для финальной сборки приложения
 ---
