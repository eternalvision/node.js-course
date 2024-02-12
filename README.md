# Шаблонизаторы и генерация динамического контента. Переменные среды

## Переменные среды

Когда мы начинаем разрабатывать веб-приложение, рано или поздно сталкиваемся с ситуацией использования сторонних источников данных, сервисов, учетных данных API и т.д. Доступ к этим ресурсам почти всегда происходит посредством секретных ключей. Это становится большой проблемой, когда код приложения передается в общедоступный репозиторий как GitHub. Код доступен всем, кто его видит, а значит, и наши секретные ключи тоже.

Как решают эту проблему? Правильное решение – использовать переменные среды. Это локальные переменные, которые доступны нашему приложению. Создание этих переменных производится с помощью модуля dotenv. Этот модуль загружает переменные среды из файла `.env`, который вы создаете, например, в корневом каталоге нашего приложения. Затем мы подключаем модуль в нашем приложении и добавляет переменные окружения в объект `process.env`, и уже оттуда, не показывая значения этих переменных, мы можем использовать их в приложении. Само собой файл `.env`мы должны добавить в файл `.gitignore`

Сначала установим пакет.

`pnpm i dotenv`

Затем добавим в файл `app.js`следующую строку.

`require('dotenv').config();`

Затем создаем `.env` файл в корневом каталоге нашего приложения и добавляем в него переменные.

`SECRET_KEY=123456`
`NODE_ENV=development`

Теперь в файле приложения app.js будут доступны любые переменные, добавленные в файл .env. Эти переменные доступны теперь в приложении следующим образом

`process.env.SECRET_KEY;`
`process.env.NODE_ENV;`

В дальнейшем мы всегда будем использовать переменные окружения для доступа к секретным данным, таким как секретные слова `cookie`или `jwt`, `url`подключение к базе данных и прочее.

## Введение в шаблонизаторы

### Обзор темы

#### Что такое шаблонизаторы и зачем они нужны в веб-разработке.

**Шаблонизаторы** в веб-разработке — это инструменты, позволяющие разработчикам эффективно генерировать HTML-код, используя предопределенные шаблоны. Они играют ключевую роль в создании динамических веб-страниц, где контент меняется в зависимости от пользовательских данных, взаимодействия с пользователем или серверных событий. Шаблонизаторы обеспечивают разделение логики приложения и пользовательского интерфейса, что делает код более чистым, понятным и легко поддерживаемым.

#### Зачем нужны шаблонизаторы?

1. **Повышение эффективности разработки:** Шаблонизаторы позволяют использовать мощные конструкции языка, такие как циклы и условия, для генерации HTML, что сокращает время разработки и упрощает процесс обновления веб-страниц.
2. **Разделение кода:** Помогают отделить бизнес-логику приложения от его представления, что улучшает читаемость кода и упрощает совместную работу в команде.
3. **Повторное использование кода:** Шаблоны и частичные шаблоны могут быть легко переиспользованы в различных частях приложения или даже в разных проектах.
4. **Легкая интеграция с данными:** Шаблонизаторы предоставляют удобный способ интеграции серверных данных (например, из базы данных) в HTML, что является ключевым для создания динамических веб-приложений.

#### Популярные шаблонизаторы для Express

1. **EJS (Embedded JavaScript):** EJS использует простой синтаксис, который позволяет встраивать JavaScript код прямо в HTML. Это делает EJS легким в изучении и использовании, особенно для разработчиков, уже знакомых с JavaScript.
2. **Pug (ранее известный как Jade):** Pug предлагает более компактный и выразительный синтаксис для создания HTML. Он использует отступы для определения иерархии элементов, что делает шаблоны чрезвычайно читаемыми. Однако, это может потребовать времени для привыкания к его синтаксису.
3. **Handlebars:** Handlebars предоставляет мощные возможности для создания сложных шаблонов с использованием минимального количества логики в шаблонах. Он поддерживает создание вспомогательных функций и частичных шаблонов, что делает его идеальным для больших и сложных проектов.

### Установка и настройка шаблонизатора

#### Демонстрация на примере Handlebars: установка через npm, настройка в Express.

##### Шаг 1: Установка Handlebars

Первым делом необходимо установить Handlebars через npm (Node Package Manager). Для этого откройте терминал в корневой директории вашего проекта и выполните следующую команду:

