'use strict';

// read existing todos from local storage
const getSavedToDos = function () {
  const notesJSON = localStorage.getItem('toDos');

  try {
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// add to do to local storage
const storeInput = function (input) {
  toDos.push({
    id: uuidv4(),
    text: input.value,
    completed: false,
  });
  localStorage.setItem('toDos', JSON.stringify(toDos));
};

const saveAndRender = function (toDos) {
  // save todos
  localStorage.setItem('toDos', JSON.stringify(toDos));
  // rerender
  renderTodos(toDos, filters);
};

const createHTML = function (todos) {
  const newParagraph = document.createElement('div');
  newParagraph.className = 'listItem';
  newParagraph.dataset.id = todos.id;
  const markup = `
        <i class="todoBoxWrapper material-icons md-light md-18 ${
          todos.completed ? 'completed' : ''
        }">done
            <input type="checkbox" class="todoBox" ${
              todos.completed ? 'checked' : ''
            }/> 
        </i>
        <span>${todos.text}</span>
        <i class='remove material-icons md-light md-18'>remove_circle_outline</button>
    `;
  newParagraph.innerHTML = markup;
  return newParagraph;
};

// render to do to dom
const addHTML = function (filteredTodos, incompleteTodos) {
  // render summary
  const summary = document.createElement('h2');
  summary.textContent = `${incompleteTodos.length} todos left to do`;
  document.querySelector('#toDosList').appendChild(summary);

  // render each to do
  filteredTodos.forEach(function (todos) {
    let newItemHTML = createHTML(todos);
    document.querySelector('#toDosList').appendChild(newItemHTML);
  });
};

//
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector('#toDosList').innerHTML = '';
  addHTML(filteredTodos, incompleteTodos);
};
