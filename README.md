# Сокеты. WebSockets. Socket.io. Создание простого чата

## Введение в сокеты и [WebSockets](https://habr.com/ru/articles/516334/)

### Объяснение концепции сокетов и их использования в сетевом взаимодействии

Сокеты - это конечные точки для обмена данными через сеть, служащие для установления соединения между процессами на разных компьютерах или в рамках одной машины. Они позволяют программам отправлять и принимать данные через сеть Интернет или локальную сеть, используя протоколы TCP (Transmission Control Protocol) или UDP (User Datagram Protocol). WebSockets - это продвинутая технология, обеспечивающая двустороннее коммуникационное соединение между клиентом и сервером по одному соединению. Это позволяет обмен информацией в реальном времени, что идеально подходит для приложений, требующих постоянного обновления данных, например, онлайн-игр или чатов.

### Различие между HTTP и WebSockets, преимущества использования WebSockets

HTTP (HyperText Transfer Protocol) работает по принципу "запрос-ответ", где клиент инициирует соединение, отправляя запрос, а сервер отвечает на этот запрос, после чего соединение закрывается. Это неэффективно для приложений в реальном времени, поскольку требует постоянного переоткрытия соединений для новых данных.

WebSockets же предоставляют двустороннее, постоянное соединение, позволяя клиенту и серверу обмениваться данными в любое время без необходимости закрывать и повторно открывать соединение. Это значительно улучшает производительность и идеально подходит для реальных интерактивных приложений, таких как онлайн-игры или чаты, обеспечивая мгновенный обмен сообщениями и данными.

### Демонстрация работы WebSocket-соединения

1. **Инициализация проекта и установка зависимостей**:
   - Создайте новую папку для проекта и инициализируйте npm проект командой `npm init`.
   - Установите Express и ws (WebSocket) командами `npm install express` и `npm install ws`.

2. **Создание базового сервера Express**:
   - В корне проекта создайте файл, например `server.js`, и настройте Express для обслуживания статических файлов из папки `public`.

3. **Настройка WebSocket сервера**:
   - В том же файле `server.js` инициализируйте WebSocket сервер, который будет работать вместе с сервером Express.

4. **Реализация обработки сообщений**:
   - Добавьте логику для приема сообщений от клиентов и рассылки их всем подключенным пользователям.

5. **Создание клиентской части**:
   - В папке `public` создайте HTML файл с пользовательским интерфейсом для чата и JavaScript код для подключения к WebSocket серверу и отправки/получения сообщений.

6. **Тестирование приложения**:
   - Запустите сервер и откройте в браузере HTML файл для тестирования работы чата.

#### Этап 1: Инициализация проекта и установка зависимостей

1. Создайте новую директорию для вашего проекта и перейдите в неё через терминал.
2. Выполните команду `npm init -y` для инициализации нового проекта Node.js с дефолтными настройками.
3. Установите необходимые пакеты, выполнив команду:

   ```bash
   npm install express ws
   ```

#### Этап 2: Создание базового сервера Express

1. В корне проекта создайте файл `server.js`.
2. Импортируйте express и создайте экземпляр приложения:

   ```javascript
   const express = require('express');
   const app = express();
   ```

3. Настройте Express для обслуживания статических файлов из папки `public`. Если папки `public` еще нет, создайте её и поместите туда HTML файлы вашего приложения.

   ```javascript
   app.use(express.static('public'));
   ```

4. Запустите сервер на определенном порте (например, 3000):

   ```javascript
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

#### Этап 3: Настройка WebSocket сервера с использованием `ws`

1. В файле `server.js`, после настройки Express, импортируйте модуль `ws` и создайте WebSocket сервер. Вам нужно будет использовать тот же HTTP-сервер, что и для Express, поэтому сначала модифицируйте создание сервера Express:

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
```

2. Настройте обработку подключений к WebSocket серверу:

```javascript
wss.on('connection', function connection(ws) {
  console.log('Клиент подключен');

  ws.on('message', function incoming(message) {
    console.log('Получено сообщение: %s', message);

    // Рассылка полученного сообщения всем подключенным клиентам
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function() {
    console.log('Клиент отключился');
  });
});
```

3. Измените способ запуска сервера Express, чтобы использовать созданный HTTP сервер:

```javascript
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

#### Этап 3: Настройка WebSocket сервера

В файле `server.js`, после настройки Express, добавьте код для WebSocket сервера, используя библиотеку `ws`:

```javascript
const WebSocket = require('ws');
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // Когда сервер получает сообщение, он рассылает его всем подключенным клиентам
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

// Измените app.listen на server.listen
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

Этот код создает WebSocket сервер, который работает параллельно с HTTP сервером Express. Каждый раз, когда клиент отправляет сообщение (`ws.send` в клиентском коде), сервер перенаправляет его всем подключенным клиентам.

#### Этап 4: Реализация обработки сообщений

Код выше уже включает базовую реализацию обработки и рассылки сообщений. Вот как это работает:

- При подключении нового клиента создается новый WebSocket (`ws`), который прослушивает событие `message`.
- Когда один из клиентов отправляет сообщение, событие `message` активируется. Внутри обработчика этого события сообщение отправляется всем подключенным клиентам, проверяя, что их соединение открыто (`client.readyState === WebSocket.OPEN`).

Теперь у вас есть простой сервер для чата на WebSocket, который может обмениваться сообщениями между клиентами в реальном времени.

Извините за путаницу. Чтобы завершить наше приложение, выполним следующие шаги:

#### Этап 5: Создание клиентской части

