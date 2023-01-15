// require socket.io library and run it on a port
var io = require("socket.io")(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
        allowHeaders: ["content-type"]
    }
});

// start the connection and do whatever you want to do
io.on("connection", function(socket) {
    socket.on("send_chat_message", function(data) {
        console.log(data);
        socket.broadcast.emit("new_chat_message", data);
    });
});