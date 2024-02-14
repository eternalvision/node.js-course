# Управление сессиями и аутентификация

## Основы управления сессиями в Express

### Введение в сессии

#### Что такое сессия и как она используется для поддержания состояния между запросами.

Сессия в контексте веб-разработки — это механизм, позволяющий веб-серверам сохранять состояние между различными запросами пользователя. Каждая сессия уникальна для пользователя и обычно используется для хранения информации о состоянии взаимодействия пользователя с веб-сайтом, такой как данные аутентификации, выбранные товары в корзине покупок или настройки интерфейса.

Сессии работают путём назначения каждому пользователю уникального идентификатора сессии (session ID), который обменивается между клиентом и сервером. Этот идентификатор чаще всего передаётся через куки (cookies), хотя существуют и другие методы, например, через строки запроса URL или скрытые поля форм.

#### Как сессии поддерживают состояние между запросами?

Когда пользователь впервые посещает веб-сайт, сервер создаёт для него уникальный идентификатор сессии и отправляет его обратно в браузер пользователя в виде куки. При последующих запросах браузер автоматически отправляет этот идентификатор сессии обратно на сервер, позволяя серверу идентифицировать пользователя и восстановить его состояние сессии.

#### Различие между состоянием сессии и безсостоянием HTTP

Протокол HTTP является безсостоянием, что означает, что каждый запрос обрабатывается независимо, без знания о предыдущих запросах. Эта характеристика делает веб-разработку сложной, когда необходимо поддерживать информацию о состоянии пользователя между запросами.

Сессии представляют собой решение этой проблемы, позволяя сохранять данные между запросами. Таким образом, хотя HTTP и остаётся безсостоянием, использование сессий позволяет веб-приложениям функционировать как если бы они поддерживали состояние, облегчая создание интерактивных и персонализированных веб-сайтов.

Важно отметить, что сессии должны использоваться ответственно, с соблюдением лучших практик безопасности, таких как ограничение времени жизни сессии, использование HTTPS для передачи идентификаторов сессий и должное шифрование данных сессии, чтобы защитить конфиденциальную информацию пользователя.

### Настройка сессий в Express

Для работы с сессиями в Express используется пакет `express-session`, который позволяет легко интегрировать управление сессиями в ваше приложение. Давайте рассмотрим, как установить и настроить `express-session`, а затем продемонстрируем, как создать сессию и обращаться к ней.

#### Установка `express-session`

Первым шагом является установка пакета `express-session`. Это делается с помощью следующей команды в вашем терминале:

```bash
npm install express-session
```

#### Настройка сессий в приложении Express

После установки пакета его необходимо подключить и настроить в вашем приложении Express. Вот базовый пример того, как это можно сделать:

```javascript
const express = require("express");
const session = require("express-session");

const app = express();

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
```

В этом примере мы настраиваем `express-session` с несколькими параметрами:

-   `secret`: Секретный ключ, используемый для подписи идентификатора сессии, хранящегося в куки. Это должна быть длинная случайная строка.
-   `resave`: Принудительно сохраняет сессию в хранилище сессий, даже если она не изменялась в процессе запроса.
-   `saveUninitialized`: Сохраняет новые (и неинициализированные) сессии в хранилище.
-   `cookie`: Настройки куки, где `secure: false` означает, что куки можно передавать через незащищённое соединение (HTTP). Для продакшена рекомендуется установить `secure: true`, что требует HTTPS.

#### Демонстрация создания сессии и доступа к ней

Для демонстрации создания сессии и доступа к ней добавим маршрут, который устанавливает значение в сессию при первом запросе и затем извлекает его при последующих запросах:

```javascript
app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`<p>Количество просмотров: ${req.session.views}</p>`);
    } else {
        req.session.views = 1;
        res.send(
            "Добро пожаловать на главную страницу! Перезагрузите страницу.",
        );
    }
});
```

В этом примере мы используем `req.session`, объект сессии, для хранения и доступа к данным сессии. При первом посещении главной страницы пользователем, `req.session.views` инициализируется значением `1`. При каждом последующем обновлении страницы, значение `req.session.views` увеличивается на `1`, и пользователю показывается количество просмотров.

#### Более сложный пример использования сессий в Express, включая аутентификацию пользователя и сохранение определённой информации о нём в сессии.

##### Шаг 1: Установка необходимых пакетов

Для начала установим необходимые пакеты:

```bash
npm install express express-session bcrypt
```

##### Шаг 2: Настройка базового Express приложения

Создадим базовое приложение Express с поддержкой сессий:

```javascript
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.urlencoded({ extended: true })); // Для обработки тела POST-запросов

app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Для HTTPS установите в true
    }),
);

// Простая "база данных" пользователей
const users = {};

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
```

##### Шаг 3: Реализация регистрации и аутентификации

Добавим простые маршруты для регистрации и аутентификации пользователя:

```javascript
// Регистрация пользователя
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем пользователя в "базе данных"
    users[username] = hashedPassword;
    res.send("Регистрация успешна");
});

// Аутентификация пользователя
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];

    if (user && (await bcrypt.compare(password, user))) {
        req.session.userId = username; // Сохраняем имя пользователя в сессии
        res.send("Вы успешно вошли в систему");
    } else {
        res.send("Ошибка аутентификации");
    }
});

// Выход пользователя
app.get("/logout", (req, res) => {
    req.session.destroy(); // Уничтожаем сессию
    res.send("Вы вышли из системы");
});

// Защищённый маршрут
app.get("/profile", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Требуется аутентификация");
    }
    res.send(`Профиль пользователя: ${req.session.userId}`);
});
```

### Хранение сессий

В контексте веб-приложений, управление сессиями требует эффективного хранения данных сессии. Для этого существуют различные подходы, включая хранение в памяти, использование баз данных вроде Redis и MongoDB. Каждый метод имеет свои преимущества и недостатки.

