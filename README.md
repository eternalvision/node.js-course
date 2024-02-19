
# Подключение и работа с базами данных в Express

## Интеграция Express с MongoDB с использованием Mongoose

### Теоретическая часть

#### Введение в Mongoose и его преимущества перед прямым использованием MongoDB.

Mongoose — это библиотека для Node.js, которая предоставляет решения для моделирования данных вашего приложения. Она упрощает взаимодействие с MongoDB благодаря удобному API для создания схем, валидации данных, составления запросов и многого другого. Mongoose работает как слой абстракции над MongoDB, предлагая модели на основе схем для управления данными.

##### Преимущества Mongoose перед прямым использованием MongoDB

1. **Схемы данных:** Mongoose позволяет определять схемы данных с заранее заданными типами полей. Это обеспечивает структурированность и предсказуемость формата данных, а также валидацию на уровне модели. В отличие от MongoDB, где данные могут быть в любом формате, Mongoose навязывает структуру, делая код более устойчивым к ошибкам.
2. **Валидация данных:** С помощью Mongoose можно легко валидировать данные перед их сохранением в базу данных. Валидация может включать проверку типов данных, обязательность полей, длину строк и многое другое. Это сокращает риск некорректных данных и повышает надежность приложения.
3. **Простота запросов:** Mongoose предоставляет удобные и мощные методы для создания запросов к базе данных. С его помощью можно легко осуществлять поиск, добавление, обновление и удаление данных, используя простой и интуитивно понятный синтаксис.
4. **Промисы и асинхронные запросы:** Mongoose поддерживает промисы и async/await, что упрощает работу с асинхронным кодом. Это позволяет писать более читаемый и понятный код, особенно при работе с большим количеством асинхронных операций.
5. **Плагины:** Mongoose имеет богатую экосистему плагинов, которые добавляют дополнительную функциональность или упрощают выполнение распространенных задач. Например, существуют плагины для пагинации, мягкого удаления данных и автоматического создания API.
6. **Автоматическое преобразование типов:** Mongoose автоматически преобразует типы данных, когда это необходимо. Например, если вы задаете в схеме поле как число, но передаете строку, содержащую число, Mongoose попытается преобразовать эту строку в число. Это уменьшает вероятность ошибок при работе с данными.
7. **Предопределенные методы и виртуальные свойства:** Mongoose позволяет добавлять к моделям методы и виртуальные свойства, что делает модели еще более мощными. Виртуальные свойства — это поля, которые не сохраняются в базе данных, но могут быть вычислены на основе других полей и использоваться как обычные свойства объекта.

### Установка и настройка Mongoose в проекте Express.

##### Шаг 1: Установка Mongoose

Первым делом необходимо добавить Mongoose в твой проект. Это делается с помощью менеджера пакетов npm или yarn. Открой терминал в корне твоего проекта и выполни следующую команду:

```bash
npm install mongoose
```

или, если ты используешь yarn:

```bash
yarn add mongoose
```

Эта команда скачает последнюю версию Mongoose и добавит ее в твой проект, а также занесет запись в файл `package.json`, который отслеживает зависимости проекта.

##### Шаг 2: Подключение к MongoDB с использованием Mongoose

После установки Mongoose, следующим шагом будет настройка подключения к MongoDB. Для этого создай файл, например, `database.js` в корневой директории твоего проекта, и добавь в него следующий код:

```javascript
const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/имя_твоей_базы_данных";

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB подключен..."))
    .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

module.exports = mongoose;
```

Замени `имя_твоей_базы_данных` на имя базы данных, которую ты хочешь использовать. Если ты используешь MongoDB Atlas (облачный сервис MongoDB), тебе нужно будет заменить `dbURI` на строку подключения, предоставленную Atlas.

##### Шаг 3: Использование файла подключения в приложении

Теперь, когда у тебя есть файл для управления подключением к базе данных, ты можешь легко использовать его в своем приложении Express. Для этого импортируй файл `database.js` в главный файл твоего приложения, например, `app.js`:

```javascript
const mongoose = require("./database");
```

