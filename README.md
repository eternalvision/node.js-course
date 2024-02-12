# Продвинутая маршрутизация и обработка запросов в Express

## Параметры маршрута, query параметры и тело запроса

### Введение в параметры маршрута

#### Объяснение, что такое параметры маршрута и как они используются для извлечения данных из URL.

Параметры маршрута в Express — это именованные сегменты URL, которые используются для захвата значений, указанных в их позиции в URL. Эти значения могут быть затем использованы в вашем приложении, например, для извлечения данных из базы данных, идентификации пользователя или других целей, требующих динамической обработки запросов. Параметры маршрута определяются в пути маршрута с помощью символа `:`, за которым следует имя параметра.

#### Примеры использования параметров маршрута в Express (`app.get('/users/:userId', function(req, res) {...})`).

Рассмотрим пример маршрута для получения информации о пользователе по его ID:

```javascript
app.get("/users/:userId", function (req, res) {
    const userId = req.params.userId;
    // Здесь можно добавить логику для поиска пользователя в базе данных по userId
    res.send(`Пользователь с ID: ${userId}`);
});
```

В этом примере `:userId` является параметром маршрута. Когда пользователь обращается к URL вроде `/users/123`, Express автоматически распознает `123` как значение параметра `userId` и делает его доступным через `req.params.userId`.

#### Упражнения на извлечение параметров маршрута и их использование в логике обработки запросов

##### Получение профиля пользователя

Создайте маршрут для получения профиля пользователя по его ID. Предположим, что у вас есть объект (или массив объектов) с данными пользователей, и вы хотите найти и вернуть данные пользователя с конкретным ID.

```javascript
const users = [
    { id: 1, name: "Иван", age: 30 },
    { id: 2, name: "Мария", age: 25 },
    // Добавьте больше пользователей для тестирования
];

app.get("/users/:userId", function (req, res) {
    const userId = parseInt(req.params.userId, 10); // Преобразуем userId в число
    const user = users.find((user) => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Пользователь не найден");
    }
});
```

##### Редактирование данных пользователя

Добавьте маршрут, который позволяет обновлять данные пользователя (например, имя). Используйте параметр маршрута для указания ID пользователя и тело запроса для передачи новых данных.

```javascript
app.put("/users/:userId", function (req, res) {
    const userId = parseInt(req.params.userId, 10);
    const { name } = req.body; // Предполагаем, что в теле запроса отправлено новое имя пользователя
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex].name = name; // Обновляем имя пользователя
        res.json(users[userIndex]);
    } else {
        res.status(404).send("Пользователь не найден");
    }
});
```

##### Удаление пользователя

Добавьте маршрут, который позволяет удалять пользователя по его ID. В этом упражнении вы будете использовать параметр маршрута для идентификации пользователя, которого нужно удалить, и метод HTTP DELETE для выполнения операции удаления.

```javascript
app.delete("/users/:userId", function (req, res) {
    const userId = parseInt(req.params.userId, 10);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1); // Удаляем пользователя из массива
        res.send("Пользователь удален");
    } else {
        res.status(404).send("Пользователь не найден");
    }
});
```

Это упражнение поможет вам понять, как обрабатывать удаление ресурсов в вашем API, используя параметры маршрута для определения, какой именно ресурс нужно удалить.

##### Получение информации о книге по ISBN

Предположим, что вы работаете над приложением для библиотеки и хотите добавить функциональность для получения информации о книге по её ISBN. ISBN (Международный стандартный книжный номер) — это уникальный идентификатор книги. В этом упражнении создайте маршрут, который использует параметр маршрута для получения книги по её ISBN.

```javascript
const books = [
    { isbn: "978-3-16-148410-0", title: "Название книги 1", author: "Автор 1" },
    { isbn: "978-4-16-148410-1", title: "Название книги 2", author: "Автор 2" },
    // Добавьте больше книг для тестирования
];

app.get("/books/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    const book = books.find((book) => book.isbn === isbn);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Книга не найдена");
    }
});
```

