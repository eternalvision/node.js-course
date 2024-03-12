# Создание приложения и организация структуры (Повторение)

## Введение в REST

### Определение REST и RESTful архитектуры

REST (Representational State Transfer) — это архитектурный стиль взаимодействия компонентов распределенного приложения в сети. Основные принципы REST были описаны Роем Филдингом в его докторской диссертации в 2000 году. REST предлагает набор ограничений, которые, при соблюдении, приводят к созданию масштабируемых, надежных и легко модифицируемых веб-сервисов.

### Основные принципы REST: Stateless, Cacheable, Layered System, Uniform Interface

#### 1. Клиент-серверная архитектура

REST подразумевает разделение клиента и сервера. Это разделение позволяет разрабатывать клиентскую и серверную части независимо друг от друга, что упрощает процесс разработки и обеспечивает гибкость при внесении изменений.

#### 2. Без сохранения состояния (Stateless)

Каждый запрос от клиента к серверу должен содержать всю необходимую информацию для его выполнения. Сервер не должен сохранять состояние клиента между запросами. Это упрощает архитектуру сервера и улучшает масштабируемость системы.

#### 3. Кэширование (Cacheable)

Ответы на запросы должны быть явно помечены как кэшируемые или не кэшируемые, чтобы клиенты могли кэшировать ответы и повышать производительность системы за счет снижения количества необходимых запросов.

#### 4. Единообразие интерфейса (Uniform Interface)

Это основной принцип REST, который определяет интерфейс взаимодействия между клиентом и сервером. Единообразие интерфейса достигается за счет следования ряду ограничений, включая:

- **Идентификация ресурсов (URI)**: Ресурсы определяются в запросах с использованием URI. Например, `/users` для доступа к информации о пользователях.
- **Манипуляция ресурсами через представления**: Клиент взаимодействует с ресурсами, отправляя их представления в формате, понятном для сервера (например, JSON или XML), в теле запроса.
- **Самоописываемые сообщения**: Каждый запрос содержит достаточно информации для его обработки. Например, метод HTTP указывает на действие (GET для получения данных, POST для создания, и т.д.).
- **Гипермедиа как движущая сила приложения (HATEOAS)**: Клиенты взаимодействуют с веб-сервисом через гиперссылки, предоставляемые динамически в ответах сервера.

#### 5. Слоистая система (Layered System)

Клиент не может знать, обращается ли он непосредственно к серверу или к промежуточному узлу (например, кэширующему прокси). Это позволяет строить системы с различными уровнями безопасности, балансировки нагрузки и кэширования.

#### RESTful Веб-Сервисы

Веб-сервисы, соблюдающие принципы REST, называются RESTful. Они используют стандартные HTTP методы для создания, чтения, обновления и удаления (CRUD) ресурсов. RESTful сервисы легко интегрируются с вебом и могут быть использованы различными клиентами, включая браузеры, мобильные приложения и другие серверные приложения.

Преимущества RESTful архитектуры включают простоту, масштабируемость, гибкость и широкую поддержку стандартов. Эти качества делают REST популярным выбором для разработки веб-сервисов и API.

### Методы HTTP: GET, POST, PUT, DELETE и их использование в REST

Методы HTTP являются основой взаимодействия в архитектуре REST. Они определяют действия, которые можно выполнять с ресурсами. В RESTful веб-сервисах основными методами являются GET, POST, PUT и DELETE. Использование этих методов соответствует принципам CRUD (Создание, Чтение, Обновление, Удаление), что делает архитектуру веб-сервисов понятной и предсказуемой.

#### GET

**Использование:** Метод GET используется для получения представления ресурса. При его использовании не происходит изменения состояния ресурса, что делает GET идемпотентным методом.

**Пример:** Запрос к `GET /users` вернет список пользователей, а `GET /users/1` вернет информацию о пользователе с идентификатором 1.

#### POST

**Использование:** Метод POST применяется для создания нового ресурса в коллекции ресурсов. POST может также использоваться для запуска операций, которые не создают ресурсы.

**Пример:** Запрос к `POST /users` с телом запроса, содержащим данные пользователя, создаст нового пользователя.

#### PUT