#### Хранение в памяти

**Преимущества:**

-   **Быстродействие:** Данные сессии хранятся непосредственно в оперативной памяти сервера, что обеспечивает быстрый доступ.
-   **Простота реализации:** Во многих фреймворках, таких как Express, хранение сессий в памяти используется по умолчанию, что упрощает настройку.

**Недостатки:**

-   **Масштабируемость:** При масштабировании приложения на несколько серверов, сессии, хранящиеся в памяти одного сервера, не будут доступны на других серверах.
-   **Ограниченный объем хранилища:** Оперативная память ограничена, что может стать проблемой при большом количестве сессий.
-   **Ненадежность:** При перезапуске сервера или его сбое данные сессии, хранящиеся в памяти, теряются.

#### Redis

**Преимущества:**

-   **Высокая производительность:** Redis — это быстрое хранилище в памяти с возможностью сохранения на диск, что обеспечивает быстрый доступ к данным сессии.
-   **Масштабируемость:** Redis подходит для распределённых систем и может использоваться в приложениях с высокой нагрузкой.
-   **Устойчивость к сбоям:** Redis предлагает различные опции для репликации и сохранения данных, что повышает устойчивость к сбоям.

**Недостатки:**

-   **Сложность управления:** Требуется дополнительная настройка и управление инстансами Redis.
-   **Стоимость:** В отличие от хранения в памяти сервера, использование Redis может влечь за собой дополнительные расходы на хостинг и управление.

#### MongoDB

**Преимущества:**

-   **Гибкость:** MongoDB, будучи документо-ориентированной базой данных, позволяет легко хранить сложные структуры данных сессии.
-   **Масштабируемость:** MongoDB хорошо масштабируется и подходит для больших объемов данных.
-   **Надежность:** Данные могут быть реплицированы на несколько серверов, обеспечивая высокую доступность и устойчивость к сбоям.

**Недостатки:**

-   **Производительность:** Доступ к данным может быть медленнее по сравнению с хранилищами, полностью работающими в оперативной памяти, такими как Redis.
-   **Сложность:** Может потребоваться дополнительная настройка и оптимизация для эффективной работы с большими объемами данных сессии.

#### Пример реализации хранения сессий в MongoDB с использованием `express`, `express-session` и `mongoose`, выполните следующие шаги.

##### Шаг 1: Установка необходимых пакетов

Установите необходимые пакеты, если вы этого еще не сделали:

```bash
npm install express express-session mongoose connect-mongo
```

`connect-mongo` используется в качестве адаптера между `express-session` и MongoDB, позволяя легко сохранять сессии в базе данных.

##### Шаг 2: Настройка Express и подключение к MongoDB

Создайте базовую настройку Express и подключитесь к MongoDB с использованием `mongoose`. Пример настройки приложения:

```javascript
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const app = express();

// Замените 'your_database_url' на URL вашей базы данных MongoDB
const dbString = "your_database_url";
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(dbString, dbOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

##### Шаг 3: Настройка хранения сессий в MongoDB

Интегрируйте `express-session` с MongoDB, используя `MongoStore` как место хранения сессий:

```javascript
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: dbString,
            collectionName: "sessions",
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Пример: куки действительны 1 день
    }),
);
```

##### Шаг 4: Создание маршрутов для демонстрации работы с сессиями

Добавьте маршруты для демонстрации создания и использования сессий:

```javascript
// Простой маршрут для демонстрации сессии
app.get("/", (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`Количество просмотров: ${req.session.views}`);
    } else {
        req.session.views = 1;
        res.send("Добро пожаловать на главную страницу. Обновите страницу.");
    }
});

// Маршрут для выхода и очистки сессии
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Ошибка при выходе");
        }
        res.send("Вы успешно вышли из системы");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Безопасность сессий

Безопасность сессий — критически важный аспект любого веб-приложения. Вот несколько ключевых мер, которые можно применить для повышения безопасности сессий:

#### Использование HTTPS

-   **Зачем:** HTTPS шифрует трафик между клиентом и сервером, предотвращая перехват и чтение данных сессии злоумышленниками.
-   **Как реализовать:** Убедитесь, что ваш веб-сайт использует SSL/TLS сертификат и все запросы перенаправляются на HTTPS. Для локальной разработки можно использовать инструменты вроде Let's Encrypt для получения бесплатных сертификатов или mkcert для создания локальных сертификатов.

#### Настройка cookie

-   **HttpOnly:** Установка флага `httpOnly` для куки сессии делает её недоступной для JavaScript на клиенте, что защищает от XSS-атак.
-   **Secure:** Флаг `secure` гарантирует, что куки отправляются только по защищённым соединениям (HTTPS).
-   **SameSite:** Настройка атрибута `SameSite` помогает защитить от CSRF-атак. `SameSite=Strict` предотвращает отправку куки с запросами, исходящими с других сайтов.

Пример настройки этих атрибутов в Express с использованием `express-session`:

```javascript
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true, // убедитесь, что используете HTTPS
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // Пример: куки действительны 1 день
        },
    }),
);
```

#### Реализация ограничений на стороне клиента и сервера

-   **Ограничения на стороне сервера:** Убедитесь, что сессии имеют ограниченный срок жизни и автоматически уничтожаются после определённого периода неактивности. Это можно настроить через параметры `cookie.maxAge` и `session.cookie.expires` в `express-session`.
-   **Проверка подлинности запросов:** Используйте CSRF-токены для защиты от межсайтовой подделки запросов. Фреймворки вроде Express могут использовать пакет `csurf` для добавления CSRF-защиты.
-   **Ограничения на стороне клиента:** Информируйте пользователей о необходимости не сохранять пароли в браузере и регулярно выходить из аккаунтов на общедоступных или чужих устройствах.

