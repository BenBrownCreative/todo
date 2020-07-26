const body = document.querySelector('body');

const filters = {
    searchText: '',
    hideCompleted: false
};

const toDos = getSavedToDos();


renderTodos(toDos, filters);

document.querySelector('#newTodoFilter').addEventListener('input', function(e) {
    filters.searchText = e.target.value;
    renderTodos(toDos, filters);
});

document.querySelector('#addToDoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = e.target.elements.newTodoInput;
    storeInput(input);
    input.value = '';
    renderTodos(toDos, filters);
});

document.querySelector('#hideCompleted').addEventListener('change', function(e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(toDos, filters);
});