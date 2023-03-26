const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add');
const taskBox = document.querySelector('.task-box');
let taskCompleted = document.querySelector('.task-completed');
let taskPending = document.querySelector('.task-pending');

// fungsi untuk membuat task list, bool untuk mengecek status task done/tidak (true/tidak)
const createList = (inputValue, bool = false) => {
  // penambahan kelas jika task true
  let lineThrough, doneBgColor;
  const checkisDone = true;
  // jika isDone = true dan bool = true
  if (checkisDone == bool) {
    lineThrough = 'line-through';
    doneBgColor = 'bg-lime-700';
  }

  let newText = `<div class="task-list py-2 px-3 flex justify-between bg-rose-600 rounded-full mb-2 ${doneBgColor}">
    <p class="task-desc ${lineThrough}">${inputValue}</p>
    <div class="task-desc-btn">
        <i class="done fa-solid fa-check mr-1.5 opacity-80 hover:opacity-100 cursor-pointer"></i>
        <i class="delete fa-solid fa-trash opacity-80 hover:opacity-100 cursor-pointer"></i>
    </div>
    </div>`;
  taskBox.insertAdjacentHTML('afterbegin', newText);
};

// pembuatan variabel dgn tipe data object untuk menampung nilai input
let taskTodosAPI = {};
let taskTodosLocalStorage = {};

// ==============================
//    API dengan crudcrud.com
// ==============================

// base url => alamat web
// endpoint => alamat lokasi file/ resource/ data
const baseUrl = 'https://crudcrud.com/api/';
const apiKey = '447df10fd40a43c2bcd69a087604131a';
const url = baseUrl + apiKey;
const endPointTodos = `${url}/todos`;

// mengecek data di API, kemudian membuat list sesuai dengan data yang ada
const checkTodosTask = () => {
  fetch(endPointTodos)
    .then((response) => response.json())
    .then((data) => {
      for (const value of data) {
        createList(value.task, value.isDone);
      }
    });
};

checkTodosTask();

// fungsi untuk mengecek status pending dan complete untuk API
const taskStatusAPI = () => {
  let completed = 0,
    pending = 0;
  fetch(endPointTodos)
    .then((response) => response.json())
    .then((data) => {
      for (const value of data) {
        if (value.isDone == true) {
          completed++;
        } else {
          pending++;
        }
      }
      taskCompleted.innerHTML = completed;
      taskPending.innerHTML = pending;
    });
};

const postTodosTask = (value, bool = false) => {
  taskTodosAPI.task = value;
  taskTodosAPI.isDone = bool;
  fetch(endPointTodos, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskTodosAPI),
  })
    .then((result) => console.log('Berhasil di POST' + result.json()))
    .catch((error) => console.log(error));
};

const putTodosTask = (value, bool) => {
  fetch(endPointTodos)
    .then((response) => response.json())
    .then((data) => {
      const taskData = data.find((e) => e.task === value);
      taskTodosAPI.task = value;
      taskTodosAPI.isDone = bool;
      fetch(`${endPointTodos}/${taskData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskTodosAPI),
      })
        .then((result) => console.log('Berhasil di PUT' + result.json()))
        .catch((error) => console.log('terjadi error' + error));
    });
};

const deleteTodosTask = (value) => {
  fetch(endPointTodos)
    .then((response) => response.json())
    .then((data) => {
      const taskData = data.find((e) => e.task === value);
      fetch(`${endPointTodos}/${taskData._id}`, {
        method: 'DELETE',
      })
        .then((result) => console.log('Berhasil di DELETE' + result.json()))
        .catch((error) => console.log(error));
    });
};

// ==============================
//         LOCAL STORAGE
// ==============================

const TODO_STORAGE = 'TODO_STORAGE';

// fungsi untuk mengecek status pending dan complete untuk local storage
const taskStatusLocalStorage = () => {
  taskTodosLocalStorage = JSON.parse(localStorage.getItem(TODO_STORAGE));

  let completed = 0,
    pending = 0;

  // loop untuk menghitung task pending dan completed
  for (let value in taskTodosLocalStorage) {
    if (taskTodosLocalStorage[value] == true) {
      completed++;
    } else {
      pending++;
    }
  }

  taskPending.innerHTML = pending;
  taskCompleted.innerHTML = completed;
};

// mengecek status pending dan complete local storage ketika halaman di load
if (localStorage.getItem(TODO_STORAGE)) {
  taskStatusLocalStorage();
}

// fungsi tambah, update, dan hapus local storage
const syncLocalStorage = (activity, value, bool = false) => {
  switch (activity) {
    case 'ADD':
    case 'UPDATE':
      taskTodosLocalStorage[value] = bool;
      break;
    case 'DELETE':
      delete taskTodosLocalStorage[value];
      break;

    default:
      break;
  }

  // stringify utk mengubah nilai javascript menjadi JSON
  localStorage.setItem(TODO_STORAGE, JSON.stringify(taskTodosLocalStorage));

  taskStatusLocalStorage();
};

// ==============================
//    INTERAKSI TOMBOL-TOMBOL
// ==============================

// menambahkan task baru setelah tekan tombol enter
taskInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    createList(taskInput.value);

    postTodosTask(taskInput.value);
    syncLocalStorage('ADD', taskInput.value);

    taskInput.value = '';
    e.preventDefault();
  }
});

// menambahkan task baru setelah klik tombol tambah
addBtn.addEventListener('click', (e) => {
  createList(taskInput.value);

  postTodosTask(taskInput.value);
  syncLocalStorage('ADD', taskInput.value);

  taskInput.value = '';
  e.preventDefault();
});

// membuat done dan delete task
taskBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    let status = e.target.parentElement.previousElementSibling.classList.toggle('line-through');
    e.target.parentElement.parentElement.classList.toggle('bg-lime-700');

    putTodosTask(e.target.parentElement.previousElementSibling.innerText, status);
    syncLocalStorage('UPDATE', e.target.parentElement.previousElementSibling.innerText, status);
  } else if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();

    deleteTodosTask(e.target.parentElement.previousElementSibling.innerText);
    syncLocalStorage('DELETE', e.target.parentElement.previousElementSibling.innerText);
  }
});