#### Регулярное обновление и патчинг

-   Регулярно обновляйте все зависимости вашего приложения, включая `express-session`, `mongoose`, и другие пакеты, чтобы защититься от известных уязвимостей.

#### Реальный пример веб-приложения на Express, которое реализует безопасность сессий с использованием HTTPS, настройки безопасных кук, а также CSRF-защиты. Этот пример включает в себя:

-   Принудительное использование HTTPS для всех соединений.
-   Настройку атрибутов cookie для повышения безопасности.
-   Добавление CSRF-защиты.

##### Шаг 1: Принудительное использование HTTPS

Для локальной разработки можно использовать самоподписанные сертификаты, но для продакшена рекомендуется получить сертификат от надежного центра сертификации (CA), например, Let's Encrypt.

```javascript
const express = require("express");
const session = require("express-session");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const csrf = require("csurf");
const bodyParser = require("body-parser");

const app = express();

// Настройка HTTPS
const httpsOptions = {
    key: fs.readFileSync("./path/to/your/private.key"),
    cert: fs.readFileSync("./path/to/your/certificate.crt"),
};

app.use(helmet()); // Настройка заголовков для безопасности

// Настройка сессии с безопасными куками
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true, // Только через HTTPS
            httpOnly: true, // Защита от доступа через JavaScript
            sameSite: "strict", // Защита от CSRF-атак
            maxAge: 1000 * 60 * 60 * 24, // Срок действия куки - 1 день
        },
    }),
);

// Настройка CSRF-защиты
const csrfProtection = csrf({ cookie: true });
app.use(bodyParser.urlencoded({ extended: false }));

// Роуты
app.get("/", csrfProtection, (req, res) => {
    // Отправляем форму с токеном CSRF
    res.send(`<form action="/submit" method="POST">
              <input type="hidden" name="_csrf" value="${req.csrfToken()}">
              <button type="submit">Отправить</button>
            </form>`);
});

app.post("/submit", csrfProtection, (req, res) => {
    res.send("Данные получены");
});

// Запуск HTTPS-сервера
https.createServer(httpsOptions, app).listen(3000, () => {
    console.log("HTTPS server running on https://localhost:3000");
});
```

##### Обратите внимание:

-   **HTTPS:** В примере используется модуль `https` для создания HTTPS-сервера. Замените пути к файлам ключа и сертификата на свои.
-   **Helmet:** Этот модуль помогает защитить приложение от некоторых широко известных уязвимостей веб-приложений, устанавливая HTTP-заголовки.
-   **CSRF-защита:** В примере используется пакет `csurf` для добавления CSRF-защиты. Токен CSRF добавляется в формы и проверяется при их отправке.

## Реализация аутентификации с использованием JSON Web Token (JWT), сессий и cookies

### Введение в JWT

Теперь мы рассмотрим аутентификацию с помощью JWT, которая в основном используется при разработке API, которая в свою очередь будет использоваться веб-приложением на каком-то современном фреймворке типа React, Angular, Vue.js или аналогичным фронтенд фреймворком. Веб приложение будет посылать jwt-токен с каждым запросом, а значит мы не используем сессию как в предыдущей локальной стратегии, а просто помещаем токен в каждый запрос, который мы делаем к API.

Мы рассмотрим для нашего API три роута:

-   `/registration` — Регистрация нового пользователя
-   `/login` - для получения jwt-токена
-   `/list`, — который будет доступен только для пользователей, входящих в систему с помощью jwt-токена.

#### Что такое JWT и как он работает.

