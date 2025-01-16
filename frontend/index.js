document.addEventListener("DOMContentLoaded", () => {

    // Handle index.html (Chatting interface)
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("send");
    const themeToggle = document.getElementById("themeToggle");

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
            console.log(messageDiv.textContent)
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
            messageInput.value = "";

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
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
    });

});