**Использование:** Метод PUT используется для обновления существующего ресурса или создания нового ресурса по указанному URI, если он не существует. PUT является идемпотентным, что означает, что повторение одного и того же запроса PUT будет иметь тот же эффект, что и его однократное выполнение.

**Пример:** Запрос к `PUT /users/1` с телом, содержащим обновленные данные пользователя, обновит пользователя с идентификатором 1 или создаст его, если он не существует.

#### DELETE

**Использование:** Метод DELETE удаляет указанный ресурс.

**Пример:** Запрос к `DELETE /users/1` удалит пользователя с идентификатором 1.

#### Принципы использования

1. **Идемпотентность:** GET, PUT, и DELETE являются идемпотентными методами, что означает, что несколько идентичных запросов будут иметь тот же эффект, что и одиночный запрос. POST не идемпотентен, так как каждый запрос может создавать новый ресурс.
2. **Безопасность:** Методы GET и DELETE считаются "безопасными" в том смысле, что они не должны изменять состояние ресурса (хотя DELETE удаляет ресурс, он не изменяет сам ресурс). POST и PUT могут изменять состояние ресурса и поэтому требуют осторожного использования.
3. **Кэширование:** Ответы на GET-запросы могут быть кэшированы, чтобы уменьшить нагрузку на сервер и ускорить загрузку данных для клиентов. Ответы на POST, PUT и DELETE обычно не кэшируются, так как они изменяют состояние системы.

## Реализация REST в Express

### Создание REST API в Express. Интеграция методов

Для создания REST API в Express, начнём с базовой структуры приложения, которая включает определение маршрутов для различных HTTP методов, таких как GET, POST, PUT, и DELETE. Эти методы будут использоваться для выполнения операций CRUD (создание, чтение, обновление, удаление) над ресурсами, например, пользователями.

#### Шаг 1: Инициализация проекта

Перед тем, как начать, убедитесь, что у вас установлены Node.js и npm. Создайте новую папку для вашего проекта и инициализируйте новый проект Node.js:

```bash
mkdir my-rest-api
cd my-rest-api
npm init -y
```

#### Шаг 2: Установка Express

Установите Express через npm:

```bash
npm install express
```

#### Шаг 3: Создание сервера Express

Создайте файл `index.js` (или `app.js`, как предпочитаете) в корне вашего проекта и добавьте следующий код для создания базового сервера Express:

```javascript
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // Для парсинга JSON-тел запросов

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

#### Шаг 4: Определение маршрутов для REST API

Давайте добавим маршруты для выполнения операций CRUD над ресурсами. В качестве примера используем ресурс `users`.

```javascript
let users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
];

// Получение списка всех пользователей
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// Получение пользователя по ID
app.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json(user);
});

// Создание нового пользователя
app.post("/users", (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(user);
    res.status(201).json(user);
});

// Обновление пользователя по ID
app.put("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send("User not found");
    }
    user.name = req.body.name;
    res.status(200).json(user);
});

// Удаление пользователя по ID
app.delete("/users/:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    if (!users) {
        return res.status(404).send("User not found");
    }
    res.status(204).send();
});
```

#### Шаг 5: Тестирование API

Теперь, когда ваш сервер настроен, вы можете тестировать ваше API с помощью инструментов, таких как Postman или curl. Например, чтобы получить список всех пользователей, вы можете использовать следующую команду curl:

```bash
curl http://localhost:3000/users
```

### Роутинг и обработка различных HTTP методов

Роутинг в Express — это способ определения серверных ответов на различные HTTP запросы по определенным URL-адресам и HTTP методам. Каждый маршрут может иметь одну или несколько обработчиков функций, которые выполняются, когда маршрут соответствует URL запроса.

#### Основы роутинга в Express

Роутинг в Express осуществляется с помощью методов `app.METHOD`, где `METHOD` — это один из HTTP методов, таких как `get`, `post`, `put`, `delete` и т.д., в нижнем регистре. Эти методы принимают два основных аргумента: путь (URL) и функцию обработчика.

##### Примеры роутов

```javascript
// GET запрос
app.get("/", (req, res) => {
    res.send("GET запрос к домашней странице");
});

// POST запрос
app.post("/users", (req, res) => {
    // Создание нового пользователя
    res.send("POST запрос для создания пользователя");
});

