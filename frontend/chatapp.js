const conn  = new WebSocket("ws://" + document.location.host + "/ws");


// Handle index.html (Chatting interface)
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(savedTheme);
}

// Get username from localStorage if available
let username = localStorage.getItem("username");
// Check if username exists in localStorage
if (username) {
    console.log(`Loaded username: ${username}`);
}

sendButton.addEventListener("click", () => {
    const text = messageInput.value.trim();
    if (text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.textContent = username + ": " + text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        messageInput.value = "";

        //send msg to websocket
        conn.send(messageDiv.textContent)

        // Animate message
        messageDiv.style.opacity = "0";
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "scale(1)";
        }, 10);
    }
});

// Theme toggle feature
themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    
    // Apply the new theme
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    
    // Save the theme to localStorage
    localStorage.setItem('theme', newTheme);
});



window.onload = function() {
if(window["WebSocket"]){
    console.log("Supports websockets");
}else{
    alert("Websockets unsuported")
}
}


conn.addEventListener('message', function(event) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    const mess = event.data
    const sender = mess.split(":")[0]; 
    if(sender != username){
        messageDiv.textContent = event.data;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
        // Animate message
        messageDiv.style.opacity = "0";
        setTimeout(() => {
            messageDiv.style.opacity = "1";
            messageDiv.style.transform = "scale(1)";
        }, 10);
    }
});



conn.addEventListener('close', function(event) {
    console.log('WebSocket closed: ', event);
});