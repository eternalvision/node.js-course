# Node.js Backend Course

Курс по серверной разработке на JavaScript: от устройства Node.js до проектирования, защиты и развёртывания Express-приложений.

Основной стек:

- Node.js 24 LTS;
- ECMAScript Modules;
- Express 5;
- PostgreSQL и MongoDB;
- встроенный test runner `node:test`;
- OpenAPI 3.1;
- WebSocket и Socket.IO.

Материал рассчитан на разработчиков, которые уже знают основы JavaScript и хотят системно разобраться в backend-разработке.

## Как устроен курс

Каждый урок находится в отдельной ветке. Внутри ветки:

- теория без привязки к устаревшим версиям библиотек;
- небольшой запускаемый пример;
- практические задания;
- вопросы для самопроверки;
- домашняя работа;
- ссылки на официальную документацию.

Ветки не являются последовательными состояниями одного приложения. Каждая ветка — самостоятельный учебный материал, который можно открыть и изучить отдельно.

## Быстрый старт

Понадобятся Git и Node.js 24.

```bash
git clone https://github.com/eternalvision/node.js-course.git
cd node.js-course
git branch --all
git switch <имя-ветки>
```

Материал, команды и примеры кода находятся непосредственно в README выбранной ветки. Отдельного каталога с демонстрациями нет: пример размещён рядом с объяснением, к которому он относится.

Для практики с PostgreSQL, MongoDB, SMTP и внешними API потребуются соответствующие сервисы и переменные среды.

## Программа

### 1. Основы Node.js