Это гарантирует, что подключение к MongoDB будет установлено при запуске приложения.

##### Шаг 4: Настройка переменных окружения (опционально)

Для повышения безопасности и удобства управления конфигурацией рекомендуется использовать переменные окружения для хранения строки подключения к базе данных и других конфиденциальных данных. Используй библиотеку, например `dotenv`, для загрузки переменных окружения из файла `.env` в процесс Node.js:

1. Установи `dotenv`:

```bash
npm install dotenv
```

2. Создай файл `.env` в корне проекта и добавь в него строку подключения:

```
DB_URI=mongodb://localhost:27017/имя_твоей_базы_данных
```

3. Измени `database.js`, чтобы использовать переменную окружения:

```javascript
require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB подключен..."))
    .catch((err) => console.error("Ошибка подключения к MongoDB:", err));
```

### Практическое задание

#### Настройка файла конфигурации для управления соединением с базой данных.

Настройка файла конфигурации для управления соединением с базой данных является важным аспектом разработки приложений, поскольку это обеспечивает гибкость и безопасность при работе с вашей базой данных. В контексте приложения Express, использующего Mongoose для работы с MongoDB, настройку соединения можно улучшить с помощью файла конфигурации. Это позволяет легко изменять параметры подключения без необходимости изменять основной код приложения.

##### Шаг 1: Создание файла конфигурации

Создайте в корневой директории проекта папку `config`, а в ней файл `db.js`. Этот файл будет содержать настройки подключения к MongoDB.

###### Файл `config/db.js`

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        console.log(`MongoDB подключен: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Ошибка подключения к MongoDB: ${err.message}`);
        process.exit(1); // Выход из процесса с ошибкой
    }
};

module.exports = connectDB;
```

В этом файле мы определяем функцию `connectDB`, которая асинхронно подключается к MongoDB, используя строку подключения из переменной окружения `DB_URI`. Обратите внимание на использование параметров подключения, таких как `useNewUrlParser` и `useUnifiedTopology`, которые рекомендованы для правильной работы с базой данных.

##### Шаг 2: Использование файла конфигурации в приложении

Теперь, когда у вас есть файл конфигурации для подключения к базе данных, вы должны его импортировать и использовать в основном файле приложения (например, `app.js`).

###### Модификация `app.js`

```javascript
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

// Подключение к базе данных
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Определение маршрутов...

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

В этом измененном примере `app.js` мы импортируем и вызываем `connectDB` для установления соединения с базой данных перед запуском сервера Express.

##### Шаг 3: Настройка переменных окружения

Убедитесь, что у вас есть файл `.env` в корневой директории проекта, где вы определяете `DB_URI` и другие переменные окружения, такие как `PORT`.

###### Файл `.env`

```
DB_URI=mongodb://localhost:27017/myapp
PORT=3000
```

Использование файла конфигурации для управления соединением с базой данных не только упрощает управление параметрами подключения, но и повышает безопасность приложения, позволяя избегать жесткой кодировки конфиденциальной информации в исходном коде.

#### Создание простого приложения Express, которое подключается к MongoDB с помощью Mongoose, взаимодействует с данными - вывод / ввод / изменение / удаление.

Давай перейдем к практическому заданию, где ты создашь простое приложение на Express, которое будет подключаться к MongoDB с помощью Mongoose и позволит выполнять базовые операции с данными: вывод, ввод, изменение и удаление.

##### Шаг 1: Создани Express приложения

Если у тебя еще нет инициализированного проекта Express, начни с создания новой папки для проекта и инициализируй в ней новый проект Node.js:

```bash
mkdir myapp
cd myapp
npm init -y
```

Установи Express и Mongoose:

```bash
npm install express mongoose
```

Создай файл `app.js` в корне проекта и добавь в него базовую настройку Express:

```javascript
const express = require("express");
const mongoose = require("./database"); // Импорт настройки подключения к MongoDB
const app = express();
const port = 3000;

app.use(express.json()); // Middleware для разбора JSON

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
```

##### Шаг 2: Определение модели данных с Mongoose