**JSON Web Token (JWT)** в своей простейшей форме представляет безопасную URL-строку, содержащую закодированный объект JSON. JWT – это открытый промышленный стандарт, полностью описанный RFC 7519, содержащий большое количество деталей, в частности о том, как JWT требует функцию для обеспечения безопасности созданного маркера. Давайте посмотрим на пример токена с сайта  [https://jwt.io/](https://jwt.io/)

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk 6yJV_adQssw5c`

Обратите внимание, что токен содержит три части, разделенные точкой "." Эти три части являются следующими:

**header**  Header содержит информацию, определяющую алгоритм хеширования, чтобы его можно было использовать для правильной расшифровки и проверки подлинности.

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

**payload**  Эта часть содержит информацию, которую вы хотите отправить с помощью JWT. Обратите внимание, что payload не защищен и может быть расшифрован без секретного ключа, это обычная кодировка Base64. JWT не предназначен для передачи конфиденциальной информации, такой как пароли или другой личной информации.

```json
{
    "sub": "1234567890",
    "name": "Джон Доу",
    "iat": 1516239022
}
```

**signature**  Signature объединяет закодированный header и payload с секретным ключом и надежно кодирует это с использованием алгоритма хеширования, определенного в header.

Таким образом каждый раз, когда создается токен: header останется постоянным (если вы не измените алгоритм хеширования); payload останется постоянным, если опять же мы не изменим его содержание, а мы будем изменять его, указывая продолжительность жизни токена; signature будет шифровать эти две части информации на основе алгоритма хеширования с помощью секретного ключа. Это означает, что если вы не создадите уникальный секретный ключ или не измените payload, то signature также останется предварительным.

##### Кодирование и декодирование JWT

Для создания jwt-токенов мы будем использовать пакет npm с именем [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) , который позволит шифровать и расшифровывать jwt-токены. Например, рассмотрим следующий код:

```javascript
const jwt = require("jsonwebtoken");
const payload = { id: 123456, username: "Larson" };
const secret = "secret word";
const token = jwt.sign(payload, secret);
console.log(token);
```

Давайте посмотрим, что происходит. Приложение начинается с включения модуля `jsonwebtoken`

```javascript
const jwt = require("jsonwebtoken");
```

Затем мы создаем `payload` объект.

```javascript
const payload = { id: 123456, username: "Larson" };
```

Этот объект – это то, что мы будем кодировать внутри токена. Мы создали объект, содержащий свойство id со значением 123456 и свойство username: `'Larson'`. Токен должен быть зашифрован (и расшифрован) секретным ключом. Мы создаем строку, которая будет использоваться для подписи токена, чтобы ее нельзя было подделать. Только сервер знает секретное слово.

```javascript
const secret = "secret word";
```

С набором предварительных условий мы наконец-то можем создать наш токен. Это делается путем вызова функции кодирования из модуля `jsonwebtoken.`

```javascript
const token = jwt.sign(payload, secret);
```

Эта функция принимает  `payload` секретный ключ. Результатом этой функции является токен, содержащий наш закодированный header, payload и signature. Последняя строчка выводит наш маркер в консоль. Запустив нашу программу, мы получим следующее:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJ1c2VybmFtZSI6IkxhcnNvbiIsImlhdCI6MTYwMjQ2NDkxNX0.73IZBwNckdPPr0j813BBfFMU0ooitR5UrmaQwLaK6AI`

Это такой же токен, который мы взяли с сайта  [https://jwt.io/](https://jwt.io/) . Он содержит те же три части (header, payload и signature). Если вставить наш токен в песочницу, то он декодируется

![1707917802555.png](https://file+.vscode-resource.vscode-cdn.net/d%3A/WEB/Step/Materials/Node.js/6.%20Express%20Framework/6.4%20%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%B5%D1%81%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%20%D0%B8%20%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F/md/image/6.4%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%D1%81%D0%B5%D1%81%D1%81%D0%B8%D1%8F%D0%BC%D0%B8%D0%B8%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F/1707917802555.png?nonce%3D1707921824043)

Давайте добавим в файл  `app.js` декодирования токена и тоже выведем его в консоль:

```javascript
const decode = jwt.decode(token);
console.log(decode);
```

Теперь, когда мы запускаем приложение, мы получаем следующий результат:

```powershell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJ1c2VybmFtZSI6IkxhcnNvbiIsImlhdCI6MTYwMjQ2NTQ5NH0.UOZww-C3SSZJz_I4o0vZNAAkTwFQFPM8cn1HQ wnxRU4
{ id: 123456, имя пользователя: 'Ларсон', iat: 1602465494 }
```

Видно, что токен успешно декодирован и содержит те же свойства, что и кодировались.

Для проверки подлинности токена необходимо использовать функцию верификации.

```javascript
const verify = jwt.verify(token, secret);
console.log(verify);
```

Значение переменной ` verify` такое же, что и у `decode`, но если токен будет подделан, то будет сгенерировано исключение `'JsonWebTokenError: invalid signature'.`

##### Преимущества использования JWT для аутентификации.

Использование JSON Web Token (JWT) для аутентификации предлагает несколько значительных преимуществ, делая его популярным выбором для современных веб-приложений, особенно в контексте Single Page Applications (SPA) и микросервисных архитектур:

1. **Безсостоянийность и масштабируемость:** JWT позволяет реализовать безсостоянийную аутентификацию, что означает, что сервер не нуждается в хранении сессии пользователя. Это упрощает масштабирование приложений, поскольку информация о состоянии пользователя полностью содержится в самом токене, который передается с каждым запросом.
2. **Поддержка кросс-доменных запросов:** JWT идеально подходит для сценариев, где необходимо обеспечить аутентификацию между различными доменами или сервисами. Токен можно легко передать через разные домены без необходимости в специальной инфраструктуре для поддержки кросс-доменных сессий.
3. **Легкость интеграции с фронтенд-фреймворками:** JWT легко интегрируется с любыми современными фронтенд-фреймворками, такими как React, Angular или Vue.js. Это делает JWT особенно привлекательным для разработки SPA, где для аутентификации и авторизации можно использовать только токены, хранящиеся на стороне клиента.
4. **Самодостаточность:** Токен содержит всю необходимую информацию о пользователе, что устраняет необходимость обращаться к базе данных или внешней системе управления идентификацией для проверки каждого запроса. Это сокращает количество запросов к серверу и улучшает производительность приложения.
5. **Безопасность:** JWT поддерживает шифрование, что обеспечивает безопасную передачу данных между сторонами. Кроме того, подпись токена гарантирует, что данные не были изменены после их создания.
6. **Гибкость:** JWT поддерживает несколько алгоритмов шифрования, предоставляя разработчикам гибкость в выборе уровня безопасности в зависимости от требований приложения.
7. **Время жизни токена:** Время действия JWT можно строго контролировать, что помогает предотвращать злоупотребления в случае утечки токена. После истечения срока действия токена пользователю необходимо будет повторно аутентифицироваться, чтобы получить новый токен.

Несмотря на перечисленные преимущества, важно также учитывать потенциальные риски безопасности, связанные с использованием JWT, и принимать соответствующие меры предосторожности, такие как использование HTTPS для передачи токенов, ограничение срока действия токенов и безопасное хранение секретных ключей.

### Создание и верификация JWT

Давайте вернемся к нашему приложению, после того как мы разобрались, что такое сам JWT.

#### Реализация генерации JWT при успешной аутентификации пользователя.

##### Стратегия JWT

Начнем с конфигурации JWT стратегии, за нее отвечает модуль  [passport-jwt](https://www.npmjs.com/package/passport-jwt)

```javascript
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../schemas/user");
require("dotenv").config();
const secret = process.env.SECRET;
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}; // JWT Strategy
passport.use(
    new Strategy(params, function (payload, done) {
        User.find({ _id: payload.id })
            .then(([user]) => {
                if (!user) {
                    return done(new Error("User not found"));
                }
                return done(null, user);
            })
            .catch((err) => done(err));
    }),
);
```

Давайте вкратце повторим, что представляет собой стратегия. Это функция промежуточного программного обеспечения, по которой проходят запросы, прежде чем они попадут к обработчику маршрута. Если стратегия проверки подлинности не срабатывает, это означает, что обработчик маршрута не будет вызван, а отправится ответ `401 Unauthorized` (Неавторизованный).

Стратегия JWT сконфигурирована так, чтобы читать JWT-токен из заголовка HTTP `Authorization` (авторизации) для каждого входящего запроса. Вместо этого `ExtractJWT.fromAuthHeaderAsBearerToken` можно определить другие методы изъятия или даже написать свой собственный. Полный список можно найти в хранилище passport-jwt. Наш текущий способ предполагает, что будем передавать заголовок в таком виде

```javascript
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWYxODhiYzdmMGRiMmJjNDVhZTdkNiIsImlhdCI6MTU5NTg3NDA5MiwiZXhwIjoxNTk1ODc3NjkyfQ.SJuXhjiNrhsZ-9Ikdw7wdkttn-KcLTztd_Rk3kf4elAbea
```

После ключевого слова `Bearer` стоит пробел, а затем располагается наш JWT-токен

Свойство `secretOrKey` – это секрет, которым будут подписаны наши токены. В целях безопасности мы храним секретный ключ только в переменных окружающих, чтобы никто их не видел в коде.

В нашей стратегии мы получаем полезную нагрузку ` payload`, в которой находится `id`пользователя. Затем обращаемся к базе данных и пытаемся найти пользователя с таким ` id`и, либо мы возвращаем объект пользователя, либо ошибку, если пользователь не был найден. Эту конфигурацию подставляем в основной файл приложения

```javascript
...
require('./config/config-passport')
app.use('/api', routerApi)
...
```

##### Роут регистрации

Создаем пользователя с уникальным `email`, если пользователь с таковым `email `существует, возвращаем статус `409 Conflict`. Если же нет, успешно его создаем и храним в базе данных

```javascript
router.post("/registration", async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            status: "error",
            code: 409,
            message: "Email is already in use",
            data: "Conflict",
        });
    }
    try {
        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                message: "Registration successful",
            },
        });
    } catch (error) {
        next(error);
    }
});
```

##### Получение токена для авторизации

Если пользователь совпал `email` и пароль, мы генерируем для него JWT-токен. Создаем полезную нагрузку `payload`, в которую помещаем `id` пользователя и его `username`. После этого мы создаем токен с помощью метода `jwt.sign`. Первый параметр – наша полезная нагрузка, второй – секретное слово, которое мы использовали в стратегии авторизации `passport-jwt`, а вот третий параметр – это продолжительность жизни нашего JWT-токена, когда он протухнет (Вы часто можете услышать, что токен протух (это означает, что время жизни его прошло). Мы выбрали время жизни 1 час, можно было выбрать 1 день – `1d` , одну неделю – `1w` и так далее, главное, чтобы токен не был вечным

```javascript
router.post('/login', async (req, res, next) => {
  const { электронная почта, пароль } = req.body;
  const user = await User.findOne({ email });  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'ошибка',
      код: 400,
      сообщение: 'Неправильный логин или пароль',
      данные: 'Неверный запрос',
    });
  }  const payload = {
    id: user.id,
    username: user.username,
  };  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  res.json({
    status: 'success',
    code : 200,
    данные: {
      токен,
    },
  });
});
```

##### Закрытый маршрут

Здесь все просто – обработчик маршрута сработает только если токен будет валидным и за проверку валидности отвечает промежуточное ПО `auth`

```javascript
router.get('/list', auth, (req, res, next) => {
  const { имя пользователя } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      message: Авторизация прошла успешно: ${username},
    },
  });
});
```

В функции `auth `с помощью `passport.authenticate`мы запускаем стратегию `jwt `и проверяем полученный JWT-токен. Если пользователь не найден или произошла ошибка, мы возвращаем `401 'Unauthorized'.`В случае успешного результата мы помещаем текущего пользователя `req.user`и передаем управление следующему промежуточному ПО или обработчику с помощью вызова `next()`

```javascript
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401) ).json({
        status: 'error',
        код: 401,
        сообщение: 'Несанкционировано',
        данные: 'Несанкционировано',
      });
    }
    req.user = user;
    next();
  })(req, res, next) ;
};
```

С помощью этого промежуточного ПО `auth` мы можем закрывать доступ к любому нашему маршруту. Все это и есть jwt авторизация.

##### Давайте структурируем приложение

Для создания полноценного веб-приложения с JWT аутентификацией на Express, вам потребуется разделить ваш код на несколько модулей и файлов для обеспечения чистоты кода и его масштабируемости. Давайте структурируем приложение следующим образом:

###### Структура проекта

-   `index.js` - Основной файл, запускающий сервер.
-   `config/` - Директория для конфигурационных файлов.
    -   `passport.js` - Настройка стратегии Passport JWT.
-   `routes/` - Директория для маршрутов.
    -   `users.js` - Маршруты для регистрации, входа и получения списка пользователей.
-   `models/` - Директория для моделей Mongoose.
    -   `user.js` - Модель пользователя.
-   `middlewares/` - Директория для промежуточного ПО.
    -   `auth.js` - Промежуточное ПО для аутентификации.

###### index.js

```javascript
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
require("dotenv").config();
const usersRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose
    .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

###### config/passport.js

```javascript
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((error) => done(error, false));
        }),
    );
};
```

###### models/user.js

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
```

###### routes/users.js

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/registration", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email уже используется" });
        }
        user = new User({ username, email });
        user.setPassword(password);
        await user.save();
        res.status(201).json({ message: "Пользователь создан" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.validPassword(password)) {
            return res
                .status(400)
                .json({ message: "Неверный email или пароль" });
        }
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,

            { expiresIn: "1h" },
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/list", auth, (req, res) => {
    res.json({ message: `Доступ разрешен для ${req.user.username}` });
});