```bash
npm install express-handlebars
```

`express-handlebars` — это специальная версия Handlebars, адаптированная для работы с Express, которая упрощает интеграцию шаблонизатора в ваше приложение.

##### Шаг 2: Настройка Express для использования Handlebars

После установки нужно настроить Express, чтобы использовать `express-handlebars` как движок для рендеринга ваших веб-страниц. Добавьте следующий код в файл, где вы настраиваете ваше Express приложение (например, `app.js` или `server.js`):

```javascript
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

// Настройка Handlebars в качестве движка для рендеринга в Express
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Остальная часть вашего кода Express...
```

Этот код настраивает Express использовать Handlebars в качестве движка для рендеринга и указывает директорию `views` для хранения ваших шаблонов.

##### Шаг 3: Создание базового шаблона страницы

Теперь создадим базовый шаблон. Для этого в директории `views` создайте файл `home.handlebars` с следующим содержимым:

```handlebars
<html>
    <head>
        <title>Моя страница</title>
    </head>
    <body>
        <h1>Привет, {{name}}!</h1>
    </body>
</html>
```

В этом шаблоне `{{name}}` — это переменная, значение которой будет подставлено при рендеринге страницы.

##### Шаг 4: Рендеринг страницы с использованием шаблона

Чтобы отрендерить страницу с использованием созданного шаблона, добавьте маршрут в ваше Express приложение:

```javascript
app.get("/", (req, res) => {
    res.render("home", { name: "Мир" }); // Передаем данные для шаблона
});
```

Когда вы откроете в браузере адрес вашего сервера (например, `http://localhost:3000`), вы должны увидеть страницу, которая выводит "Привет, Мир!".

Таким образом, вы настроили Handlebars в качестве движка для рендеринга в вашем Express-приложении и создали базовый шаблон страницы, который динамически отображает данные.

### Основы работы с Handlebars

Handlebars предлагает простой и мощный синтаксис для создания динамических HTML-шаблонов. Давайте рассмотрим основы его использования, включая вставку переменных, использование условий и циклов в шаблонах.

#### Вставка переменных

Для вставки переменных в шаблон Handlebars используйте двойные фигурные скобки `{{}}`. Когда шаблон рендерится, место, где указана переменная, заменяется её значением.

**Пример:**

```handlebars
<p>Ваше имя: {{name}}</p>
```

Если объект, переданный в шаблон, содержит свойство `name` со значением "Алексей", результатом рендеринга будет:

```html
<p>Ваше имя: Алексей</p>
```

#### Использование условий

Handlebars позволяет использовать условия с помощью блока `{{#if ...}} ... {{/if}}`. Это может быть полезно для условного отображения контента.

**Пример:**

```handlebars
{{#if isAdmin}}
    <p>Доступ к административной панели.</p>
{{else}}
    <p>Доступ ограничен.</p>
{{/if}}
```

В зависимости от того, истинно ли значение переменной `isAdmin`, будет отображено соответствующее сообщение.

#### Использование циклов

Для итерации по массивам Handlebars использует блок `{{#each ...}} ... {{/each}}`, что позволяет генерировать списки или таблицы данных.

**Пример:**

```handlebars
<ul>
    {{#each items}}
        <li>{{this}}</li>
    {{/each}}
</ul>
```

Если переменная `items` — это массив `["Яблоко", "Банан", "Апельсин"]`, результатом рендеринга будет:

```html
<ul>
    <li>Яблоко</li>
    <li>Банан</li>
    <li>Апельсин</li>
</ul>
```

#### Вложенные объекты

Для работы с вложенными объектами используйте точечный синтаксис.

**Пример:**

```handlebars
<p>Имя пользователя: {{user.name}}</p>
<p>Возраст: {{user.age}}</p>
```

Если передан объект с вложенным объектом `user`, содержащим поля `name` и `age`, то данные поля будут корректно отображены в шаблоне.

#### Помощники (Helpers)

Handlebars также позволяет определять собственные помощники (helpers), которые могут выполнять функции от форматирования данных до сложной логики отображения.

**Пример определения помощника:**

```javascript
Handlebars.registerHelper("capitalize", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
});
```

**Пример использования помощника в шаблоне:**

```handlebars
<p>Имя пользователя: {{capitalize user.name}}</p>
```