### Query параметры

#### Разбор концепции query параметров и их отличия от параметров маршрута.

Query параметры - это часть URL, которая используется для передачи дополнительной информации в запросе к серверу. Они начинаются с символа вопроса `?` и идут после пути к ресурсу. Query параметры представляют собой пары ключ-значение, разделенные символом амперсанда `&`. Например, в URL `https://example.com/search?q=express&lang=en` `q` и `lang` являются query параметрами.

Отличия между query параметрами и параметрами маршрута:

1. **Расположение в URL**: Параметры маршрута встроены непосредственно в путь маршрута и являются его частью, в то время как query параметры идут после пути и отделяются от него символом `?`.
2. **Использование в Express**: Параметры маршрута доступны через объект `req.params`, а query параметры доступны через объект `req.query`.
3. **Предназначение**: Параметры маршрута обычно используются для идентификации или адресации конкретного ресурса, в то время как query параметры используются для передачи дополнительной информации о запросе, такой как фильтры, сортировки, ограничения и т.д.

Например, веб-приложение для поиска книг может использовать параметры маршрута для получения информации о конкретной книге по её ID (`/books/:bookId`), а query параметры для фильтрации результатов по жанру или автору (`/books?genre=fiction&author=tolstoy`).

#### Примеры использования query параметров для фильтрации данных или передачи дополнительной информации в запросе (`req.query`).

##### Фильтрация списка книг по жанру и/или автору

Предположим, у вас есть API для получения списка книг, и вы хотите предоставить возможность клиентам фильтровать список книг по жанру и/или автору.

```javascript
// GET /books?genre=fiction&author=Tolstoy
app.get("/books", function (req, res) {
    const { genre, author } = req.query;
    let filteredBooks = books;

    if (genre) {
        filteredBooks = filteredBooks.filter(
            (book) => book.genre.toLowerCase() === genre.toLowerCase(),
        );
    }

    if (author) {
        filteredBooks = filteredBooks.filter((book) =>
            book.author.toLowerCase().includes(author.toLowerCase()),
        );
    }

    res.json(filteredBooks);
});
```

В этом примере мы используем query параметры `genre` и `author` для фильтрации списка книг по жанру и/или автору. Если эти параметры присутствуют в запросе, мы фильтруем список книг только по соответствующим значениям.

##### Пагинация списка пользователей

Предположим, у вас есть API для получения списка пользователей, и вы хотите реализовать пагинацию результатов, чтобы обрабатывать большие объемы данных.

```javascript
// GET /users?page=2&limit=10
app.get("/users", function (req, res) {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json(paginatedUsers);
});
```

##### Сортировка списка товаров

Предположим, у вас есть API для получения списка товаров, и вы хотите предоставить возможность клиентам сортировать список товаров по различным критериям, таким как цена, название и дата добавления.

```javascript
// GET /products?sortBy=price&order=asc
app.get("/products", function (req, res) {
    const { sortBy, order } = req.query;
    let sortedProducts = [...products]; // Клонируем массив товаров

    if (sortBy) {
        sortedProducts.sort((a, b) => {
            if (order === "desc") {
                return b[sortBy] - a[sortBy]; // Сортировка по убыванию
            } else {
                return a[sortBy] - b[sortBy]; // Сортировка по возрастанию
            }
        });
    }

    res.json(sortedProducts);
});
```

В этом примере мы используем query параметры `sortBy` и `order` для сортировки списка товаров. Если параметр `sortBy` присутствует в запросе, мы сортируем список товаров по этому критерию. Параметр `order` позволяет указать направление сортировки (по возрастанию или по убыванию).

##### Фильтрация списка заказов по дате

Предположим, у вас есть API для получения списка заказов, и вы хотите предоставить возможность клиентам фильтровать заказы по дате.

