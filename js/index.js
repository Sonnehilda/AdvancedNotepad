const clock = document.querySelector("#clock")

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting")
const notepads = document.querySelector("#notepads")

const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"

function updateClock() {
    const date = new Date()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    clock.innerText = `${hours}:${minutes}:${seconds}`
}

updateClock()
setInterval(() => {
    updateClock()
}, 1000);

function onSubmit(event) {
    event.preventDefault()
    const username = loginInput.value
    localStorage.setItem(USERNAME_KEY, username)
    drawGreeting(username)
    notepads.classList.remove(HIDDEN_CLASSNAME)
}

function drawGreeting(username) {
    greeting.innerText = `WELCOME, ${username.toUpperCase()}`
    greeting.classList.remove(HIDDEN_CLASSNAME)
    loginForm.classList.add(HIDDEN_CLASSNAME)
    updatePageDisplay()
    loadLogOutButton()
}

const savedUsername = localStorage.getItem(USERNAME_KEY)

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", onSubmit)
} else {
    drawGreeting(savedUsername)
    notepads.classList.remove(HIDDEN_CLASSNAME)
}