module.exports = router;
```

###### middlewares/auth.js

```javascript
const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: "Неавторизованный доступ" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
```

В этом примере вы видите полный код для создания веб-приложения с аутентификацией на основе JWT. Не забудьте добавить файл `.env` в корень проекта с вашими переменными окружения, такими как `PORT`, `MONGO_DB_URI`, и `JWT_SECRET`.

Для создания файла `.env` в корне вашего проекта, добавьте следующие строки. Этот файл будет содержать конфигурации и секреты, необходимые для работы вашего приложения. Важно не включать этот файл в репозиторий, добавив его в `.gitignore`, чтобы избежать утечки конфиденциальной информации.

```plaintext
# Настройки порта
PORT=3000

# URI подключения к MongoDB
MONGO_DB_URI=mongodb://localhost:27017/yourDatabaseName

# Секретный ключ для подписи JWT
JWT_SECRET=yourVerySecretKey
```

-   `PORT` - порт, на котором будет запущен ваш сервер. Вы можете изменить его на любой другой порт, который предпочитаете.
-   `MONGO_DB_URI` - строка подключения к вашей базе данных MongoDB. Замените `yourDatabaseName` на имя вашей базы данных. Если вы используете MongoDB Atlas или другой облачный сервис, укажите здесь соответствующий URI.
-   `JWT_SECRET` - секретный ключ, который будет использоваться для подписи и верификации JWT. Убедитесь, что это сложная и уникальная строка, чтобы обеспечить безопасность токенов.

После создания файла `.env`, убедитесь, что ваше приложение корректно его читает, используя библиотеку `dotenv` с самого начала вашего основного файла приложения (например, `index.js`):

```javascript
require("dotenv").config();
```

Эта строчка кода гарантирует, что все переменные окружения из файла `.env` будут доступны через `process.env` в вашем приложении Node.js.

Протестируйте ваше приложение, используя Postman или любой другой инструмент для тестирования API, чтобы убедиться, что аутентификация работает корректно.

### Использование сессий и cookies для аутентификации

Использование JWT в сочетании с куки может предоставить удобный и безопасный способ управления сессиями пользователей в веб-приложении. В отличие от традиционного подхода с сессиями, где идентификатор сессии хранится на сервере, JWT содержит всю необходимую информацию и может быть верифицирован самостоятельно сервером. Вот как вы можете реализовать это в вашем Express-приложении.

#### Сохранение JWT в куки

После успешной аутентификации пользователя и генерации JWT, вы можете сохранить этот токен в куки, отправив его обратно клиенту. Вот пример того, как это можно сделать на Express:

```javascript
app.post("/login", (req, res) => {
    // Предположим, что пользователь успешно аутентифицирован и jwtToken сгенерирован
    const jwtToken = generateJwtToken(userDetails);

    // Сохранение JWT в куки
    res.cookie("token", jwtToken, {
        httpOnly: true, // куки недоступны через JavaScript
        secure: true, // куки отправляются только по HTTPS
        sameSite: "Strict", // предотвращение CSRF-атак
        maxAge: 3600000, // время жизни куки, например, 1 час
    });

    res.send("Аутентификация прошла успешно и токен сохранен в куки");
});
```

#### Настройка безопасности куки

В примере выше мы использовали несколько опций для увеличения безопасности куки:

-   `httpOnly: true` делает куки недоступными для доступа или изменения через клиентские скрипты, что помогает предотвратить атаки через XSS.
-   `secure: true` указывает, что куки должны быть отправлены только по защищенным соединениям (HTTPS), что защищает их от перехвата при передаче по сети.
-   `sameSite: 'Strict'` предотвращает отправку куки с запросами, исходящими с других сайтов, что является эффективной мерой против CSRF-атак.
-   `maxAge` определяет время жизни куки в миллисекундах. После истечения этого времени куки становится недействительной.

#### Использование куки для аутентификации в последующих запросах

Для использования куки с JWT для аутентификации в последующих запросах, вам нужно будет настроить ваш сервер так, чтобы он извлекал JWT из куки и верифицировал его при обработке каждого защищенного запроса. Пример миддлвара для этой цели:

```javascript
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401); // Если токен не предоставлен

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Если токен невалидный или просрочен
        req.user = user;
        next();
    });
};

