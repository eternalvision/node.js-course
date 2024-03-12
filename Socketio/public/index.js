let socket = io("http://localhost:3101");

const sendMessage = () => {
    let messageInput = document.querySelector("#message");
    socket.emit("chat message", messageInput.value);
    messageInput.value = "";
};

socket.on("chat message", (msg) => {
    let item = document.createElement("li");
    item.textContent = msg;
    document.querySelector("#messages").appendChild(item);
});