Таким образом, Handlebars предоставляет гибкий и мощный инструментарий для создания динамических веб-страниц, позволяя легко вставлять данные, использовать условия и циклы, а также определять собственные функции для обработки данных прямо в шаблонах.

### Простой сервер на Express, который демонстрирует использование шаблонизатора Handlebars для отображения динамического контента.

#### Шаг 1: Установка необходимых пакетов

Перед началом убедитесь, что у вас установлен Node.js и npm. Создайте новый проект и установите Express и express-handlebars, используя npm:

```bash
npm init -y
npm install express express-handlebars
```

#### Шаг 2: Настройка сервера Express

Создайте файл `app.js` и добавьте в него следующий код для настройки сервера и интеграции Handlebars:

```javascript
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

// Настройка Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Маршруты
app.get("/", (req, res) => {
    const context = {
        title: "Домашняя страница",
        name: "Алексей",
        isAdmin: true,
        items: ["Яблоко", "Банан", "Апельсин"],
        user: {
            name: "Виктор",
            age: 30,
        },
    };
    res.render("home", context);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

#### Шаг 3: Создание шаблона Handlebars

В директории вашего проекта создайте папку `views` и внутри неё файл `home.handlebars` с следующим содержимым:

```handlebars
<html>
    <head>
        <title>{{title}}</title>
    </head>
    <body>
        <h1>Привет, {{name}}!</h1>
        {{#if isAdmin}}
            <p>Доступ к административной панели.</p>
        {{else}}
            <p>Доступ ограничен.</p>
        {{/if}}
        <h2>Список фруктов:</h2>
        <ul>
            {{#each items}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
        <p>Имя пользователя: {{user.name}}, возраст: {{user.age}}</p>
    </body>
</html>
```

#### Шаг 4: Запуск сервера

Запустите сервер, используя команду:

```bash
node app.js
```

Откройте браузер и перейдите по адресу `http://localhost:3000`. Вы увидите страницу, на которой демонстрируется работа с переменными, условиями и циклами в Handlebars.

### Дополнения для работы с данными

#### Шаг 1: Создание JSON-файла с данными

Создайте файл `data.json` в корне вашего проекта со следующим содержимым:

```json
{
    "title": "Домашняя страница",
    "name": "Алексей",
    "isAdmin": true,
    "items": ["Яблоко", "Банан", "Апельсин"],
    "user": {
        "name": "Виктор",
        "age": 30
    },
    "todos": [
        { "task": "Купить молоко", "done": false },
        { "task": "Прочитать книгу", "done": true }
    ]
}
```

#### Шаг 2: Чтение данных из JSON-файла

Модифицируйте ваш `app.js`, чтобы он читал данные из `data.json`:

```javascript
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json()); // Для обработки JSON-тел запросов

// Настройка Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Функция для чтения данных из файла
function readData() {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
}

// Маршруты
app.get("/", (req, res) => {
    const context = readData();
    res.render("home", context);
});

// Добавление новой задачи через API
app.post("/todos", (req, res) => {
    const newTodo = req.body; // Получаем новую задачу из тела запроса
    const data = readData();
    data.todos.push(newTodo); // Добавляем задачу в массив
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); // Сохраняем обновленные данные в файл
    res.status(201).send("Задача добавлена");
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

#### Шаг 3: Модификация шаблона для отображения ToDo

Добавьте в файл `views/home.handlebars` разметку для отображения списка задач:

```handlebars
...
<h2>Список задач ToDo:</h2>
<ul>
    {{#each todos}}
        <li>{{task}} - {{#if done}}Выполнено{{else}}В процессе{{/if}}</li>
    {{/each}}
</ul>
...
```

#### Шаг 4: Тестирование через Postman

1. Запустите ваш сервер, если он ещё не запущен.
2. Откройте Postman и создайте новый POST-запрос по адресу `http://localhost:3000/todos`.
3. В разделе "Body" выберите "raw" и формат "JSON (application/json)".
4. Введите данные для новой задачи, например:

```json
{
    "task": "Завершить проект",
    "done": false
}
```

5. Отправьте запрос. Вы должны получить ответ, что задача добавлена.
6. Перейдите в браузере на главную страницу вашего приложения, чтобы увидеть обновлённый список задач.

Эти шаги демонстрируют, как можно работать с данными из JSON-файла и обрабатывать HTTP-запросы для добавления новых записей в вашем Express-приложении с использованием Handlebars для отображения данных.

## Генерация динамического контента

### Работа с данными в шаблонах

Для демонстрации передачи данных из Express в шаблон и создания страницы с динамическим содержимым рассмотрим пример со списком пользователей, извлекаемых из базы данных MongoDB. Этот пример предполагает, что у вас уже установлен MongoDB и вы знакомы с основами работы с этой базой данных.

#### Шаг 1: Установка необходимых пакетов

Установите пакеты `mongoose` для работы с MongoDB и `express-handlebars` для работы с шаблонизатором Handlebars, если вы ещё этого не сделали:

```bash
npm install mongoose express-handlebars
```

#### Шаг 2: Подключение к MongoDB

Создайте модель пользователя в новом файле `models/User.js`:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

module.exports = mongoose.model("User", userSchema);
```

В файле `app.js` добавьте подключение к MongoDB:

```javascript
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/yourDatabaseName");
```

#### Шаг 3: Создание маршрута для отображения пользователей

В `app.js` создайте маршрут, который извлекает всех пользователей из базы данных и передаёт их в шаблон Handlebars для отображения:

```javascript
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.render("users", { users });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
```

#### Шаг 4: Создание шаблона Handlebars для отображения списка пользователей

В папке `views` создайте файл `users.handlebars` с содержимым:

```handlebars
<html>
    <head>
        <title>Список пользователей</title>
    </head>
    <body>
        <h1>Пользователи</h1>
        <ul>
            {{#each users}}
                <li>Имя:
                    {{this.name}}, Email:
                    {{this.email}}, Возраст:
                    {{this.age}}</li>
            {{/each}}
        </ul>
    </body>
</html>
```

Этот шаблон пройдёт по массиву `users`, переданному из Express, и для каждого пользователя отобразит его имя, email и возраст.

### Дополним предыдущий пример, добавив полный серверный код, который включает создание базы данных, добавление, изменение и удаление записей пользователей в MongoDB с использованием Express и Mongoose.

#### Шаг 1: Полная настройка сервера

В файле `app.js` у нас будет следующий код, который включает подключение к MongoDB, настройку Express и маршруты для CRUD операций (Создание, Чтение, Обновление, Удаление):

```javascript
const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const User = require("./models/User"); // Убедитесь, что модель User создана по указанному пути

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключение к MongoDB
mongoose
    .connect("mongodb://localhost:27017/userDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB успешно подключен"))
    .catch((err) => console.error("Ошибка подключения к MongoDB", err));

// Отображение списка пользователей
app.get("/users", async (req, res) => {
    const users = await User.find({});
    res.render("users", { users });
});

// Создание пользователя
app.post("/users", async (req, res) => {
    const { name, email, age } = req.body;
    await User.create({ name, email, age });
    res.redirect("/users");
});

// Обновление пользователя
app.post("/users/update", async (req, res) => {
    const { id, name, email, age } = req.body;
    await User.findByIdAndUpdate(id, { name, email, age });
    res.redirect("/users");
});

// Удаление пользователя
app.post("/users/delete", async (req, res) => {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    res.redirect("/users");
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

#### Шаг 2: Создание и использование HTML форм

Для создания, обновления и удаления записей пользователя, вам понадобятся HTML формы. Для простоты, допустим, что у нас есть страница с формой для добавления нового пользователя и формы рядом с каждым пользователем для их обновления или удаления. В вашем шаблоне `users.handlebars` можно добавить следующий HTML:

```handlebars
<html>
    <head>
        <title>Список пользователей</title>
    </head>
    <body>
        <h1>Пользователи</h1>

        <!-- Форма для создания нового пользователя -->
        <form action="/users" method="POST">
            <input type="text" name="name" placeholder="Имя" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="number" name="age" placeholder="Возраст" required />
            <button type="submit">Добавить пользователя</button>
        </form>

        <ul>
            {{#each users}}
                <li>
                    Имя:
                    {{this.name}}, Email:
                    {{this.email}}, Возраст:
                    {{this.age}}
                    <!-- Форма для удаления пользователя -->
                    <form
                        action="/users/delete"
                        method="POST"
                        style="display: inline;"
                    >
                        <input type="hidden" name="id" value="{{this._id}}" />
                        <button type="submit">Удалить</button>
                    </form>
                </li>
            {{/each}}
        </ul>
    </body>
</html>
```

### Создание страницы с динамическим содержимым. Макетирование и частичные шаблоны

Частичные шаблоны в Handlebars позволяют создавать повторно используемые компоненты, такие как хедеры, футеры и другие элементы страницы, которые могут быть включены в различные шаблоны. Это улучшает организацию кода и его поддерживаемость. Давайте рассмотрим, как можно использовать частичные шаблоны в проекте на Express с Handlebars для создания динамических веб-страниц.

#### Шаг 1: Создание частичных шаблонов

1. **Хедер (Header):** В директории `views/partials`, создайте файл `_header.handlebars` с базовой разметкой хедера:

```handlebars
<header>
    <nav>
        <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/users">Пользователи</a></li>
        </ul>
    </nav>
</header>
```

2. **Футер (Footer):** Также в `views/partials`, создайте файл `_footer.handlebars` с базовой разметкой футера:

```handlebars
<footer>
    <p>© 2024 Моя компания</p>
</footer>
```

#### Шаг 2: Регистрация частичных шаблонов

Чтобы использовать частичные шаблоны в Handlebars с Express, вам нужно их зарегистрировать. Это можно сделать автоматически с помощью библиотеки, такой как `express-handlebars`, которая может автоматически загружать частичные шаблоны из заданной директории, или вручную, если ваша настройка требует более тонкой настройки.

Для автоматической регистрации частичных шаблонов при инициализации `express-handlebars`:

```javascript
const { engine } = require("express-handlebars");
const hbs = engine({
    extname: ".handlebars",
    partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs);
app.set("view engine", "handlebars");
```

Убедитесь, что ваша структура директорий правильно настроена, чтобы `express-handlebars` могла найти частичные шаблоны.

#### Шаг 3: Использование частичных шаблонов в основном макете

Теперь, когда частичные шаблоны хедера и футера созданы и зарегистрированы, вы можете легко включить их в любой основной шаблон. Например, в `views/users.handlebars`, включите хедер и футер:

```handlebars
<!DOCTYPE html>
<html>
<head>
    <title>Список пользователей</title>
</head>
<body>
    {{> _header }}

    <h1>Пользователи</h1>
    <!-- Содержимое страницы -->

    {{> _footer }}
</body>
</html>
```

Здесь `{{> _header }}` и `{{> _footer }}` вставляют частичные шаблоны хедера и футера соответственно.

### Продвинутые техники шаблонизации

Хелперы и фильтры в шаблонизаторах позволяют выполнять преобразование данных прямо в шаблоне, добавляя к ним логику без изменения исходных данных. Это может быть полезно для форматирования дат, чисел, текста и других типов данных. Давайте рассмотрим, как можно добавить форматированную дату публикации к списку статей и применить к нему базовую стилизацию, используя Handlebars в Express-приложении.

#### Шаг 1: Создание хелпера для форматирования даты

Для начала создадим хелпер в Handlebars, который будет преобразовывать даты в более читаемый формат. В файле, где настраивается ваше Express приложение (например, `app.js`), добавьте следующий код для регистрации хелпера:

```javascript
const { engine } = require("express-handlebars");
const moment = require("moment"); // убедитесь, что moment установлен (npm install moment)

const hbs = engine({
    extname: ".handlebars",
    helpers: {
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
    },
});

app.engine("handlebars", hbs);
app.set("view engine", "handlebars");
```

Этот хелпер `formatDate` принимает дату и строку формата, используя библиотеку `moment.js` для её преобразования.

#### Шаг 2: Использование хелпера в шаблоне

Теперь вы можете использовать хелпер `formatDate` в любом шаблоне Handlebars для отображения дат. Допустим, у вас есть шаблон для страницы со списком статей, где каждая статья имеет дату публикации:

```handlebars
<ul>
    {{#each articles}}
        <li>
            <h2>{{this.title}}</h2>
            <p>Опубликовано: {{formatDate this.publishDate "DD MMMM YYYY"}}</p>
        </li>
    {{/each}}
</ul>
```

В этом примере `{{formatDate this.publishDate "DD MMMM YYYY"}}` преобразует дату публикации статьи в формат, например, "15 января 2024".

#### Шаг 3: Стилизация списка статей

Для базовой стилизации вы можете добавить немного CSS непосредственно в ваш HTML шаблон или внешний CSS-файл. В примере ниже добавлены стили непосредственно в шаблон для упрощения:

```handlebars
<style>
    ul { list-style-type: none; padding: 0; } li { margin-bottom: 20px; } h2 {
    margin-bottom: 5px; } p { color: #888; font-size: 0.9em; }
</style>

<ul>
    {{#each articles}}
        <li>
            <h2>{{this.title}}</h2>
            <p>Опубликовано: {{formatDate this.publishDate "DD MMMM YYYY"}}</p>
        </li>
    {{/each}}
</ul>
```

### Пример Express-приложения с использованием Handlebars, которое включает работу с MongoDB, определение модели, использование хелперов для форматирования данных, переиспользование компонентов через частичные шаблоны, а также промежуточное ПО (middleware). Этот пример будет представлять собой простое веб-приложение для публикации и просмотра статей.

#### Шаг 1: Настройка проекта

Сначала создайте новый каталог для проекта и инициализируйте его с помощью NPM:

```bash
mkdir express-handlebars-blog
cd express-handlebars-blog
npm init -y
```

Установите необходимые зависимости:

```bash
npm install express mongoose express-handlebars moment
```

#### Шаг 2: Определение модели статьи

В каталоге проекта создайте каталог `models` и внутри файла `Article.js`:

```javascript
// models/Article.js
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    publishDate: Date,
});

module.exports = mongoose.model("Article", articleSchema);
```

#### Шаг 3: Настройка Express и Handlebars

Создайте файл `app.js` в корневом каталоге проекта:

```javascript
const express = require("express");
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const Article = require("./models/Article");
const moment = require("moment");

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/blogDB");

// Настройка Handlebars
app.engine(
    "handlebars",
    engine({
        helpers: {
            formatDate: function (date, format) {
                return moment(date).format(format);
            },
        },
    }),
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Маршруты
app.get("/", async (req, res) => {
    const articles = await Article.find({});
    res.render("home", { articles });
});

// Страница для создания новой статьи
app.get("/articles/new", (req, res) => {
    res.render("articles/new");
});

// Обработчик для создания статьи
app.post("/articles", async (req, res) => {
    const { title, content, publishDate } = req.body;
    await Article.create({
        title,
        content,
        publishDate: new Date(publishDate),
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

#### Шаг 4: Создание шаблонов

1. **Основной макет (`layouts/main.handlebars`):**

```handlebars
<html>
    <head>
        <title>Блог</title>
    </head>
    <body>
        {{{body}}}
    </body>
</html>
```

2. **Домашняя страница (`views/home.handlebars`):**

```handlebars
{{> _header }}
<ul>
    {{#each articles}}
        <li>
            <h2>{{this.title}}</h2>
            <p>Опубликовано: {{formatDate this.publishDate "DD/MM/YYYY"}}</p>
        </li>
    {{/each}}
</ul>
{{> _footer }}
```

3. **Форма для создания статьи (`views/articles/new.handlebars`):**

```handlebars
<h1>Создать статью</h1>
<form action="/articles" method="POST">
    <input type="text" name="title" placeholder="Название" required />
    <textarea name="content" placeholder="Содержание" required></textarea>
    <input type="date" name="publishDate" required />
    <button type="submit">Опубликовать</button>
</form>
```

4. **Частичные шаблоны для хедера и футера (`views/partials/_header.handlebars` и `views/partials/_footer.handlebars`):**

```handlebars
<!-- _header.handlebars -->
<header>

    <nav>
        <a href="/">Главная</a>
        <a href="/articles/new">Создать статью</a>
    </nav>
</header>
```

```handlebars
<!-- _footer.handlebars -->
<footer>
    <p>© 2024 Блог</p>
</footer>
```

#### Шаг 5: Запуск приложения

1. Запустите MongoDB, если он ещё не запущен.
2. Запустите ваше Express-приложение:

```bash
node app.js
```

3. Откройте браузер и перейдите по адресу `http://localhost:3000`, чтобы увидеть домашнюю страницу с публикациями и возможностью добавления новых статей.

Этот пример демонстрирует, как связать вместе основные компоненты для создания динамического веб-приложения на Express с использованием MongoDB для хранения данных, Handlebars для шаблонизации, включая использование частичных шаблонов и хелперов, а также базовую структуру MVC.
