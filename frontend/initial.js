document.addEventListener("DOMContentLoaded", () => {
    // Handle initial.html (Username submission)
    const submitUsernameButton = document.getElementById("submitUsername");
    const usernameInput = document.getElementById("username");

    // Check if submit button exists
    if (!submitUsernameButton) {
        console.error("Submit button not found!");
        return;
    }
    const themeToggle = document.getElementById("themeToggle");



    // Theme toggle feature
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
    });

    // Submit username and store in localStorage
    submitUsernameButton.addEventListener("click", () => {
        const usernameInputValue = usernameInput.value.trim();
        if (usernameInputValue) {
            console.log(`Username submitted: ${usernameInputValue}`);
            localStorage.setItem("username", usernameInputValue);
            window.location.href = 'index.html'; // Redirect to index.html
        } else {
            alert("Please enter your username to proceed!");
        }
    });
});
