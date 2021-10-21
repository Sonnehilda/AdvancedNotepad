const logOutButton = document.querySelector("i")
const aboutSpan = document.querySelector("#about")
const noteSpan = document.querySelector("#note")

function logOut() {
    localStorage.removeItem("username")
    location.replace("index.html")
}
function gotoAbout() {
    location.replace("about.html")
}
function gotoNote() {
    location.replace("index.html")
}

aboutSpan.addEventListener("click", gotoAbout)
noteSpan.addEventListener("click", gotoNote)

function loadLogOutButton() {
    if (localStorage.getItem("username") !== null) {
        logOutButton.classList.remove("hidden")
        logOutButton.addEventListener("click", logOut)
    }
}