| Урок | Содержание |
| --- | --- |
| [1. Введение в Node.js](https://github.com/eternalvision/node.js-course/tree/1.Введение-в-Node.js) | Runtime, V8, libuv, event loop, ESM и область применения Node.js |
| [2.1. CLI и npm](https://github.com/eternalvision/node.js-course/tree/2.1.Взаимодействие-с-средой-Node.js.-Менеджер-пакетов-npm) | package.json, lock-файлы, npm scripts, переменные среды и CLI |
| [2.2. Асинхронность и события](https://github.com/eternalvision/node.js-course/tree/2.2.Блокирующие-и-неблокирующие-вызовы.-Работа-с-событиями.-Класс-EventEmitter) | Promise, async/await, AbortSignal, EventEmitter и Worker Threads |
| [2.3. Возможности Node.js 24](https://github.com/eternalvision/node.js-course/tree/2.3.Современные-возможности-Node.js-24) | Type stripping, Permission Model, node:sqlite и встроенные Web API |

### 2. Данные и ввод-вывод

| Урок | Содержание |
| --- | --- |
| [3.1. Buffer и потоки](https://github.com/eternalvision/node.js-course/tree/3.1.Использование-буферов,-потоков) | Buffer, Node Streams, Web Streams, pipeline и backpressure |
| [3.2. Файлы и глобальные API](https://github.com/eternalvision/node.js-course/tree/3.2.Файлы.Глобальные-объекты) | fs/promises, path, URL, fetch, Web Crypto и безопасная работа с файлами |

### 3. HTTP и тестирование

| Урок | Содержание |
| --- | --- |
| [4.1. HTTP-сервер](https://github.com/eternalvision/node.js-course/tree/4.1.Основы-веб-модуля.Создание-веб-сервера) | node:http, маршрутизация, body, статусы, таймауты и graceful shutdown |
| [4.2. HTTP-клиент](https://github.com/eternalvision/node.js-course/tree/4.2.Создание-веб-клиента.Углубление-в-архитектуру) | fetch, отмена, retry, idempotency и интеграция внешних API |
| [4.3. Тестирование и диагностика](https://github.com/eternalvision/node.js-course/tree/4.3.Тестирование-диагностика-и-качество) | node:test, mocking, coverage, inspector и diagnostic reports |

### 4. Базы данных

| Урок | Содержание |
| --- | --- |
| [5.1. PostgreSQL](https://github.com/eternalvision/node.js-course/tree/5.1.Введение-в-базы-данных.Практика-с-PostgreSQL) | Реляционная модель, ограничения, CRUD и параметризованные запросы |
| [5.2. Продвинутый SQL](https://github.com/eternalvision/node.js-course/tree/5.2.Расширенные-SQL-запросы.Многотабличные-базы-данных) | JOIN, индексы, транзакции, isolation и EXPLAIN ANALYZE |
| [5.3. MongoDB](https://github.com/eternalvision/node.js-course/tree/5.3.MongoDB-и-Нормализация) | Документная модель, embedding, references, Mongoose и индексы |

### 5. Express 5

| Урок | Содержание |
| --- | --- |
| [6.1. Основы Express](https://github.com/eternalvision/node.js-course/tree/6.1.Введение-в-Express-Framework) | Приложение, middleware pipeline, request, response и обработка ошибок |
| [6.2. Маршрутизация](https://github.com/eternalvision/node.js-course/tree/6.2.Продвинутая-маршрутизация.Обработка-запросов-в-Express) | Router, params, query, body, валидация и async handlers |
| [6.3. Представления и конфигурация](https://github.com/eternalvision/node.js-course/tree/6.3.Шаблонизаторы.Генерация-динамического-контента.Переменные-среды) | Шаблонизаторы, escaping, view models и переменные среды |
| [6.4. Аутентификация](https://github.com/eternalvision/node.js-course/tree/6.4.Управление-сессиями-и-аутентификация) | Cookies, серверные сессии, пароли, JWT и refresh rotation |
| [6.5. Доступ к данным](https://github.com/eternalvision/node.js-course/tree/6.5.Подключение-и-работа-с-базами-данных-в-Express) | Controller, service, repository, connection pool и транзакции |
| [6.6. Безопасность](https://github.com/eternalvision/node.js-course/tree/6.6.Безопасность-в-Express-приложениях) | Helmet, CORS, CSRF, rate limiting, валидация и OWASP |
| [6.7. Производительность](https://github.com/eternalvision/node.js-course/tree/6.7.Оптимизация-и-управление-производительностью) | Профилирование, кэш, compression, логи, метрики и tracing |
| [6.8. Production](https://github.com/eternalvision/node.js-course/tree/6.8.Развертывание.Масштабирование-Express-приложений.Документирование-через-Swagger) | OpenAPI, health checks, Docker, reverse proxy и масштабирование |

### 6. Проектирование приложения

| Урок | Содержание |
| --- | --- |
| [7.1. Архитектура](https://github.com/eternalvision/node.js-course/tree/7.1.Создание-приложения-и-организация-структуры) | Feature modules, composition root, dependency injection и тестируемые границы |
| [7.2. Авторизация](https://github.com/eternalvision/node.js-course/tree/7.2.Реализация-системы-аутентификации-и-авторизации) | RBAC, object-level authorization, отзыв токенов и аудит |
| [7.3. Развёртывание](https://github.com/eternalvision/node.js-course/tree/7.3.Развертывание-Node.js-приложения-на-Amazon-Elastic-Beanstalk) | AWS Elastic Beanstalk, IAM, health checks, rollout и rollback |

### 7. Интеграции и real-time

| Урок | Содержание |
| --- | --- |
| [8. Электронная почта](https://github.com/eternalvision/node.js-course/tree/8.Почта.SendGrid.Nodemailer) | Nodemailer, SMTP, очередь отправки, DKIM, DMARC и обработка bounce |
| [9. WebSocket](https://github.com/eternalvision/node.js-course/tree/9.Сокеты.WebSockets.Socket.io.Создание-простого-чата) | WebSocket, Socket.IO, heartbeat, reconnect, rooms и масштабирование |

## Принципы курса

- Сначала модель и устройство технологии, затем библиотека.
- Внешняя зависимость добавляется только тогда, когда она решает реальную задачу.
- Все входные данные считаются недоверенными.
- Ошибки, завершение процесса и деградация проектируются заранее.
- Производительность измеряется, а не угадывается.
- Официальная документация имеет приоритет перед статьями и видео.

## Основные источники

- [Node.js 24 API](https://nodejs.org/docs/latest-v24.x/api/)
- [Поддерживаемые версии Node.js](https://nodejs.org/en/about/previous-releases)
- [Express 5 API](https://expressjs.com/en/5x/api.html)
- [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html)
- [PostgreSQL documentation](https://www.postgresql.org/docs/current/)
- [MongoDB documentation](https://www.mongodb.com/docs/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.1.html)

## Автор

[Sasha Priadchenko](https://www.linkedin.com/in/priadchenko/)