// PUT запрос
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    // Обновление пользователя с указанным id
    res.send(`PUT запрос для обновления пользователя с id ${id}`);
});

// DELETE запрос
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    // Удаление пользователя с указанным id
    res.send(`DELETE запрос для удаления пользователя с id ${id}`);
});
```

##### Динамические маршруты

Express позволяет определять маршруты с параметрами, так называемые динамические маршруты, которые делают возможным передачу информации в URL.

##### Пример динамического маршрута

```javascript
app.get("/users/:userId/books/:bookId", (req, res) => {
    res.send(req.params);
});
```

В этом примере, `:userId` и `:bookId` являются параметрами маршрута, значения которых будут доступны в `req.params.userId` и `req.params.bookId`.

##### Роутер Express

Для управления группами связанных маршрутов удобно использовать экземпляры `express.Router`. Это позволяет определять маршруты в модульном стиле, что упрощает поддержку и масштабирование приложения.

##### Пример использования роутера

```javascript
const express = require("express");
const router = express.Router();

// Middleware, применяемый ко всем запросам, проходящим через данный роутер
router.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});

// Определение домашней страницы роутера
router.get("/", (req, res) => {
    res.send("Домашняя страница");
});

// Определение страницы About
router.get("/about", (req, res) => {
    res.send("Страница О нас");
});

// Подключение роутера к основному приложению
app.use("/", router);
```

В этом примере создаётся экземпляр `Router`, для которого определяются маршруты. Затем этот роутер подключается к основному приложению.

### Параметры в URL и обработка запросов

Параметры в URL являются важной частью роутинга в Express, позволяя вашему приложению динамически принимать данные через URL. Эти параметры могут использоваться для получения данных из запроса, идентификации ресурсов, фильтрации результатов и выполнения множества других задач, связанных с обработкой запроса.

#### Использование параметров маршрута

Параметры маршрута определяются в пути маршрута с помощью символа `:`, за которым следует имя параметра. Параметры извлекаются из URL и становятся доступными в объекте `req.params`.

##### Пример маршрута с параметром

```javascript
app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    res.send(`Показать информацию пользователя с ID ${userId}`);
});
```

#### Использование параметров запроса (Query Strings)

Параметры запроса (Query Strings) передаются после символа `?` в URL и представляют собой пары ключ-значение, разделённые символом `&`. Они доступны в объекте `req.query`.

##### Пример URL с параметрами запроса

```
http://example.com/api/users?search=john&limit=10
```

##### Пример обработки параметров запроса

```javascript
app.get("/api/users", (req, res) => {
    const search = req.query.search;
    const limit = req.query.limit;
    res.send(
        `Поиск пользователей по запросу "${search}" с ограничением ${limit}`,
    );
});
```

#### Использование тела запроса (Request Body)

Для методов POST и PUT данные часто передаются в теле запроса. Чтобы работать с JSON телом запроса в Express, необходимо использовать middleware `express.json()` для парсинга JSON тела запроса.

##### Пример маршрута с обработкой тела запроса

```javascript
app.use(express.json());

