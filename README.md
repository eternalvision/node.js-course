# Реализация системы аутентификации и авторизации (Повторение)

## Шаги к реализации

1. **Установка необходимых пакетов**:

   - `jsonwebtoken` для создания и верификации токенов.
   - `bcryptjs` для хеширования и проверки паролей.
2. **Создание модели пользователя с паролем**:

   - Убедимся, что в вашей модели пользователя есть поле для хранения хешированного пароля.
3. **Регистрация пользователей**:

   - Создадим маршрут для регистрации пользователей, где мы будем принимать имя пользователя и пароль, хешировать пароль с помощью bcrypt и сохранять пользователя в базу данных.
4. **Аутентификация пользователей**:

   - Создадим маршрут для аутентификации, где пользователи могут войти, используя свои учетные данные. Проверим учетные данные и, если они верны, создадим JWT и отправим его пользователю.
5. **Мидлвар для проверки токена**:

   - Реализуем мидлвар, который будет проверять JWT в заголовках запросов и устанавливать пользователя для доступа в последующих маршрутах.

## Установка пакетов

```bash
npm install jsonwebtoken bcryptjs
```

## Модель пользователя

Добавим поле для пароля:

```javascript
const userSchema = new Schema({
    name: String,
    password: String, // Добавьте это поле
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});
```

## Регистрация

```javascript
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
```

## Аутентификация

```javascript
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
```

Не забудьте добавить `JWT_SECRET` в `.env` файл.

## Мидлвар для проверки токена

```javascript
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
```

Используем этот мидлвар в маршрутах, где необходима аутентификация:

```javascript
app.use("/api/project", authenticateToken, projectRouter);
```

Это основы для добавления аутентификации и авторизации в ваше приложение. Убедитесь, что вы тщательно тестируете все части системы и обрабатываете возможные ошибки.

## Добавление функциональности изменения пароля и удаления аккаунта пользователя

Для добавления функциональности изменения пароля и удаления аккаунта пользователя, нам нужно будет добавить два новых маршрута в Express приложение. Мы уже реализовали мидлвар `authenticateToken`, который проверяет JWT и устанавливает объект `user` в `req`. Это позволит пользователям изменять свой пароль и удалять свой аккаунт после аутентификации.

### Изменение пароля

```javascript
router.post("/change-password", authenticateToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId; // ID пользователя из JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Проверяем старый пароль
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).send("Old password is incorrect");
        }

        // Хешируем новый пароль и обновляем пользователя
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send("Password successfully changed");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
```

### Удаление аккаунта

```javascript
router.delete("/delete-account", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; // ID пользователя из JWT
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        await User.deleteOne({ _id: userId });
        res.status(200).send("Account successfully deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
```

Эти два маршрута позволяют пользователям, которые успешно прошли аутентификацию, изменять свой пароль и удалять свои аккаунты. Важно убедиться в том, что они используют защиту, предоставляемую мидлваром `authenticateToken`, чтобы только аутентифицированные пользователи могли выполнять эти действия.

## Валидация данных моделей `User` и `Project` с использованием библиотеки Joi

Для валидации данных моделей `User` и `Project` с использованием библиотеки Joi, нам сначала нужно установить эту библиотеку, если мы ещё этого не сделали. Joi позволяет описать схемы валидации для данных, что помогает обеспечить их корректность перед сохранением в базу данных.

### Установка Joi

```bash
npm install joi
```

### Валидация для модели User

Создайте файл валидации, например `validation.js`, и определите в нём схему валидации для пользователя:

```javascript
const Joi = require("joi");

const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    projects: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .optional(), // Проверяем, что это массив ObjectId
});

module.exports = {
    userValidationSchema,
};
```

### Валидация для модели Project

Добавьте валидацию для проекта в тот же файл `validation.js`:

```javascript
const projectValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    userIds: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .required(), // Проверяем, что это массив ObjectId
});

module.exports = {
    userValidationSchema,
    projectValidationSchema,
};
```

### Применение Валидации

Чтобы использовать эти схемы валидации в вашем приложении, вы должны интегрировать проверку данных на основе Joi перед выполнением операций, связанных с базой данных. Например, при создании нового пользователя или проекта:

```javascript
router.post("/register", async (req, res) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Продолжаем регистрацию пользователя...
});

router.post("/projects", async (req, res) => {
    const { error } = projectValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Продолжаем создание проекта...
});
```

Этот подход поможет нам убедиться, что данные, вводимые пользователями, соответствуют нашим требованиям, прежде чем они будут обработаны или сохранены. Joi предлагает гибкие возможности для описания и проверки данных, что позволяет легко адаптировать схемы валидации под наши конкретные потребности.
