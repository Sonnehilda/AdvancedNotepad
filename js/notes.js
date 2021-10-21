const notepad = document.querySelector("#notepad")
const saveButton = document.querySelector("#save")
const closeButton = document.querySelector("#close")
const deleteButton = document.querySelector("#delete")
const body = document.querySelector("#notepad-contents")

const editButton = document.querySelector("#edit")
const changeTitleForm = document.querySelector("#change-title")
const changeTitleInput = document.querySelector("#change-title input")
const titleElement = document.querySelector("h3")

let parsedNotepads = JSON.parse(localStorage.getItem("notes"))

document.addEventListener("keydown", function(e) {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && (e.key === "s" || e.key === "S")) {
        e.preventDefault()
        saveNote()
    }
}, false);

function loadNote() {
    const id = parseInt(localStorage.getItem("current"))
    parsedNotepads = JSON.parse(localStorage.getItem("notes"))
    const filtered = parsedNotepads.filter(item => item.id === id)

    const titleElement = document.querySelector("h3")
    titleElement.innerText = filtered[0].title

    const dateElement = document.querySelector("h4")
    dateElement.innerText = filtered[0].when

    notepad.value = filtered[0].text
}

function saveNote()
{
    const id = parseInt(localStorage.getItem("current"))
    parsedNotepads = JSON.parse(localStorage.getItem("notes"))
    const objIndex = parsedNotepads.findIndex((obj => obj.id == id))
    parsedNotepads[objIndex].text = notepad.value
    localStorage.setItem("notes", JSON.stringify(parsedNotepads))
    updateColorNotepad()
}

function updateColorNotepad()
{
    notepad.classList.remove("updatedText")
    saveButton.classList.remove("updatedButton")
    setTimeout(function() {
        notepad.classList.add("updatedText")
        saveButton.classList.add("updatedButton")
    }, 1)
}

function deleteNote() {
    const id = parseInt(localStorage.getItem("current"))
    parsedNotepads = JSON.parse(localStorage.getItem("notes"))
    const filtered = parsedNotepads.filter(item => item.id !== id)
    localStorage.setItem("notes", JSON.stringify(filtered))
    gotoMenu()
}

function gotoMenu()
{
    location.replace("index.html")
}

saveButton.addEventListener("click", saveNote)
closeButton.addEventListener("click", gotoMenu)
deleteButton.addEventListener("click", deleteNote)

function editTitle() {
    editButton.classList.add("hidden")
    titleElement.classList.add("hidden")
    changeTitleInput.classList.remove("hidden")

    changeTitleInput.focus()
}

function updateTitle(event) {
    if(event) event.preventDefault()

    const changeTitleInput = document.querySelector("#change-title input")

    editButton.classList.remove("hidden")
    titleElement.classList.remove("hidden")
    changeTitleInput.classList.add("hidden")

    if (changeTitleInput.value !== "")
    {
        const id = parseInt(localStorage.getItem("current"))
        parsedNotepads = JSON.parse(localStorage.getItem("notes"))
        const objIndex = parsedNotepads.findIndex((obj => obj.id == id))

        parsedNotepads[objIndex].title = changeTitleInput.value
        titleElement.innerText = changeTitleInput.value

        localStorage.setItem("notes", JSON.stringify(parsedNotepads))
    }
}

editButton.addEventListener("click", editTitle)
changeTitleForm.addEventListener("submit", updateTitle)
changeTitleForm.addEventListener("focusout", updateTitle)