document.addEventListener("DOMContentLoaded", () => {
    let socket = io("http://localhost:3101");

    socket.on("connect", () => {
        console.log("Connect to Server");
    });
});