Создай папку `models` в корне проекта и в ней файл `User.js` для модели пользователя. Определи в этом файле схему и модель для пользователя:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

##### Шаг 3: Создание маршрутов для взаимодействия с данными

Вернись в файл `app.js` и добавь маршруты для выполнения операций CRUD.

###### Создание пользователя (Create)

```javascript
const User = require("./models/User"); // Импорт модели пользователя

app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
```

###### Получение списка пользователей (Read)

```javascript
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});
```

###### Обновление данных пользователя (Update)

```javascript
app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
```

###### Удаление пользователя (Delete)

```javascript
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});
```

##### Полный код для приложения.

###### Файл `database.js` - Настройка подключения к MongoDB

```javascript
const mongoose = require("mongoose");
require("dotenv").config(); // Убедитесь, что у вас установлен dotenv и создан .env файл

const dbURI = process.env.DB_URI;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB подключен..."))
    .catch((err) => console.error("Ошибка подключения к MongoDB:", err));
```

###### Файл `.env` - Хранение конфигураций

```plaintext
DB_URI=mongodb://localhost:27017/myapp
```

###### Файл `models/User.js` - Модель пользователя

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
```

###### Файл `app.js` - Основной файл приложения

```javascript
const express = require("express");
require("./database"); // Подключение к MongoDB
const User = require("./models/User"); // Импорт модели пользователя

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware для разбора JSON

// Создание пользователя
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получение списка пользователей
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

// Обновление данных пользователя
app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удаление пользователя
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

### Вопросы для обсуждения

#### Какие проблемы могут возникнуть при подключении к MongoDB и как их решать?

Проблемы, с которыми вы можете столкнуться при подключении к MongoDB, и их решения включают:

- **Проблемы с подключением**: Наиболее распространенная проблема — это неудачное подключение к базе данных из-за неправильной строки подключения, проблем с сетью или недоступности сервера MongoDB. Убедитесь, что строка подключения корректна, сервер доступен, и нет сетевых препятствий (например, брандмауэра, который блокирует соединение).
- **Проблемы с версией**: Различия в версиях MongoDB и Mongoose могут привести к несовместимости. Убедитесь, что вы используете совместимые версии этих компонентов.
- **Проблемы с производительностью**: Неправильно сконфигурированные индексы, большие объемы данных без пагинации или неоптимизированные запросы могут снизить производительность. Проанализируйте и оптимизируйте свои запросы, используйте индексы там, где это необходимо, и реализуйте пагинацию для больших наборов данных.
- **Проблемы с безопасностью**: Настройка базы данных без аутентификации или неправильно настроенные правила доступа могут привести к уязвимостям. Используйте механизмы аутентификации и авторизации MongoDB, настройте правила брандмауэра и VPN для обеспечения безопасного соединения.

#### Обсуждение лучших практик безопасности при работе с базами данных

При работе с базами данных, особенно в продуктивной среде, важно придерживаться лучших практик безопасности:

- **Использование аутентификации и авторизации**: Всегда включайте аутентификацию для доступа к базе данных. Рассмотрите возможность использования ролевой модели доступа для ограничения операций, которые могут выполнять пользователи и приложения.
- **Шифрование данных**: Используйте шифрование данных в покое и передаче данных. MongoDB поддерживает TLS/SSL для шифрования данных во время передачи и может быть настроен для шифрования данных на диске.
- **Регулярное резервное копирование**: Регулярно создавайте резервные копии ваших баз данных для защиты от потери данных из-за аппаратных сбоев, атак или других проблем.
- **Ограничение доступа**: Ограничьте доступ к вашей базе данных с помощью брандмауэра или сетевых политик. Разрешайте доступ только из доверенных и необходимых источников.
- **Использование переменных окружения**: Для повышения безопасности храните конфиденциальную информацию, такую как строки подключения и доступы к базам данных, в переменных окружения, а не в коде.
- **Обновление и патчинг**: Регулярно обновляйте MongoDB и все связанные компоненты до последних версий для защиты от известных уязвимостей.
- **Мониторинг и аудит**: Настройте мониторинг и аудит событий безопасности для раннего обнаружения подозрительных действий и атак.

