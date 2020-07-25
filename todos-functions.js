// read existing todos from local storage
const getSavedToDos = function() {
    const notesJSON = localStorage.getItem('toDos');
    if (notesJSON !== null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }
};