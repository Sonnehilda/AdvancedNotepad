const createNoteForm = document.querySelector("#create-note")
const createNoteInput = document.querySelector("#create-note input")
const noteList = document.querySelector("#note-list")

const pageCurrentDisplay = document.querySelector("#pageCurrent-display")
const pageTotalDisplay = document.querySelector("#pageTotal-display")
const pageDecoDisplay = document.querySelector("#pageDeco-display")
const pageStart = document.querySelector("#arrow-toStart")
const pageEnd = document.querySelector("#arrow-toEnd")
const pageNext = document.querySelector("#arrow-right")
const pagePrev = document.querySelector("#arrow-left")

const searchInput = document.querySelector("#search-input")

const NOTE_KEY = "notes"
const NOTES_PER_PAGE = 7

let notes = []
let savedNotepads = localStorage.getItem(NOTE_KEY)

if(savedNotepads !== null) {
    const parsedNotepads = JSON.parse(savedNotepads)
    notes = parsedNotepads
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
        document.activeElement.click()
    }
}, false);

function onSubmitNote(event) {
    event.preventDefault()
    if (searchInput.value)
    {
        searchInput.value = ""
        updatePageDisplay()
    }

    const noteName = createNoteInput.value
    createNoteInput.value = ""

    const current = new Date()
    const years = String(current.getFullYear()).padStart(2, "0")
    const month = String(current.getMonth()).padStart(2, "0")
    const date = String(current.getDate()).padStart(2, "0")

    const noteObj = {
        name: `${localStorage.getItem("username")}`,
        title: noteName,
        id: Date.now(),
        when: `${month} ${date}, ${years}`,
        text: "",
    }

    notes.unshift(noteObj)
    saveNotes()

    if (noteList.childElementCount < NOTES_PER_PAGE) drawNotepad(noteObj, (NOTES_PER_PAGE-noteList.childElementCount)-1)
    else updatePageDisplay()
}

function drawNotepad(noteObj, index) {
    const li = document.createElement("li")
    li.id = noteObj.id

    const title = document.createElement("a")
    title.tabIndex = 2+index
    title.innerText = noteObj.title
    title.setAttribute("onclick", `openNote(${li.id})`)
    li.appendChild(title)

    const date = document.createElement("span")
    date.innerText = noteObj.when
    date.id = "date"
    li.appendChild(date)

    noteList.insertBefore(li, noteList.firstChild)
}

function saveNotes() {
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes))
    savedNotepads = localStorage.getItem(NOTE_KEY)
}

createNoteForm.addEventListener("submit", onSubmitNote)

let pageCurrent = 1, pageTotal, temp = -1, condition = 0

function updatePageDisplay() {
    if(savedNotepads !== null) {
        noteList.innerHTML = ''

        const parsedNotepads = JSON.parse(savedNotepads)
        let filtered = parsedNotepads.filter(item => item.name === localStorage.getItem("username"))
        if (searchInput.value !== "") filtered = filtered.filter(item => item.title.includes(searchInput.value))

        if (temp !== -1) temp = pageTotal
        pageTotal = Math.floor((filtered.length-1)/NOTES_PER_PAGE)+1
        if (temp !== -1 && (temp == undefined && pageTotal !== undefined)) condition = 1

        for (let i = 0; i < NOTES_PER_PAGE; i++)
        {
            if (filtered[(((pageCurrent)*NOTES_PER_PAGE)-1)-i] === undefined) continue
            drawNotepad(filtered[(((pageCurrent)*NOTES_PER_PAGE)-1)-i], (((pageCurrent*NOTES_PER_PAGE-i)-1)+NOTES_PER_PAGE)-1)
        }

        updatePageCurrentDisplay(pageCurrent)
        updatePageTotalDisplay(pageTotal)

        if (((temp !== pageTotal && temp !== undefined) || condition === 1) && temp !== -1) 
        {
            updateColorDisplay(pageTotalDisplay)
            condition = 0
        } else if (temp === -1) temp = pageTotal
    }

    updatePageCurrentDisplay(pageCurrent)
    updatePageTotalDisplay(pageTotal)
}

function updatePageCurrentDisplay(pageCurrent) {
    pageCurrentDisplay.innerText = `${pageCurrent}`
}

function updatePageTotalDisplay(pageTotal) {
    if (pageTotal > 1)
    {
        pageDecoDisplay.style.display = "inline-flex"
        pageTotalDisplay.style.display = "inline-flex"
        pageTotalDisplay.innerText = `${pageTotal}`
    }
    else
    {
        pageDecoDisplay.style.display = "none"
        pageTotalDisplay.style.display = "none"
    }
}

function updateColorDisplay(pageDisplay)
{
    pageDisplay.classList.remove("updated")
    setTimeout(function() {
        pageDisplay.classList.add("updated")
    }, 1)
}

function gotoNext() {
    if (pageCurrent < pageTotal)
    {
        pageCurrent++
        updatePageDisplay()
        updateColorDisplay(pageCurrentDisplay)
    }
}

function gotoPrev() {
    if (pageCurrent > 1)
    {
        pageCurrent--
        updatePageDisplay()
        updateColorDisplay(pageCurrentDisplay)
    }
}

function gotoStart() {
    pageCurrent = 1
    updatePageDisplay()
    updateColorDisplay(pageCurrentDisplay)
}

function gotoEnd() {
    pageCurrent = pageTotal ? pageTotal : 1
    updatePageDisplay()
    updateColorDisplay(pageCurrentDisplay)
}

function searchPageUpdate() {
    pageCurrent = 1
    updatePageDisplay()
}

pageNext.addEventListener("click", gotoNext)
pagePrev.addEventListener("click", gotoPrev)

pageStart.addEventListener("click", gotoStart)
pageEnd.addEventListener("click", gotoEnd)

searchInput.addEventListener("keyup", updatePageDisplay)
searchInput.addEventListener("keyup", searchPageUpdate)

function openNote(id) {
    localStorage.setItem("current", id)
    
    location.replace("note.html")
}