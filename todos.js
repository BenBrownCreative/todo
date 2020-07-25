const body = document.querySelector('body');

const filters = {
    searchText: '',
    hideCompleted: false
};

let toDos = getSavedToDos();

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

    const summary = document.createElement('h2');
    summary.textContent = `you have ${incompleteTodos.length} todos left to do`;
    document.querySelector('#toDosList').appendChild(summary);

    filteredTodos.forEach(function (todos) {
        let newParagraph = document.createElement('p');
        newParagraph.textContent = (todos.text);
        document.querySelector('#toDosList').appendChild(newParagraph);
    });
    
}
renderTodos(toDos, filters);

document.querySelector('#newTodoFilter').addEventListener('input', function(e) {
    filters.searchText = e.target.value;
    renderTodos(toDos, filters);
});

document.querySelector('#addToDoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = e.target.elements.newTodoInput;
    toDos.push({
        text: input.value,
        completed: false
    });
    localStorage.setItem('toDos', JSON.stringify(toDos));

    input.value = '';

    renderTodos(toDos, filters);
});

document.querySelector('#hideCompleted').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(toDos, filters);
});