const body = document.querySelector('body');

const filters = {
    searchText: '',
    hideCompleted: false
};

let toDos = getSavedToDos();

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
document.getElementById('toDosList').addEventListener('click', function(e) {
    // check to see if its the remove button
    if (e.target.classList.contains('remove')) {
        const elemId = e.target.parentElement.dataset.id;
        // filter out the target by id 
        toDos = toDos.filter(x => x.id !== elemId);
        saveAndRender(toDos);
    }
    else if (e.target.classList.contains('todoBox')) {
        const elemId = e.target.parentElement.parentElement.dataset.id;
        let elem = toDos.find(x => x.id == elemId);
        elem.completed = e.target.checked;
        saveAndRender(toDos);
    }
    return
    
});