app.post("/api/users", (req, res) => {
    const userName = req.body.name;
    const userAge = req.body.age;
    // Создание нового пользователя с данными из тела запроса
    res.status(201).send(
        `Пользователь ${userName} с возрастом ${userAge} создан.`,
    );
});
```

#### Использование промежуточного ПО (Middleware) для обработки запросов

Middleware в Express — это функции, которые имеют доступ к объекту запроса (`req`), объекту ответа (`res`) и следующей функции middleware в цикле запроса-ответа приложения. Middleware может выполнять различные задачи, такие как изменение запросов или ответов, завершение цикла запроса-ответа, вызов следующей функции middleware в стеке.

##### Пример использования middleware для логирования

```javascript
app.use((req, res, next) => {
    console.log(`Получен запрос к ${req.url}`);
    next();
});
```

## Практическая работа

### Создание большого REST API для приложения ведения проектов и пользователей в них

Создание большого REST API для управления проектами и пользователями в них включает в себя проектирование эндпоинтов для различных операций CRUD (создание, чтение, обновление, удаление) для каждого ресурса. Вот пример того, как можно организовать такой API в приложении на Express.

#### Шаг 1: Планирование Эндпоинтов

##### Пользователи

- `POST /users` - Создание нового пользователя.
- `GET /users` - Получение списка всех пользователей.
- `GET /users/:userId` - Получение информации о пользователе.
- `PUT /users/:userId` - Обновление данных пользователя.
- `DELETE /users/:userId` - Удаление пользователя.

##### Проекты

- `POST /projects` - Создание нового проекта.
- `GET /projects` - Получение списка всех проектов.
- `GET /projects/:projectId` - Получение детальной информации о проекте.
- `PUT /projects/:projectId` - Обновление информации о проекте.
- `DELETE /projects/:projectId` - Удаление проекта.

##### Участие пользователей в проектах

- `POST /projects/:projectId/users` - Добавление пользователя в проект.
- `GET /projects/:projectId/users` - Получение списка пользователей проекта.
- `DELETE /projects/:projectId/users/:userId` - Удаление пользователя из проекта.

#### Шаг 2: Настройка Express и Middleware

```javascript
const express = require("express");
const app = express();
app.use(express.json()); // Для парсинга JSON-тел запросов

const port = 3000;
```

#### Шаг 3: Реализация Маршрутов

##### Реализация Маршрутов для Пользователей

```javascript
app.post("/users", (req, res) => {
    // Логика создания пользователя
});

app.get("/users", (req, res) => {
    // Логика получения списка пользователей
});

// Добавьте остальные маршруты аналогично
```

##### Реализация Маршрутов для Проектов

```javascript
app.post("/projects", (req, res) => {
    // Логика создания проекта
});

app.get("/projects", (req, res) => {
    // Логика получения списка проектов
});

// Добавьте остальные маршруты аналогично
```

##### Реализация Маршрутов для Участия Пользователей в Проектах

```javascript
app.post("/projects/:projectId/users", (req, res) => {
    // Логика добавления пользователя в проект
});

app.get("/projects/:projectId/users", (req, res) => {
    // Логика получения списка пользователей проекта
});

// Добавьте остальные маршруты аналогично
```

#### Шаг 4: Запуск сервера

```javascript
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

### Демонстрация реализации логики

Для демонстрации реализации логики каждого эндпоинта создадим простую имитацию работы с базой данных с помощью JavaScript объектов. В реальных приложениях вы бы использовали базу данных, такую как MongoDB или PostgreSQL, с соответствующими запросами для CRUD операций.

#### Инициализация "Базы данных"

```javascript
let users = [
    { id: 1, name: "Alice", projects: [] },
    { id: 2, name: "Bob", projects: [] },
];

let projects = [
    { id: 1, name: "Project 1", userIds: [1] },
    { id: 2, name: "Project 2", userIds: [2] },
];

let nextUserId = 3;
let nextProjectId = 3;
```

#### Эндпоинты для Пользователей

##### Создание нового пользователя

```javascript
app.post("/users", (req, res) => {
    const { name } = req.body;
    const newUser = { id: nextUserId++, name, projects: [] };
    users.push(newUser);
    res.status(201).json(newUser);
});
```

##### Получение списка всех пользователей

```javascript
app.get("/users", (req, res) => {
    res.status(200).json(users);
});
```

##### Получение информации о пользователе

```javascript
app.get("/users/:userId", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.userId));
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.status(200).json(user);
});
```

##### Обновление данных пользователя

```javascript
app.put("/users/:userId", (req, res) => {
    const { name } = req.body;
    const user = users.find((u) => u.id === parseInt(req.params.userId));
    if (!user) {
        return res.status(404).send("User not found");
    }
    user.name = name;
    res.status(200).json(user);
});
```

##### Удаление пользователя

```javascript
app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    users = users.filter((u) => u.id !== userId);
    projects.forEach((p) => {
        p.userIds = p.userIds.filter((id) => id !== userId);
    });
    res.status(204).send();
});
```

#### Эндпоинты для Проектов

##### Создание нового проекта

```javascript
app.post("/projects", (req, res) => {
    const { name, userIds } = req.body;
    const newProject = { id: nextProjectId++, name, userIds: userIds || [] };
    projects.push(newProject);
    userIds.forEach((userId) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
            user.projects.push(newProject.id);
        }
    });
    res.status(201).json(newProject);
});
```