app.get("/protected", authenticateToken, (req, res) => {
    res.send("Доступ к защищенному ресурсу разрешен");
});
```

Этот подход сочетает в себе удобство управления сессиями через куки с безопасностью и самодостаточностью JWT, обеспечивая эффективное решение для аутентификации и управления состоянием сессий в современных веб-приложениях.

#### Небольшое Express-приложение, которое демонстрирует аутентификацию с использованием JWT и сохранение токена в куки.

##### Шаг 1: Установка зависимостей

Для начала установим необходимые пакеты:

```bash
npm install express jsonwebtoken cookie-parser dotenv bcryptjs
```

-   `express` для создания сервера,
-   `jsonwebtoken` для работы с JWT,
-   `cookie-parser` для удобной работы с куки,
-   `dotenv` для работы с переменными окружения,
-   `bcryptjs` для хеширования паролей.

##### Шаг 2: Создание файла .env

Создайте файл `.env` в корне проекта для хранения секретного ключа JWT:

```plaintext
JWT_SECRET=your_jwt_secret_key
```

##### Шаг 3: Создание базового сервера

В корне проекта создайте файл `index.js`:

```javascript
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// Простая "база данных" для демонстрации
const users = [];

// Регистрация пользователя
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, password: hashedPassword };
        users.push(user);
        res.status(201).send("Пользователь зарегистрирован");
    } catch {
        res.status(500).send();
    }
});

