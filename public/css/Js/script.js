document.getElementById("logonForm").addEventListener("submit", function(event) {
    event.preventDefault()

    var username = document.getElementById("username").value

    if (username === "admin") {
        document.getElementById("message").textContent = "Logon successful!"
        document.getElementById("message").style.color = "green"
    } else {
        document.getElementById("message").textContent = "Invalid username."
    }
})