##### Получение списка всех проектов

```javascript
app.get("/projects", (req, res) => {
    res.status(200).json(projects);
});
```

##### Получение детальной информации о проекте

```javascript
app.get("/projects/:projectId", (req, res) => {
    const project = projects.find(
        (p) => p.id === parseInt(req.params.projectId),
    );
    if (!project) {
        return res.status(404).send("Project not found");
    }
    res.status(200).json(project);
});
```

##### Обновление информации о проекте

```javascript
app.put("/projects/:projectId", (req, res) => {
    const { name, userIds } = req.body;
    const project = projects.find(
        (p) => p.id === parseInt(req.params.projectId),
    );
    if (!project) {
        return res.status(404).send("Project not found");
    }
    project.name = name;
    project.userIds = userIds;
    res.status(200).json(project);
});
```

##### Удаление проекта

```javascript
app.delete("/projects/:projectId", (req, res) => {
    const projectId = parseInt(req.params.projectId);
    projects = projects.filter((p) => p.id !== projectId);
    users.forEach((user) => {
        user.projects = user.projects.filter((pid) => pid !== projectId);
    });
    res.status(204).send();
});
```

#### Эндпоинты для Участия Пользователей в Проектах

##### Добавление пользователя в проект

```javascript
app.post("/projects/:projectId/users", (req, res) => {
    const { userId } = req.body;
    const project = projects.find(
        (p) => p.id === parseInt(req.params.projectId),
    );
    if (!project) {
        return res.status(404).send("Project not found");
    }
    if (!project.userIds.includes(userId)) {
        project.userIds.push(userId);
        const user = users.find((u) => u.id === userId);
        if (user && !user.projects.includes(project.id)) {
            user.projects.push(project.id);
        }
    }
    res.status(200).json(project);
});
```

##### Получение списка пользователей проекта

```javascript
app.get("/projects/:projectId/users", (req, res) => {
    const project = projects.find(
        (p) => p.id === parseInt(req.params.projectId),
    );
    if (!project) {
        return res.status(404).send("Project not found");
    }
    const projectUsers = users.filter((user) =>
        project.userIds.includes(user.id),
    );
    res.status(200).json(projectUsers);
});
```

##### Удаление пользователя из проекта

```javascript
app.delete("/projects/:projectId/users/:userId", (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const userId = parseInt(req.params.userId);
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
        return res.status(404).send("Project not found");
    }
    project.userIds = project.userIds.filter((id) => id !== userId);
    const user = users.find((u) => u.id === userId);
    if (user) {
        user.projects = user.projects.filter((pid) => pid !== projectId);
    }
    res.status(204).send();
});
```

### Разделение кода

#### Структура проекта

Вот пример структуры каталогов для нашего REST API проекта:

```
/project-name
    /node_modules
    /models
        user.js
        project.js
    /controllers
        userController.js
        projectController.js
    /routes
        userRoutes.js
        projectRoutes.js
    app.js
```

#### Шаг 1: Модели

Вместо классов просто определим начальные данные:

##### models/data.js

```javascript
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];
let projects = [
    { id: 1, name: "Project 1", userIds: [1] },
    { id: 2, name: "Project 2", userIds: [2] },
];

module.exports = { users, projects };
```

#### Шаг 2: Контроллеры

Определим контроллеры как функции, непосредственно работающие с данными.

##### controllers/userController.js

```javascript
const { users } = require("../models/data");

const getAllUsers = (req, res) => res.json(users);
const getUserById = (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.userId));
    user ? res.json(user) : res.status(404).send("User not found");
};

module.exports = { getAllUsers, getUserById };
```

Аналогично определите `projectController.js`.

#### Шаг 3: Маршруты

Используем маршруты для связывания запросов с контроллерами.

##### routes/userRoutes.js

```javascript
const express = require("express");
const { getAllUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);

module.exports = router;
```

Аналогично определите `routes/projectRoutes.js`.

#### Шаг 4: app.js

Подключаем маршруты к Express приложению.

```javascript
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

const port = 3000;
app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
);
```
