# Gulp сборка NiGr

## Начало работы

1. Склонировать сборку себе на ПК(git clone https://github.com/NikitinVladimirV/Nigr-build.git).
2. Установите все пакеты(npm i).
3. Разместить файлы проекта в папку "src" внутри репозитория.
4. Запустите сборку(npm start).

## Комманды

### Разработка

- npm start - режим разработки, с отслеживанием всех изменений. Все файлы попадают в папку "dist".
- npm run pug - режим разработки с шаблонизатором PUG, с отслеживанием всех изменений. Все файлы попадают в папку "dist".

### Сборка

- npm run build - для отправки в прод. Все файлы попадают в папку "build"(запускать только после комманд разработки).

### Дополнительно

- npm run deploy - для переноса на хостинг(необходимо задать параметры подключения в файле .env)(запускать только после комманд сборки).
- npm run zip - архивирование проекта. Все файлы попадают в zip-файл с именем проекта(запускать только после комманд разработки).
- npm run v3c - проверка html с помощью v3c валидатора.

## Структура папок и файлов

```
Project/                   - Папка проекта
├─ .vscode/                - Настройки VSCode
|  ├─ emmet/               - Настройки Emmet
|  |  └─ snippets.json     - сниппеты emmet
|  ├─ snippets/            - Сниппеты Project Snippets(необходимо расширение Project Snippets)
|  |  └─ html.json         - сниппеты HTML
|  ├─ extension.json       - список рекомендованных расширения VSCode
|  └─ settings.json        - настройки VSCode для проекта
├─ dist/                   - Собранный проект
├─ gulp/                   - Настройки Gulp
|  ├─ config/              - Конфиги Gulp
|  |  └─                   -
|  ├─ tasks/               - Задачи Gulp
|  |  └─                   -
|  └─ version.json         - версия изменений на основе даты времени
├─ src/                    - Исходники проекта
|  ├─ data/                - Данные для проекта не требующие переноса
|  ├─ fonts/               - Шрифты в любом формате
|  ├─ html/                - HTML-код для вставки
|  ├─ images/              - Картинки
|  ├─ pug/                 - Код для шаблонизатора Pug
|  |  ├─ chunk/            - Pug-код для вставки
|  |  |  ├─ footer.pug     - pug-код футера
|  |  |  └─ header.pug     - pug-код хедера
|  |  ├─ layout/           - Шаблоны Pug от которых можно наследоваться
|  |  |  └─ app.pug        - основной шаблон страницы
|  |  └─ index.pug         - главный pug-файл
|  ├─ resources/           - Ресурсы которые просто нужно перенести в папку сборки
|  ├─ scripts/             - Скрипты
|  |  ├─ components/       - JS компоненты
|  |  ├─ helpers/          - Функции помощники
|  |  ├─ vendor/           - Скрипты сторонних библиотеки
|  |  ├─ _components.js    - Файл подключения компонентов
|  |  ├─ _helpers.js       - Файл подключения общих функций
|  |  ├─ _vendor.js        - Файл подключения библиотек
|  |  └─ main.js           - Главный скрипт-файл
|  ├─ styles/              - Стили
|  |  ├─ components/       - SCSS компоненты
|  |  ├─ lib/              - Стили сторонних библиотек
|  |  ├─ mixins/           - Файлы готовых фрагментов SCSS-кода для вставки
|  |  ├─ _effects.scss     - общие эффекты
|  |  ├─ _fonts.scss       - подключения шрифтов
|  |  ├─ _lib.scss         - подключения библиотек
|  |  ├─ _mixins.scss      - подключения файлов готовых SCSS компонентов
|  |  ├─ _settings.scss    - глобальные стили, настройки, сбросы
|  |  ├─ _variables.scss   - глобальные переменные
|  |  └─ main.scss         - Главный SCSS-файл
|  └─ index.html           - Главный html-файл
├─ .browserslistrc         - список браузеров которые должен поддерживать проект
├─ .editorconfig           - настройки форматирования проекта (необходимо расширение EditorConfig)
├─ .gitignore              - список исключений для Git
├─ .htmlhintrc             - настройки HTML Hint(необходимо расширение HTMLHint)
├─ .prettierrc             - настройки Prettier(необходимо расширение Prettier)
├─ eslint.config.mjs       - настройки ESLint(необходимо расширение ESLint)
├─ gulpfile.js             - настройки Gulp
├─ package-lock.json       - список зависимостей проекта
├─ package.json            - настройки проекта
├─ README.md               - описание сборки
├─ *.zip                   - zip-архив с проектом
```

## Описание