В папке `public` создайте файл `index.html` и добавьте следующий HTML и JavaScript код:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Чат на WebSockets</title>
</head>
<body>
    <div id="chat"></div>
    <input type="text" id="messageInput" placeholder="Введите сообщение...">
    <button onclick="sendMessage()">Отправить</button>

    <script>
        const ws = new WebSocket('ws://localhost:3000');

        ws.onmessage = function(event) {
            const chat = document.getElementById('chat');
            const message = document.createElement('p');
            message.textContent = event.data;
            chat.appendChild(message);
        };

        function sendMessage() {
            const input = document.getElementById('messageInput');
            ws.send(input.value);
            input.value = '';
        }
    </script>
</body>
</html>
```

Этот код создает простой интерфейс для чата с возможностью отправки сообщений и отображения полученных сообщений.

#### Этап 6: Тестирование приложения

1. Запустите сервер, выполнив команду `node server.js` в терминале.
2. Откройте браузер и перейдите по адресу `http://localhost:3000`.
3. Попробуйте отправить сообщение и увидите, как оно отображается в чате. Откройте несколько вкладок браузера с вашим чатом, чтобы протестировать обмен сообщениями в реальном времени между разными клиентами.

## Введение в [Socket.io](https://socket.io/get-started/chat)

### Объяснение, что такое Socket.io и его отличия от нативных WebSockets

Socket.io — это библиотека для реализации реального времени и двусторонней связи между веб-клиентами и серверами. Она облегчает использование WebSocket, предоставляя дополнительные возможности, такие как автоматическое восстановление соединения, комнаты, широковещательная передача данных и другие, которых нет в нативных WebSocket. В отличие от нативного WebSocket API, который предоставляет базовый функционал для обмена сообщениями между клиентом и сервером, Socket.io позволяет легко масштабировать приложение и управлять событиями на высоком уровне.

Давайте разберемся с установкой и настройкой Socket.io в проекте на базе Express, а также создадим базовый сервер и клиент с использованием этой технологии.

### Установка и настройка Socket.io

Чтобы добавить Socket.io в ваш проект, выполните следующие шаги:

1. **Установка Socket.io**

   Откройте терминал в корневой папке вашего проекта и выполните команду установки Socket.io. Эта команда добавит как серверную, так и клиентскую библиотеки Socket.io к вашему проекту.

   ```bash
   npm install socket.io
   ```

2. **Настройка сервера Express для использования с Socket.io**

   После установки Socket.io, необходимо интегрировать его с вашим сервером Express. Откройте или создайте файл `server.js` и добавьте следующий код:

   ```javascript
   const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);

   // Настройка папки с статическими файлами
   app.use(express.static('public'));

   // Обработка новых подключений к Socket.io
   io.on('connection', (socket) => {
     console.log('Новое подключение');

     // Обработка отключения
     socket.on('disconnect', () => {
       console.log('Пользователь отключился');
     });
   });

   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

   В этом коде создается HTTP сервер, который используется как для Express, так и для Socket.io. Это позволяет им работать вместе на одном и том же порту.

### Создание базового сервера и клиента с использованием Socket.io

Теперь, когда сервер настроен, давайте создадим базовую клиентскую часть, которая будет подключаться к серверу и обмениваться сообщениями.

1. **Создание клиентской части**

   В папке `public` вашего проекта создайте файл `index.html` и добавьте в него следующий HTML код:

   ```html
   <!DOCTYPE html>
   <html lang="ru">
   <head>
     <meta charset="UTF-8">
     <title>Socket.io Чат</title>
     <script src="/socket.io/socket.io.js"></script>
     <script>
       document.addEventListener('DOMContentLoaded', function () {
         var socket = io();

         socket.on('connect', function () {
           console.log('Подключено к серверу');
         });
       });
     </script>
   </head>
   <body>
     <h1>Добро пожаловать в чат на Socket.io!</h1>
   </body>
   </html>
   ```

   Этот код загружает клиентскую библиотеку Socket.io и устанавливает соединение с сервером. Вы увидите сообщение в консоли, когда будет установлено соединение.

2. **Обмен сообщениями между сервером и клиентом**

   Чтобы обмениваться сообщениями, добавим код на сервер и клиент.

   - **На сервере** (в файле `server.js`), добавьте обработку событий для отправки и приема сообщений:

     ```javascript
     io.on('connection', (socket) => {
       console.log('Новое подключение');

       socket.on('chat message', (msg) => {
         console.log('Сообщение: ' + msg);
         // Отправка сообщения всем подключенным клиентам
         io.emit('chat message', msg);
       });

       socket.on('disconnect', () => {
         console.log('Пользователь отключился');
       });
     });
     ```

   - **На клиенте** (в `index.html`), добавьте возможность отправки сообщений и отображения полученных сообщений:

     ```html
     <input id="message" type="text">
     <button onclick="sendMessage()">Отправить</button>
     <ul id="messages"></ul>

     <script>
       var socket = io();

       function sendMessage() {
         var messageInput = document.getElementById('message');
         socket.emit('chat message', messageInput.value);
         messageInput.value = '';
       }

       socket.on('chat message', function(msg){
         var item = document.createElement('li');
         item.textContent = msg;
         document.getElementById('messages').appendChild(item);
         window.scrollTo(0, document.body.scrollHeight);
       });
     </script>
     ```

   Теперь, когда пользователь вводит сообщение и нажимает кнопку "Отправить", сообщение отправляется на сервер через Socket.io. Сервер, в свою очередь, рассылает это сообщение всем подключенным клиентам, и оно отображается в списке сообщений.

Запустите сервер и откройте несколько вкладок в браузере с адресом `http://localhost:3000`, чтобы протестировать ваш чат. Вы должны увидеть, как сообщения, отправленные в одной вкладке, мгновенно появляются в других.
