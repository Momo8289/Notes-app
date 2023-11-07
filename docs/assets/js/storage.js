const getStorage = () => {
    return JSON.parse(localStorage.getItem("notes"))
}

const setStorage = (val) => {
    localStorage.setItem("notes", JSON.stringify(val))
}

const updateStorage = (key, val) => {
    let newStorage = getStorage()
    if(val === null || val === undefined) {
        delete newStorage[key]
    }
    else {
        newStorage[key] = val
    }
    setStorage(newStorage)
}

const getNotesStorage = () => {
    return getStorage()
}

const getNoteStorage = (id) => {
    return getStorage()[id]
}

const newNoteStorage = (title) => {
    let id = uuidv4()
    let note = {
        id: id,
        title: title,
        body: "",
        favourite: false,
        timestamp: new Date().toLocaleString()
    }
    updateStorage(id, note)
    return id
}

const isFavouriteStorage = (id) => {
    let note = getStorage()[id]
    return note ? note.favourite : false
}

const toggleFavouriteStorage = (id) => {
    let note = getStorage()[id]
    if(!note) {
        return false
    }
    note.favourite = !note.favourite
    updateStorage(id, note)
    return note.favourite
}

const updateNoteStorage = (id, text) => {
    let note = getNoteStorage(id)
    if(!note) {
        return false
    }
    note.body = text
    updateStorage(id, note)
    return true
}

const deleteNoteStorage = (id) => {
    updateStorage(id, null)
}

const getNotes = () => {
    return getNotesStorage()
}

const getNote = (id) => {
    return getNoteStorage(id)
}

const newNote = (title) => {
    return newNoteStorage(title)
}

const isFavourite = (id) => {
    return isFavouriteStorage(id)
}

const toggleFavourite = (id) => {
    return toggleFavouriteStorage(id)
}

const updateNote = (id, text) => {
    return updateNoteStorage(id, text)
}

const deleteNote = (id) => {
    return deleteNoteStorage(id)
}

if(!localStorage.getItem("notes")) {
    localStorage.setItem("notes", "{}")
}