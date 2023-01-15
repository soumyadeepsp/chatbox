var socket = io("http://localhost:8000");

var messageForm = document.getElementById("send_container");
var messageInput = document.getElementById("message_input");
var messageContainer = document.getElementById("message_container");

var name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new_user", name);

function appendMessage(message) {
    var messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var message = messageInput.value;
    socket.emit("send_chat_message", message);
    messageInput.value = "";
    appendMessage("You: "+message);
});

socket.on("new_chat_message", function(data) {
    console.log(data);
    appendMessage(data.name+" : "+data.message);
});

socket.on("new_user_connected", function(name) {
    appendMessage(name+" joined");
});

socket.on("user_disconnected", function(name) {
    appendMessage(name+" disconnected");
})