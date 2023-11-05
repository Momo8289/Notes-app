const template = '\
<div class="noteHeader"> \
    <div> \
        <h1 class="noteTitle">{{title}}</h1> \
        <p class="timestamp">Created {{timestamp}}</p> \
    </div> \
    <div class="btn-group" role="group"><button _noteId="{{id}}" id="{{id}}-favourite" class="favBtn btn btn-primary actionBtn" type="button"><i id="{{id}}-activeStarIcon" class="fas fa-star text-warning" style="display: none;"></i><i id="{{id}}-starIcon" class="far fa-star"></i></button><button _noteId="{{id}}" id="{{id}}-edit" class="editBtn btn btn-primary actionBtn" type="button"><i class="far fa-edit"></i></button><button _noteId="{{id}}" id="{{id}}-delete" class="delBtn btn btn-primary actionBtn" type="button"><i class="fas fa-trash"></i></button></div> \
</div> \
<hr /> \
<div class="fadeOut"> \
    <div class="noteBody">{{body}}</div> \
</div>'

const extractNoteId = (text) => {
    let id = text.split("-")
    id.pop()
    return id.join("-")
} 

let currentNotes
let currentQueryAction
const queryInput = document.getElementById("queryInput")
const queryButton = document.getElementById("queryActionButton")

let queryAction
const queryActions = {
    search: {
        class: "fas fa-search",
        placeholder: "Search",
        action: (value) => {
            refreshNotes()
        }
    },
    new: {
        class: "fas fa-plus",
        placeholder: "Note title",
        action: (value) => {
            if(!value) return
            let id = newNote(value)
            updateNote(id, "Write your note here")
            window.location.href = `/note.html?id=${id}`
        }
    }
}

queryButton.addEventListener("click", () => {
    let queryVal = queryInput.value
    queryAction(queryVal)
})

queryInput.addEventListener("input", (event) => {
    console.log("input fired ", queryInput.value)
    if(currentQueryAction === "search") {
        refreshNotes(false)
    }
})

queryInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        queryButton.click()
    }
    else if(event.key === "Backspace") {
        if(currentQueryAction === "search") {
            refreshNotes(false)
        }
    }
})

const sortNotesByDate = (notes, desc=true) => {
    const dateSortFunc = (a, b) => {
        return new Date(a.timestamp) < new Date(b.timestamp) ? -1 : 1
    }
    notes.sort(dateSortFunc)
    if(desc) notes.reverse()
    return notes
}

const changeQueryAction = (action) => {
    const buttonIcon = document.getElementById("queryButtonIcon")
    let a = queryActions[action]
    buttonIcon.className = a.class
    queryInput.placeholder = a.placeholder
    queryInput.value = ""
    queryAction = a.action
    currentQueryAction = action
}

const clearQueryInput = () => {
    queryInput.value = ""
    refreshNotes()
}

const constructNote = (note) => {
    const noteCard = document.createElement("div")
    noteCard.className = "note"
    noteCard.innerHTML = template.replaceAll("{{title}}", note.title)
        .replaceAll("{{timestamp}}", note.timestamp)
        .replaceAll("{{body}}", processText(note.body))
        .replaceAll("{{id}}", note.id)
    return noteCard
}

const refreshNotes = (reload=true) => {
    const notesContainer = document.getElementById("notesContainer")
    notesContainer.innerText = ""
    let notes = reload ? getNotes() : currentNotes
    currentNotes = notes
    const frag = document.createDocumentFragment()
    let searchQuery = currentQueryAction === "search" ? queryInput.value : null
    let orderedNotes = orderNotes(notes, searchQuery)
    for(const note of orderedNotes) {
        frag.append(constructNote(note))
    }
    notesContainer.append(frag)
    for(const element of document.querySelectorAll(".editBtn")) {
        element.addEventListener("click", () => {
            id = extractNoteId(element.id)
            window.location.href = `/note.html?id=${id}`
        })
    }
    
    for(const element of document.querySelectorAll(".favBtn")) {
        let id = extractNoteId(element.id)
        element.addEventListener("click", () => {
            setFavButtonState(toggleFavourite(id), id)
            refreshNotes()
        })
        setFavButtonState(isFavourite(id), id)
    }

    for(const element of document.querySelectorAll(".delBtn")) {
        let id = extractNoteId(element.id)
        element.addEventListener("click", () => {
            if(!confirm("Are you sure you want to delete this note? This cannot be undone.")) {
                return
            }
            deleteNote(id)
            refreshNotes()
        })
        setFavButtonState(isFavourite(id), id)
    }
}


const orderNotes = (notes, searchQuery=null, searchField="title") => {
    let priority = []
    let other = []

    if(searchQuery) {
        for(const id in notes) {
            const note = notes[id]
            if(note[searchField].includes(searchQuery)) {
                if(note.favourite) priority.push(note)
                else other.push(note)
            }
        }
        return [...priority, ...other]
    }

    for(const id in notes) {
        let note = notes[id]
        if(note.favourite) {
            priority.push(note)
        }
        else {
            other.push(note)
        }
    }
    sortNotesByDate(priority)
    sortNotesByDate(other)
    return [...priority, ...other]
}

refreshNotes()
changeQueryAction("new")