// Вход пользователя и создание JWT
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    if (user == null) {
        return res.status(400).send("Не удалось найти пользователя");
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" },
            );
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
            });
            res.send("Успешный вход");
        } else {
            res.send("Не удалось аутентифицироваться");
        }
    } catch {
        res.status(500).send();
    }
});

// Защищенный маршрут
app.get("/protected", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        res.send(`Добро пожаловать ${user.username}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

Объяснение кода:

-   При регистрации пользователя его пароль хешируется и пользователь сохраняется в простой массив `users`.
-   При входе проверяется соответствие пароля и, в случае успеха, генерируется JWT, который сохраняется в куки. Обратите внимание, что для безопасности куки настроены как `httpOnly`, `secure`, и `sameSite`.
-   Для доступа к защищенному маршруту требуется наличие действительного JWT в куки, который проверяется перед предоставлением доступа.

### Обновление и отзыв JWT

#### Механизмы обновления токенов доступа через refresh токены.

Механизмы обновления и отзыва JWT являются важными аспектами управления токенами в современных приложениях для обеспечения безопасности и контроля доступа. Введение refresh токенов позволяет обновлять access токены без повторного ввода учетных данных пользователем, а также обеспечивает возможность отзыва токенов при необходимости. Давайте разберемся, как это можно реализовать на практике.

##### Шаг 1: Генерация Access и Refresh Токенов

При успешном входе в систему выдаем пользователю не только access токен, но и refresh токен. Access токен имеет короткий срок жизни и используется для аутентификации запросов, в то время как refresh токен имеет более долгий срок жизни и используется только для получения нового access токена.

```javascript
app.post("/login", async (req, res) => {
    // Аутентификация пользователя...
    const accessToken = generateAccessToken(userDetails);
    const refreshToken = jwt.sign(
        userDetails,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" },
    );
    // Сохранение refreshToken в базе данных или кеше...
    res.json({ accessToken, refreshToken });
});
```

##### Шаг 2: Создание Эндпоинта для Обновления Токена

Создайте эндпоинт, который принимает refresh токен и возвращает новый access токен. При этом необходимо проверить refresh токен на валидность и убедиться, что он не был отозван.

```javascript
app.post("/token", (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken == null) return res.sendStatus(401);
    // Проверка наличия refreshToken в базе данных...
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Невалидный refresh токен
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken });
    });
});
```

##### Шаг 3: Отзыв Refresh Токенов

Для повышения безопасности системы нужно предусмотреть возможность отзыва refresh токенов. Это может быть необходимо, например, при выходе пользователя из системы или если токен был скомпрометирован.

```javascript
app.delete("/logout", (req, res) => {
    // Удаление refreshToken из базы данных...
    res.sendStatus(204);
});
```

#### Хранение Refresh Токенов

Для хранения refresh токенов и проверки их валидности можно использовать базу данных или специализированные решения для кеширования, такие как Redis. Важно обеспечить возможность быстрого поиска токена для проверки его валидности и отзыва.

##### Реализация Секретных Ключей

Не забудьте использовать безопасные секретные ключи для подписи JWT и хранить их в безопасном месте, например, в переменных окружения:

```plaintext
JWT_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

#### Механизмы обновления и отзыва JWT, используя Node.js и Express. Простуая система аутентификации с двумя основными маршрутами: один для входа (генерация access и refresh токенов) и один для обновления access токена, используя refresh токен.

##### Шаг 1: Подготовка и начальная настройка

Для начала создайте новый проект и установите необходимые зависимости:

```bash
npm init -y
npm install express jsonwebtoken dotenv body-parser
```

Создайте файл `.env` в корне проекта для хранения секретных ключей:

```plaintext
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Не забудьте использовать `require('dotenv').config()` в вашем основном файле приложения для загрузки переменных среды.

##### Шаг 2: Создание сервера Express

В файле `index.js`:

```javascript
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let refreshTokens = []; // В реальном приложении это должно быть хранилищем

