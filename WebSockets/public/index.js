const ws = new WebSocket("ws://localhost:3101");

ws.onmessage = (event) => {
    const chat = document.querySelector("#chat");
    if (event.data instanceof Blob) {
        event.data.text().then((text) => {
            const message = document.createElement("p");
            console.log(text);
            message.textContent = text;
            chat.appendChild(message);
        });
    } else {
        const message = document.createElement("p");
        console.log(event.data);
        message.textContent = text;
        chat.appendChild(message);
    }
};

const sendMessage = () => {
    const input = document.querySelector("#messageInput");
    console.log(input.value);
    ws.send(input.value);
    input.value = "";
};