```javascript
// GET /orders?startDate=2023-01-01&endDate=2023-12-31
app.get("/orders", function (req, res) {
    const { startDate, endDate } = req.query;
    let filteredOrders = [...orders]; // Клонируем массив заказов

    if (startDate && endDate) {
        filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.date);
            return (
                orderDate >= new Date(startDate) &&
                orderDate <= new Date(endDate)
            );
        });
    }

    res.json(filteredOrders);
});
```

В этом примере мы используем query параметры `startDate` и `endDate` для фильтрации списка заказов по диапазону дат. Мы проверяем каждый заказ и включаем его в результаты, если дата заказа находится в заданном диапазоне.

#### Практическое задание на обработку query параметров, создания API, которое позволяет фильтровать список пользователей по возрасту, имени, работе и зарплате.

```javascript
const express = require("express");
const app = express();

// Предположим, что у нас есть массив пользователей
const users = [
    { id: 1, name: "John", age: 30, job: "Developer", salary: 50000 },
    { id: 2, name: "Alice", age: 25, job: "Designer", salary: 60000 },
    { id: 3, name: "Bob", age: 35, job: "Manager", salary: 70000 },
    // Добавьте больше пользователей по мере необходимости
];

// Маршрут для фильтрации списка пользователей
app.get("/users", function (req, res) {
    // Извлекаем query параметры из запроса
    const { age, name, job, salary } = req.query;

    // Применяем фильтрацию к списку пользователей
    let filteredUsers = users;

    if (age) {
        filteredUsers = filteredUsers.filter(
            (user) => user.age === parseInt(age),
        );
    }

    if (name) {
        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase()),
        );
    }

    if (job) {
        filteredUsers = filteredUsers.filter((user) =>
            user.job.toLowerCase().includes(job.toLowerCase()),
        );
    }

    if (salary) {
        filteredUsers = filteredUsers.filter(
            (user) => user.salary === parseInt(salary),
        );
    }

    // Возвращаем отфильтрованный список пользователей
    res.json(filteredUsers);
});

// Запускаем сервер
app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
```

Теперь, когда вы отправите GET запрос на `/users` с нужными query параметрами, вы получите отфильтрованный список пользователей в соответствии с этими параметрами. Например:

-   `/users?age=30` - вернет список пользователей возрастом 30 лет.
-   `/users?name=John` - вернет список пользователей с именем John.
-   `/users?job=Developer` - вернет список пользователей, работающих в должности Developer.
-   `/users?salary=60000` - вернет список пользователей с зарплатой 60000.

Это позволяет вашим клиентам легко фильтровать список пользователей в вашем приложении в соответствии с их потребностями.

### Работа с телом запроса

#### Обзор методов для чтения тела запроса (`req.body`) и необходимость использования middleware, таких как `express.json()` и `express.urlencoded()`.

Когда клиент отправляет POST или PUT запрос с данными, эти данные обычно передаются в теле запроса. Для чтения этих данных в Express используется свойство `req.body`. Однако, по умолчанию Express не предоставляет доступ к `req.body`, поэтому необходимо использовать middleware, такие как `express.json()` и `express.urlencoded()`, чтобы разобрать тело запроса и сделать его доступным через `req.body`.

-   **express.json()**: Это встроенный middleware в Express, который используется для разбора данных в формате JSON, отправленных в теле запроса. После применения этого middleware, данные JSON становятся доступными через `req.body`.
-   **express.urlencoded()**: Этот middleware используется для разбора данных, отправленных в виде URL-кодированных форм. Он анализирует данные, закодированные в теле запроса с использованием `application/x-www-form-urlencoded` и делает их доступными через `req.body`.

Эти middleware должны быть добавлены в цепочку middleware перед тем, как они будут использоваться. Обычно они добавляются с помощью вызова `app.use()` перед определением маршрутов, чтобы быть применены ко всем запросам.

