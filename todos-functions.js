// read existing todos from local storage
const getSavedToDos = function() {
    const notesJSON = localStorage.getItem('toDos');
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
};

// add to do to local storage
const storeInput = function(input) {
    toDos.push({
        text: input.value,
        completed: false
    });
    localStorage.setItem('toDos', JSON.stringify(toDos));
};

// render to do to dom
const addHTML = function(filteredTodos, incompleteTodos) {
    // render summary
    const summary = document.createElement('h2');
    summary.textContent = `you have ${incompleteTodos.length} todos left to do`;
    document.querySelector('#toDosList').appendChild(summary);

    // render each to do
    filteredTodos.forEach(function (todos) {
        let newParagraph = document.createElement('p');
        newParagraph.textContent = (todos.text);
        document.querySelector('#toDosList').appendChild(newParagraph);
    });
}

// 
const renderTodos = function(todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });
    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed;
    });

    document.querySelector('#toDosList').innerHTML = '';
    addHTML(filteredTodos, incompleteTodos); 
};