app.post("/login", (req, res) => {
    // Эмуляция проверки пользователя
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

app.delete("/logout", (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.sendStatus(204);
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

##### Объяснение:

-   Мы создали маршрут `/login` для аутентификации пользователя и генерации пары access и refresh токенов.
-   Маршрут `/token` предназначен для обновления access токена с использованием refresh токена.
-   Маршрут `/logout` позволяет отозвать refresh токен, удаляя его из списка допустимых.
-   Функция `generateAccessToken` создает access токен с коротким временем жизни.

##### Шаг 3: Тестирование

Для тестирования вашего API вы можете использовать Postman или любой другой инструмент для отправки HTTP-запросов:

1. Отправьте POST-запрос на `/login` с JSON телом, содержащим `username`. В ответ вы получите пару токенов.
2. Попробуйте обновить access токен, отправив POST-запрос на `/token` с refresh токеном в теле запроса.
3. Чтобы "выйти" и отозвать refresh токен, отправьте DELETE-запрос на `/logout` с refresh токеном в теле запроса.

## Практические примеры аутентификации без использования сторонних сервисов

### Аутентификация с использованием Passport.js

#### Реализация локальной стратегии аутентификации с использованием `passport-local`.

##### Шаг 1: Установка зависимостей

Первым делом установите необходимые зависимости:

```bash
npm install express passport passport-local bcryptjs express-session dotenv
```

##### Шаг 2: Настройка Express и Passport

Создайте файл `app.js` и добавьте базовую настройку Express и Passport:

```javascript
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();

// Простая "база данных" для пользователей
const users = [];

// Настройка сессии
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

// Настройка стратегии Passport
passport.use(
    new LocalStrategy((username, password, done) => {
        const user = users.find((user) => user.username === username);
        if (!user) {
            return done(null, false, {
                message: "Некорректное имя пользователя",
            });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Некорректный пароль" });
            }
        });
    }),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id === id);
    done(null, user);
});

// Регистрация пользователя
app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword,
        };
        users.push(user);
        res.redirect("/login");
    } catch {
        res.redirect("/register");
    }
});

// Маршруты
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    }),
);

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("Добро пожаловать на главную страницу!");
    } else {
        res.send("Пожалуйста, войдите в систему.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

##### Шаг 3: Тестирование функциональности

-   **Регистрация нового пользователя:** Отправьте POST-запрос на `/register` с данными пользователя (`username` и `password`). Пароль будет зашифрован с использованием `bcrypt` и сохранен вместе с именем пользователя.
-   **Вход пользователя:** Отправьте POST-запрос на `/login` с теми же данными пользователя. Если данные верны, вы будете перенаправлены на главную страницу, где получите приветственное сообщение.
-   **Проверка аутентификации:** Перейдите на главную страницу (`/`). Если вы аутентифицированы, вы увидите приветственное сообщение, в противном случае вас попросят войти в систему.

#### Хеширование и проверка паролей с использованием `bcrypt`.

Хеширование паролей с использованием `bcrypt` является одним из наиболее надежных способов защиты пользовательских данных при сохранении паролей в базе данных. Вот как можно реализовать хеширование и проверку паролей на Node.js с использованием `bcryptjs`, библиотеки, которая позволяет легко внедрить хеширование паролей без необходимости управления сложными криптографическими алгоритмами.

##### Шаг 1: Установка `bcryptjs`

Если вы еще не установили `bcryptjs`, сделайте это, выполнив следующую команду в терминале вашего проекта:

```bash
npm install bcryptjs
```

##### Шаг 2: Хеширование пароля

Для хеширования пароля перед его сохранением в базу данных используйте функцию `bcrypt.hash` или `bcrypt.hashSync`. Пример с асинхронной функцией `hash`:

```javascript
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    try {
        // Генерация "соли", которая добавит уникальность к вашим хешам
        const salt = await bcrypt.genSalt(10);
        // Создание хеша пароля с использованием соли
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Ошибка при хешировании пароля:", error);
    }
    return null;
}
```

##### Шаг 3: Проверка пароля

Для проверки введенного пользователем пароля при входе в систему используйте функцию `bcrypt.compare` или `bcrypt.compareSync`. Эта функция сравнивает предоставленный пароль с хешированным паролем, хранящимся в базе данных, и возвращает `true`, если они совпадают.

```javascript
async function checkPassword(password, hashedPassword) {
    try {
        // Сравнение предоставленного пароля с хешированным паролем
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Ошибка при проверке пароля:", error);
    }
    return false;
}
```

##### Пример использования

```javascript
async function registerUser(username, password) {
    const hashedPassword = await hashPassword(password);
    // Здесь должен быть код для сохранения username и hashedPassword в базе данных
    console.log("Пользователь зарегистрирован:", username, hashedPassword);
}

async function loginUser(username, password) {
    // Здесь должен быть код для поиска пользователя в базе данных по username
    const hashedPasswordFromDb =
        "здесь_должен_быть_хешированный_пароль_из_базы"; // Пример
    const isMatch = await checkPassword(password, hashedPasswordFromDb);
    if (isMatch) {
        console.log("Успешный вход для:", username);
    } else {
        console.log("Неверный пароль для:", username);
    }
}

// Пример использования
async function run() {
    const username = "user123";
    const password = "password123";
    await registerUser(username, password);
    await loginUser(username, password);
}

run();
```

### Реализация аутентификации с Handlebars на основе сессий

Для реализации аутентификации с использованием сессий и отображения форм входа и регистрации через Handlebars в Express-приложении, выполните следующие шаги.

#### Шаг 1: Настройка проекта

Установите необходимые пакеты, включая Express, express-session, bcrypt для хеширования паролей, express-handlebars для шаблонизатора, и body-parser для обработки тела POST-запросов.

```bash
npm install express express-session bcryptjs express-handlebars body-parser
```

#### Шаг 2: Настройка Express и Handlebars

Создайте файл `app.js` и настройте Express и Handlebars:

```javascript
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

// Настройка Handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Настройка body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Настройка сессий
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    }),
);

// Простая "база данных" пользователей для демонстрации
const users = [];

app.get("/", (req, res) => {
    res.render("home", { user: req.session.user });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// Обработчики регистрации и входа...
```

#### Шаг 3: Создание форм входа и регистрации

Создайте в каталоге `views` файлы `login.handlebars` и `register.handlebars` для форм входа и регистрации соответственно.

`login.handlebars`:

```handlebars
<form action="/login" method="POST">
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
</form>
```

`register.handlebars`:

```handlebars
<form action="/register" method="POST">
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Register</button>
</form>
```

#### Шаг 4: Реализация регистрации и входа

Добавьте в `app.js` обработчики для регистрации и входа пользователей:

```javascript
app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword,
        });
        res.redirect("/login");
    } catch {
        res.redirect("/register");
    }
});

app.post("/login", async (req, res) => {
    const user = users.find((user) => user.username === req.body.username);
    if (user == null) {
        return res.redirect("/login");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.user = user;
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    } catch {
        res.redirect("/login");
    }
});
```

#### Шаг 5: Управление состоянием аутентификации через сессии

В приведенном выше коде состояние аутентификации пользователя управляется через сессии. После успешного входа объект пользователя сохраняется в `req.session.user`, что позволяет отслеживать, вошел ли пользователь в систему или нет.

#### Шаг 6: Запуск сервера

Добавьте в конец файла `app.js` код для запуска сервера:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
);
```