```javascript
const express = require("express");
const app = express();

// Используем middleware для разбора данных в формате JSON
app.use(express.json());

// Используем middleware для разбора данных из URL-кодированных форм
app.use(express.urlencoded({ extended: true }));

// Маршруты и обработчики запросов здесь
```

После применения этих middleware, вы сможете получить доступ к данным из тела запроса через `req.body` в обработчиках маршрутов. Это позволяет вашему приложению обрабатывать данные, отправленные клиентом, например, при создании новых ресурсов или обновлении существующих.

#### Демонстрация, как получать и использовать данные, отправленные в формате JSON или из форм.

Давайте создадим простой пример, демонстрирующий, как получать и использовать данные, отправленные в формате JSON или из форм.

Допустим, у нас есть простое веб-приложение, которое позволяет пользователям отправлять информацию о себе, такую как имя и возраст, через форму или в формате JSON.

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Используем middleware для разбора данных в формате JSON
app.use(express.json());

// Используем middleware для разбора данных из URL-кодированных форм
app.use(express.urlencoded({ extended: true }));

// Массив для хранения информации о пользователях
let users = [];

// Маршрут для отображения формы
app.get("/", (req, res) => {
    res.send(`
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="age">Age:</label>
      <input type="text" id="age" name="age"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Маршрут для обработки данных из формы
app.post("/submit", (req, res) => {
    const { name, age } = req.body;
    users.push({ name, age });
    res.send("Данные успешно отправлены из формы!");
});

// Маршрут для обработки данных в формате JSON
app.post("/json", (req, res) => {
    const { name, age } = req.body;
    users.push({ name, age });
    res.json({ message: "Данные успешно отправлены в формате JSON!", users });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

В этом примере мы создаем простую форму с полями для имени и возраста. Когда пользователь отправляет форму, данные отправляются на маршрут `/submit`, где мы получаем их из `req.body` и добавляем в массив `users`.

Мы также создаем отдельный маршрут `/json`, который ожидает данные в формате JSON. Когда данные отправляются на этот маршрут, мы также получаем их из `req.body`, добавляем в массив `users` и отправляем ответ в формате JSON с сообщением об успешной отправке и текущим списком пользователей.

#### Задача на разработку функционала, требующего чтение и обработку тела POST-запроса, добавление нового пользователя, удаление, вывод и изменение данных.

Для начала определимся с тем, какие маршруты и методы HTTP будем использовать:

##### Добавление нового пользователя:

-   Метод: POST
-   Маршрут: `/users`
-   Данные: имя и возраст нового пользователя в теле запроса

##### Удаление пользователя:

-   Метод: DELETE
-   Маршрут: `/users/:userId`
-   Параметры маршрута: идентификатор пользователя (`userId`)

##### Получение списка всех пользователей:

-   Метод: GET
-   Маршрут: `/users`

##### Получение информации о конкретном пользователе:

-   Метод: GET
-   Маршрут: `/users/:userId`
-   Параметры маршрута: идентификатор пользователя (`userId`)

##### Обновление информации о пользователе:

-   Метод: PUT
-   Маршрут: `/users/:userId`
-   Параметры маршрута: идентификатор пользователя (`userId`)
-   Данные: новые данные пользователя в теле запроса

Теперь создадим решение:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Используем middleware для разбора данных в формате JSON
app.use(express.json());

// Пример базы данных пользователей
let users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
];

// Добавление нового пользователя
app.post("/users", (req, res) => {
    const { name, age } = req.body;
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    res.json(newUser);
});

// Получение списка всех пользователей
app.get("/users", (req, res) => {
    res.json(users);
});

// Получение информации о конкретном пользователе
app.get("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Пользователь не найден" });
    }
});

// Обновление информации о пользователе
app.put("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const { name, age } = req.body;
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
        users[index] = { ...users[index], name, age };
        res.json(users[index]);
    } else {
        res.status(404).json({ error: "Пользователь не найден" });
    }
});

// Удаление пользователя
app.delete("/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: "Пользователь удален" });
    } else {
        res.status(404).json({ error: "Пользователь не найден" });
    }
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

Это простой пример API для управления списком пользователей. Вы можете тестировать его с помощью инструментов для отправки запросов, таких как Postman. Важно заметить, что это только пример, и в реальном приложении потребуется добавить дополнительную обработку ошибок, валидацию данных и возможно подключение к базе данных для хранения данных.

## Работа с middleware в Express

### Введение в middleware

#### Объяснение понятия middleware и его роли в обработке запросов в Express.

Middleware - это функции, которые выполняются перед или после обработки запроса, но перед отправкой ответа в Express. Они предоставляют гибкость и мощные возможности для обработки запросов и ответов в приложении.

Middleware выполняют различные задачи, такие как:

1. Обработка данных перед передачей их обработчику маршрута.
2. Модификация запроса или ответа.
3. Проверка аутентификации и авторизации.
4. Логирование запросов и ответов.
5. Обработка ошибок.

Middleware могут быть применены ко всему приложению или только к определенным маршрутам, что делает их мощным инструментом для управления потоком запросов в Express.

Каждое middleware представляет собой функцию с тремя параметрами: `req` (объект запроса), `res` (объект ответа) и `next` (функция, вызывающая следующее middleware в цепочке).

Пример middleware:

```javascript
// Пример middleware для логирования запросов
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Переход к следующему middleware
}
```

Этот пример middleware логирует каждый входящий запрос, выводя метод запроса и URL. После этого вызывается функция `next()`, чтобы передать управление следующему middleware в цепочке.

Middleware могут быть добавлены в Express с помощью функции `app.use()` или применены к конкретным маршрутам с помощью функции `app.use()` или методов маршрутов, таких как `app.get()`, `app.post()`, и т.д.

```javascript
// Применение middleware ко всем запросам
app.use(loggerMiddleware);

// Применение middleware к определенному маршруту
app.get("/users", authMiddleware, getUsersHandler);
```

Это позволяет создавать гибкие и масштабируемые приложения, обрабатывая запросы в соответствии с их требованиями и предоставляя мощные инструменты для управления потоком данных.

#### Обзор типов middleware: встроенные, сторонние и собственные.

Middleware в Express можно разделить на три основных типа: встроенные, сторонние и собственные.

1. **Встроенные middleware**:

    - Встроенные middleware поставляются с Express и предоставляют базовую функциональность, такую как обработка статических файлов, парсинг тела запроса и другие.
    - Примеры встроенных middleware: `express.static`, `express.json()`, `express.urlencoded()`.

2. **Сторонние middleware**:

    - Сторонние middleware разработаны сторонними разработчиками и распространяются как пакеты npm.
    - Они предоставляют дополнительную функциональность, которая может быть полезна в вашем приложении, например, middleware для аутентификации, логирования или валидации данных.
    - Примеры сторонних middleware: `passport` для аутентификации, `morgan` для логирования.

3. **Собственные middleware**:

    - Собственные middleware разрабатываются вами для обработки конкретных задач в вашем приложении.
    - Они предоставляют полный контроль над обработкой запросов и ответов и могут быть адаптированы к вашим уникальным потребностям.
    - Собственные middleware могут быть применены к всему приложению или к определенным маршрутам в зависимости от требований вашего приложения.
    - Примеры собственных middleware: middleware для аутентификации пользователей, middleware для валидации данных, middleware для обработки ошибок.

Использование различных типов middleware позволяет разработчикам создавать гибкие и мощные приложения, обрабатывая запросы и предоставляя функциональность, которая соответствует требованиям и потребностям пользователей.

#### Примеры использования встроенных middleware (`express.static`, `express.json()`).

##### Пример использования `express.static`

Middleware `express.static` используется для обслуживания статических файлов, таких как HTML, CSS, изображения и другие файлы, содержимое которых не меняется в зависимости от запроса клиента.

```javascript
const express = require("express");
const app = express();

// Используем express.static для обслуживания статических файлов из папки "public"
app.use(express.static("public"));

// Маршрут для обработки других запросов
app.get("/", (req, res) => {
    res.send("Главная страница");
});

// Запускаем сервер
app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
```

В этом примере, если у нас есть файл `public/style.css`, то при обращении к `http://localhost:3000/style.css` Express автоматически найдет и отдаст этот файл.

##### Пример использования `express.json()`

Middleware `express.json()` используется для разбора тела запроса в формате JSON и предоставления его в виде JavaScript объекта в свойстве `req.body`.

```javascript
const express = require("express");
const app = express();

// Используем express.json() для разбора тела запроса в формате JSON
app.use(express.json());

// Маршрут для обработки POST запроса
app.post("/api/users", (req, res) => {
    const { name, age } = req.body;
    // Далее обработка данных и отправка ответа
});

// Запускаем сервер
app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
```

В этом примере, когда на сервер поступает POST запрос с телом в формате JSON, `express.json()` разбирает это тело и предоставляет его в виде объекта `req.body`, что позволяет нам легко получить доступ к данным и использовать их в дальнейшей обработке запроса.

### Создание и использование собственных middleware

Для создания и использования собственного middleware в Express нужно определить функцию middleware, которая принимает три параметра: `req`, `res` и `next`. После выполнения нужных операций она может передать управление следующему middleware в цепочке с помощью вызова функции `next()`. Давайте создадим собственное middleware для логирования запросов с выводом информации о методе запроса и URL.

```javascript
// Собственное middleware для логирования запросов
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Передаем управление следующему middleware
}

// Применяем middleware ко всем запросам
app.use(loggerMiddleware);

// Маршруты и обработчики запросов здесь
```

В этом примере, `loggerMiddleware` - это собственное middleware для логирования запросов. Он выводит в консоль текущее время, метод запроса и URL. После этого вызывается функция `next()`, чтобы передать управление следующему middleware в цепочке.

Для примера полного приложения с использованием этого собственного middleware:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Собственное middleware для логирования запросов
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Передаем управление следующему middleware
}

// Применяем middleware ко всем запросам
app.use(loggerMiddleware);

// Маршруты и обработчики запросов
app.get("/", (req, res) => {
    res.send("Главная страница");
});

app.get("/users", (req, res) => {
    res.json({ message: "Список пользователей" });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

Теперь при каждом запросе к серверу будет вызываться middleware `loggerMiddleware`, и информация о запросе будет выводиться в консоль. Это простой пример собственного middleware, который можно адаптировать и расширить для выполнения других задач, таких как аутентификация, обработка ошибок и многое другое.

#### Пошаговое руководство по созданию собственного middleware. Объяснение структуры функции middleware и её параметров (`req`, `res`, `next`).

##### Определение функции middleware

Сначала нужно определить функцию middleware. Это обычная функция JavaScript, которая принимает три параметра: `req`, `res` и `next`. Вот пример определения функции middleware:

```javascript
function myMiddleware(req, res, next) {
    // Логика middleware
    next(); // Переход к следующему middleware
}
```

##### Параметры функции middleware

-   `req` (объект запроса): представляет запрос, поступивший на сервер. Содержит информацию о запросе, такую как URL, параметры маршрута, заголовки, тело запроса и т. д.
-   `res` (объект ответа): представляет ответ, который будет отправлен обратно клиенту. С помощью этого объекта можно управлять отправляемым контентом, статусом ответа и заголовками.
-   `next` (функция): это функция, которая вызывается, чтобы передать управление следующему middleware в цепочке. Если эту функцию не вызвать, управление не будет передано следующему middleware, и запрос "замрет" в текущем middleware.

##### Реализация логики middleware

Внутри функции middleware можно реализовать любую логику, необходимую для обработки запроса или ответа. Например, это может быть проверка аутентификации, логирование, обработка данных и многое другое.

##### Пример создания собственного middleware

```javascript
// Собственное middleware для логирования запросов
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Передаем управление следующему middleware
}

// Применяем middleware ко всем запросам
app.use(loggerMiddleware);
```

В этом примере `loggerMiddleware` - это собственное middleware для логирования запросов. Он выводит в консоль текущее время, метод запроса и URL. После этого вызывается функция `next()`, чтобы передать управление следующему middleware в цепочке.

Создание собственного middleware в Express дает гибкость и контроль над обработкой запросов и ответов в вашем приложении. Вы можете создавать middleware для различных задач и использовать их в разных маршрутах или для разных типов запросов.

## Пример приложения

Давайте разработаем пример приложения на Express, которое демонстрирует использование продвинутой маршрутизации, обработку параметров запроса и применение собственных middleware. Приложение будет простым API для управления списком книг, где можно добавлять новые книги, просматривать их, фильтровать обновлять статус задач.

### Настройка проекта

1. Инициализация проекта и установка зависимостей:

    ```bash
    npm init -y
    npm install express body-parser
    ```

2. Создание файла `app.js` и подключение необходимых модулей:

    ```javascript
    const express = require("express");
    const bodyParser = require("body-parser");

    const app = express();
    const port = 3101;

    // Middleware для парсинга JSON
    app.use(bodyParser.json());
    ```

### Реализация маршрутов

#### Добавление новой книги

-   **POST /books** - добавление новой книги в каталог.

    ```javascript
    let books = []; // Хранилище книг

    app.post("/books", (req, res) => {
        const { title, author, genre } = req.body;
        const newBook = { id: books.length + 1, title, author, genre };
        books.push(newBook);
        res.status(201).send(newBook);
    });
    ```

#### Получение списка книг

-   **GET /books** - получение списка всех книг.
    ```javascript
    app.get("/books", (req, res) => {
        res.status(200).json(books);
    });
    ```

#### Фильтрация книг по автору или жанру

-   **GET /books/search** - фильтрация книг по автору или жанру через query параметры.

    ```javascript
    app.get("/books/search", (req, res) => {
        const { author, genre } = req.query;
        let filteredBooks = books;

        if (author) {
            filteredBooks = filteredBooks.filter((book) =>
                book.author.toLowerCase().includes(author.toLowerCase()),
            );
        }

        if (genre) {
            filteredBooks = filteredBooks.filter(
                (book) => book.genre.toLowerCase() === genre.toLowerCase(),
            );
        }

        res.status(200).json(filteredBooks);
    });
    ```

#### Обновление информации о книге

-   **PUT /books/:id** - обновление информации о книге по идентификатору.

    ```javascript
    app.put("/books/:id", (req, res) => {
        const { id } = req.params;
        const { title, author, genre } = req.body;
        const bookIndex = books.findIndex((book) => book.id == id);

        if (bookIndex !== -1) {
            books[bookIndex] = { ...books[bookIndex], title, author, genre };
            res.status(200).json(books[bookIndex]);
        } else {
            res.status(404).send({ error: "Book not found" });
        }
    });
    ```

### Работа с middleware

#### Логирование действий

-   Использование middleware для логирования времени и деталей запросов.
    ```javascript
    app.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
    ```

#### Проверка наличия всех необходимых данных при добавлении книги

-   Middleware для проверки, что все необходимые данные предоставлены.
    ```javascript
    app.use("/books", (req, res, next) => {
        if (
            req.method === "POST" &&
            (!req.body.title || !req.body.author || !req.body.genre)
        ) {
            res.status(400).send({ error: "Missing book information" });
            return;
        }
        next();
    });
    ```
