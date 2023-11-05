const regexes = {
    bold: {
        pattern: /\*\*([^\*\*]*)\*\*/g,
        toStrip: "**",
        replace: ["<b>", "</b>"]
    },
    italic: {
        pattern: /\_\_([^\_]*)\_\_/g,
        toStrip: "__",
        replace: ["<span style=\"font-style:italic;\">", "</span>"]
    }
}


const noteId = new URLSearchParams(window.location.search).get("id")
const note = getNote(noteId)
if(!note) {
    window.location.replace("/")
}
let editing = false
let noteContent = note.body
let isPostFavourite = note.favourite


const editButton = $("#editButton")
const saveButton = $("#saveButton")
const deleteButton = $("#deleteButton")
const noteBody = $("#noteBody")
const noteExpandingArea = $("#noteExpandingArea")
const noteTextArea = $("#noteTextArea")
const favouriteButton = $("#favouriteButton")


editButton.on("click", () => {
    noteTextArea.val(noteContent || noteBody.text())
    editButton.hide()
    noteBody.hide()
    saveButton.show()
    noteTextArea.val()
    noteExpandingArea.show()
    let event = document.createEvent("HTMLEvents")
    event.initEvent("input")
    document.querySelector(".expandingArea textarea").dispatchEvent(event)
})

saveButton.on("click", (event) => {
    noteContent = noteTextArea.val()
    updateNote(noteId, noteContent)
    noteBody.html(processText(noteContent))
    editButton.show()
    saveButton.hide()
    noteBody.show()
    noteExpandingArea.hide()
})

favouriteButton.on("click", () => {
    isPostFavourite = toggleFavourite(noteId)
    setFavButtonState(isPostFavourite)
})

deleteButton.on("click", () => {
    if(!confirm("Are you sure you want to delete this note? This cannot be undone.")) {
        return
    }
    deleteNote(noteId)
    window.location.href = "/"
    
})

$("#noteTitle").text(note.title)
$("#noteTimestamp").text(`Created ${note.timestamp}`)
noteBody.html(processText(note.body))
setFavButtonState(note.favourite)


