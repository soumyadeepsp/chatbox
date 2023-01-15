var socket = io("http://localhost:8000");

var messageForm = document.getElementById("send_container");
var messageInput = document.getElementById("message_input");
var messageContainer = document.getElementById("message_container");

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var message = messageInput.value;
    socket.emit("send_chat_message", message);
});

socket.on("new_chat_message", function(data) {
    console.log(data);
});