## Глубокое погружение в работу с Mongoose: схемы, модели, валидация через Joi

### Теоретическая часть

**Схемы** в Mongoose служат для определения структуры и правил ваших данных для MongoDB. Схема указывает типы данных для каждого поля и может включать валидацию, значения по умолчанию и другие ограничения. Схемы обеспечивают ясность и предсказуемость структуры данных в вашем приложении, помогая управлять и валидировать данные перед их сохранением в базу данных.

**Модели** в Mongoose являются конструкторами, созданными на основе схемы и представляют документы, которые могут быть сохранены и извлечены из MongoDB. Модели используются для выполнения операций CRUD (создание, чтение, обновление, удаление) с данными, соответствующими определенной схеме.

**Валидация данных** — критически важный аспект разработки приложений, обеспечивающий корректность, безопасность и надежность работы с данными. **Joi** — это библиотека валидации для JavaScript, которая позволяет описывать схемы данных и применять их для валидации объектов JavaScript. Использование Joi в сочетании с Mongoose может дать дополнительный уровень валидации на стороне сервера, позволяя создавать более сложные и точные правила валидации, чем те, что встроены в Mongoose.

Преимущество использования Joi в сочетании с Mongoose заключается в том, что Joi предлагает более богатый синтаксис для определения правил валидации и может обеспечить более глубокую проверку данных. Например, Joi позволяет легко валидировать сложные структуры объектов, проверять строки на соответствие определенным форматам (например, email или URL), применять логику условной валидации и многое другое.

Хотя Mongoose предоставляет собственные механизмы валидации на уровне схемы, интеграция Joi может быть полезна для выполнения валидации на уровне маршрутов или сервисов перед тем, как данные будут переданы в модель Mongoose. Это позволяет разработчикам более тонко управлять процессом валидации и разделить ответственность между валидацией входящих данных API и валидацией данных перед их сохранением в базу данных.

В заключение, использование схем и моделей в Mongoose в сочетании с мощными возможностями валидации через Joi позволяет строить эффективные и надежные системы управления данными в приложениях на Node.js, обеспечивая при этом гибкость и мощные инструменты для работы с данными и их валидации.

### Понимание схем в Mongoose: определение и настройка.

Понимание схем в Mongoose и их правильная настройка являются ключевыми аспектами при работе с MongoDB в приложениях на Node.js. Схемы в Mongoose определяют структуру документов в определенной коллекции MongoDB и служат для валидации, определения типов и настройки значений по умолчанию для этих документов.

##### Определение схемы

Схема в Mongoose создается с помощью конструктора `Schema`, который принимает объект, описывающий структуру и правила ваших данных. Каждое поле в этом объекте соответствует полю в документах вашей коллекции MongoDB и может определять тип данных, валидацию, значения по умолчанию и другие настройки.

Пример определения схемы:

```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
```

В этом примере создается схема для пользователя (`User`), которая включает поля для имени, электронной почты, пароля и даты создания. Каждое поле определяется с типом данных и дополнительными параметрами, такими как `required` и `default`.

##### Типы данных

Mongoose поддерживает несколько типов данных, включая `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array` и другие. Выбор правильного типа данных для каждого поля схемы важен для обеспечения целостности данных вашего приложения.

##### Валидация

Mongoose позволяет определять правила валидации на уровне схемы. Эти правила могут включать обязательность поля (`required`), уникальность (`unique`), минимальные и максимальные значения для чисел, минимальную и максимальную длину для строк и пользовательские валидаторы.

Пример пользовательского валидатора:

```javascript
email: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /\S+@\S+\.\S+/.test(v);
    },
    message: props => `${props.value} is not a valid email address!`
  }
}
```

##### Настройка схемы

Схемы могут быть настроены с помощью дополнительных параметров для управления поведением документов, например, с помощью параметров `timestamps` для автоматического добавления полей `createdAt` и `updatedAt`.

Пример:

