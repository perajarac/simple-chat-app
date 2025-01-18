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

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(savedTheme);
    }



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

    // Submit username and store in localStorage
    submitUsernameButton.addEventListener("click", () => {
        const usernameInputValue = usernameInput.value.trim();
        if (usernameInputValue) {
            console.log(`Username submitted: ${usernameInputValue}`);
            localStorage.setItem("username", usernameInputValue);
            window.location.href = 'chatapp.html'; // Redirect to index.html
        } else {
            alert("Please enter your username to proceed!");
        }
    });
});
