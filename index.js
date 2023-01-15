// require socket.io library and run it on a port
var io = require("socket.io")(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"],
        allowHeaders: ["content-type"]
    }
});

var users = {};

// start the connection and do whatever you want to do
io.on("connection", function(socket) {
    socket.on("send_chat_message", function(data) {
        console.log(data);
        console.log(socket.id);
        socket.broadcast.emit("new_chat_message", {name: users[socket.id], message: data});
    });
    socket.on("new_user", function(name) {
        users[socket.id] = name;
        socket.broadcast.emit("new_user_connected", name);
    });
    socket.on("disconnect", function() {
        socket.broadcast.emit("user_disconnected", users[socket.id]);
        delete users[socket.id];
    })
});