```javascript
const userSchema = new Schema(
    {
        // поля схемы
    },
    { timestamps: true },
);
```

После определения схемы ее можно использовать для создания модели, которая будет взаимодействовать с соответствующей коллекцией в базе данных MongoDB.

#### Реальный пример использования схемы в Mongoose

##### Шаг 1: Определение схемы пользователя

Создадим схему для пользователя, которая включает в себя поля для имени (`name`), адреса электронной почты (`email`), пароля (`password`) и даты регистрации (`signupDate`). Мы также включим валидацию для адреса электронной почты и пароля, а также установим значение по умолчанию для даты регистрации.

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    signupDate: {
        type: Date,
        default: Date.now,
    },
});
```

В этом примере для каждого поля определены типы данных и правила валидации:

- Поля `name`, `email`, и `password` помечены как обязательные (`required`).
- Для `email` используется регулярное выражение (`match`) для проверки формата адреса электронной почты.
- Указано минимальное количество символов (`minlength`) для пароля.
- Поле `signupDate` автоматически получает текущую дату и время благодаря параметру `default`.

##### Шаг 2: Создание модели на основе схемы

После определения схемы мы можем создать модель, которая будет использоваться для взаимодействия с соответствующей коллекцией в базе данных MongoDB.

```javascript
const User = mongoose.model("User", userSchema);
```

##### Шаг 3: Использование модели в приложении

Теперь, когда модель `User` создана, мы можем использовать её для создания новых пользователей, поиска существующих, обновления и удаления.

###### Создание нового пользователя

```javascript
const newUser = new User({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
});

newUser
    .save()
    .then((user) => console.log("User created:", user))
    .catch((err) => console.error("Error creating user:", err));
```

#### Давайте дополним наш пример созданием базовых роутов для операций CRUD с использованием модели `User`.

##### Подготовка

Убедитесь, что у вас установлены `express` и `body-parser` для обработки HTTP-запросов и чтения данных тела запроса.

```bash
npm install express body-parser
```

##### Настройка Express и роутов

Создадим файл `server.js` и настроим базовый сервер Express с роутами для создания пользователя, получения списка пользователей, обновления и удаления пользователя.

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User"); // Путь к вашей модели пользователя

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose
    .connect("mongodb://localhost:27017/yourdbname", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use(bodyParser.json());

// Создание нового пользователя
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Получение списка всех пользователей
app.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Обновление пользователя по ID
app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Удаление пользователя по ID
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### Валидация через Joi

Валидация через Joi позволяет добавить дополнительный уровень проверки входящих данных в вашем приложении Express, дополняя встроенные средства валидации Mongoose. Joi предлагает более гибкие и мощные возможности для определения сложных схем валидации.

##### Установка Joi

Для начала установим Joi в наш проект:

```bash
npm install joi
```

##### Пример использования Joi для валидации

Допустим, мы хотим валидировать данные пользователя перед их сохранением в базу данных. Создадим схему валидации Joi в файле, где мы определяем наши роуты (например, в `server.js` или отдельном файле маршрутов).

```javascript
const Joi = require("joi");

