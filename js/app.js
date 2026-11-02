(function () {
  let form = document.getElementById('todo-form');
  let input = document.getElementById('todo-input');
  let list = document.getElementById('todo-list');
  let errorMsg = document.getElementById('error-msg');
  let counter = document.getElementById('counter');
  let currentFilter = 'all';

  function updateCounter() {
    let left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + (left === 1 ? ' item left' : ' items left');
  }

  function applyFilter() {
    list.querySelectorAll('li').forEach(function (item) {
      let isDone = item.classList.contains('completed');
      let show =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !isDone) ||
        (currentFilter === 'done' && isDone);
      // Inline style: "#todo-list li" in the CSS is more specific than ".hidden".
      item.style.display = show ? '' : 'none';
    });
  }

  function createItem(text) {
    let item = document.createElement('li');

    let label = document.createElement('span');
    label.className = 'item-text';
    label.textContent = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    item.appendChild(label);
    item.appendChild(deleteBtn);
    return item;
  }

  function handleAdd(event) {
    event.preventDefault();

    if (input.value === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');
    list.appendChild(createItem(input.value));
    applyFilter();
    updateCounter();
  }

  // The Add button and the Enter key both submit the form.
  form.addEventListener('submit', handleAdd);

  // Event delegation: one listener handles every item.
  list.addEventListener('click', function (event) {
    let item = event.target.closest('li');
    if (!item) {
      return;
    }

    if (event.target.closest('.delete-btn')) {
      item.remove();
    } else {
      item.classList.toggle('completed');
    }
    applyFilter();
    updateCounter();
  });

  function setFilter(name) {
    currentFilter = name;
    applyFilter();
  }

  document.getElementById('filter-all').addEventListener('click', function () {
    setFilter('all');
  });
  document.getElementById('filter-active').addEventListener('click', function () {
    setFilter('active');
  });
  document.getElementById('filter-done').addEventListener('click', function () {
    setFilter('done');
  });
})();