// Схема валидации для пользователя
const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    signupDate: Joi.date(),
});
```

##### Применение схемы валидации в роуте

Далее, мы можем использовать эту схему валидации в нашем роуте для создания нового пользователя, чтобы убедиться, что данные соответствуют нашим требованиям перед тем, как продолжить их обработку.

```javascript
app.post("/users", async (req, res) => {
    // Валидация данных запроса с использованием схемы Joi
    const { error, value } = userValidationSchema.validate(req.body);

    if (error) {
        // В случае ошибки валидации возвращаем сообщение об ошибке
        return res.status(400).send(error.details[0].message);
    }

    // Если данные прошли валидацию, продолжаем их обработку
    try {
        const newUser = new User(value);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
```

В этом примере, если данные, отправленные пользователем, не соответствуют схеме валидации Joi, клиенту будет возвращено сообщение об ошибке с указанием, какие именно данные не прошли проверку. Это обеспечивает дополнительный уровень защиты и помогает гарантировать, что только правильно структурированные и безопасные данные будут обрабатываться и сохраняться в базе данных.

#### Дополнение предыдущего примера кода

##### Шаг 1: Добавление Joi и определение схемы валидации

Сначала добавим Joi в наш проект и определим схему валидации в том же файле, где находятся наши роуты (например, `server.js`).

```javascript
const Joi = require("joi");

// Схема валидации для пользователя
const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    signupDate: Joi.date(),
});
```

##### Шаг 2: Валидация данных в роуте создания пользователя

Теперь используем схему валидации Joi в роуте для создания пользователя, чтобы проверить входящие данные перед их обработкой.

```javascript
app.post("/users", async (req, res) => {
    // Валидация данных запроса с использованием схемы Joi
    const { error, value } = userValidationSchema.validate(req.body);

    if (error) {
        // В случае ошибки валидации возвращаем сообщение об ошибке
        return res.status(400).send(error.details[0].message);
    }

    // Если данные прошли валидацию, продолжаем их обработку
    try {
        const newUser = new User(value);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
```

## CRUD операции с использованием Mongoose

### Теоретическая часть

CRUD — это аббревиатура, обозначающая четыре основные операции, используемые при взаимодействии с базами данных: Создание (Create), Чтение (Read), Обновление (Update) и Удаление (Delete). Mongoose упрощает выполнение этих операций в MongoDB, предоставляя простой и мощный API.

### Основы CRUD операций в Mongoose: создание, чтение, обновление и удаление данных.

#### Создание (Create)

Для создания нового документа в MongoDB с помощью Mongoose, вы используете модель, основанную на схеме вашей коллекции. Модель предоставляет метод `save()`, который вы вызываете для нового экземпляра модели.

```javascript
const newUser = new User({
    name: "John Doe",
    email: "john@example.com",
    password: "password",
});

newUser
    .save()
    .then((user) => console.log(user))
    .catch((err) => console.error(err));
```

Также можно использовать метод `create()` непосредственно на модели для создания нового документа.

```javascript
User.create(
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password",
    },
    (err, user) => {
        if (err) console.error(err);
        console.log(user);
    },
);
```

#### Чтение (Read)

Для чтения данных Mongoose предоставляет несколько методов, таких как `find()`, `findOne()`, и `findById()`.

- **find()** возвращает все документы, соответствующие критериям поиска.

```javascript
User.find({ name: "John Doe" }, (err, users) => {
    if (err) console.error(err);
    console.log(users);
});
```

- **findOne()** возвращает один документ, соответствующий критериям поиска.

```javascript
User.findOne({ email: "john@example.com" }, (err, user) => {
    if (err) console.error(err);
    console.log(user);
});
```

- **findById()** возвращает документ по его идентификатору.

```javascript
User.findById("идентификатор_документа", (err, user) => {
    if (err) console.error(err);
    console.log(user);
});
```

#### Обновление (Update)

Для обновления документов можно использовать методы `updateOne()`, `updateMany()`, или `findByIdAndUpdate()`.

```javascript
User.findByIdAndUpdate(
    "идентификатор_документа",
    { $set: { name: "New Name" } },
    { new: true },
    (err, user) => {
        if (err) console.error(err);
        console.log(user);
    },
);
```

#### Удаление (Delete)

Для удаления документов предоставляются методы `deleteOne()`, `deleteMany()`, и `findByIdAndDelete()`.

```javascript
User.findByIdAndDelete("идентификатор_документа", (err, user) => {
    if (err) console.error(err);
    console.log(`User deleted: ${user}`);
});
```

### Реализация CRUD операций в приложении Express

#### Шаг 1: Настройка проекта

1. Инициализируйте новый проект Node.js и установите необходимые зависимости.

```bash
mkdir todo-app
cd todo-app
npm init -y
npm install express mongoose joi dotenv
```

2. Создайте файл `.env` в корне проекта для хранения строк подключения к базе данных и других конфиденциальных данных.

```
PORT=3000
DB_URI=mongodb://localhost:27017/todoapp
```

#### Шаг 2: Настройка сервера Express

Создайте файл `server.js` и настройте базовый сервер Express.

```javascript
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware для разбора JSON

const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

#### Шаг 3: Создание модели задачи

Создайте папку `models` и в ней файл `task.js` для модели задачи.

```javascript
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
    },
    { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
```

#### Шаг 4: Валидация данных с Joi

Создайте папку `validators` и в ней файл `taskValidator.js` для валидации задач.

```javascript
const Joi = require("joi");

const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().allow(""),
        status: Joi.string().valid("pending", "completed"),
    });

    return schema.validate(task);
};

module.exports = validateTask;
```

#### Шаг 5: Создание роутов

Добавьте роуты для CRUD операций в `server.js` или создайте отдельный файл маршрутов, если предпочитаете.

```javascript
const Task = require("./models/task");
const validateTask = require("./validators/taskValidator");

// Создание задачи
app.post("/tasks", (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    });

    task.save()
        .then((task) => res.send(task))
        .catch((err) => res.status(500).send("Error creating the task"));
});

// Получение всех задач
app.get("/tasks", (req, res) => {
    Task.find()
        .then((tasks) => res.send(tasks))
        .catch((err) => res.status(500).send("Error retrieving tasks"));
});

// Обновление задачи
app.put("/tasks/:id", (req, res) => {
    const { error } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Task.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        .then((task) => res.send(task))
        .catch((err) => res.status(500).send("Error updating the task"));
});

// Удаление задачи
app.delete("/tasks/:id", (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then((task) => res.send(task))
        .catch((err) => res.status(500).send("Error deleting the task"));
});
```

### Особенности и подводные камни

1. **Схемы и валидация**: Mongoose позволяет определять схемы с валидацией для моделей. Однако валидация на стороне сервера может занять дополнительное время, особенно при больших объемах данных. Важно найти баланс между необходимостью валидации и производительностью.
2. **Преобразование типов**: Mongoose автоматически преобразует типы данных, основываясь на определении схемы. Это удобно, но может привести к неожиданным результатам, если данные не соответствуют ожидаемым типам.
3. **Обработка ошибок**: Необходимо тщательно обрабатывать ошибки при выполнении CRUD операций. Ошибки могут возникать по разным причинам, включая проблемы с валидацией, соединением с базой данных и так далее.
4. **Производительность при больших объемах данных**: При работе с большими объемами данных необходимо оптимизировать запросы и структуру базы данных, чтобы избежать снижения производительности.
5. **Использование `populate`**: Mongoose предоставляет метод `populate` для автоматической замены указанных путей в документе объектами из других коллекций. Хотя это очень удобно для работы с отношениями между данными, чрезмерное его использование может негативно сказаться на производительности.

### Стратегии оптимизации запросов

1. **Индексация**: Создайте индексы для наиболее часто используемых полей и запросов. Это может значительно ускорить операции чтения, особенно для больших наборов данных.
2. **Выборка только необходимых данных**: Используйте методы `select` в Mongoose для выборки только тех полей, которые действительно необходимы для конкретной операции. Это уменьшит объем передаваемых данных и может улучшить производительность.
3. **Ограничение размера результатов**: Используйте методы `limit` и `skip` для пагинации результатов. Это особенно важно при работе с большими объемами данных, чтобы не загружать сразу всю базу данных.
4. **Lean запросы**: Метод `lean` в Mongoose возвращает обычные JavaScript объекты вместо полноценных Mongoose документов, что уменьшает накладные расходы и может увеличить производительность для операций чтения.
5. **Агрегация**: Используйте агрегационный конвейер MongoDB для выполнения сложных запросов и преобразований данных непосредственно на стороне сервера базы данных. Это может быть более эффективно, чем обработка данных в приложении.
6. **Пакетная обработка**: Для массовых операций обновления и удаления используйте пакетную обработку, чтобы минимизировать количество запросов к базе данных.
7. **Мониторинг и профилирование**: Регулярно мониторьте производительность базы данных и используйте профилирование запросов для определения и оптимизации "узких мест".
