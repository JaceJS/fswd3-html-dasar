const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add');
const taskBox = document.querySelector('.task-box');
let taskCompleted = document.querySelector('.task-completed');
let taskPending = document.querySelector('.task-pending');

// fungsi untuk membuat task list, bool untuk mengecek status task done/tidak (true/tidak)
let createList = (e, bool = false) => {
  // penambahan kelas jika task true
  let lineThrough, doneBgColor;
  let isDone = true;
  // jika isDone = true dan bool = true
  if (isDone == bool) {
    lineThrough = 'line-through';
    doneBgColor = 'bg-lime-700';
  }

  let newText = `<div class="task-list py-2 px-3 flex justify-between bg-rose-600 rounded-full mb-2 ${doneBgColor}">
    <p class="task-desc ${lineThrough}">${e}</p>
    <div class="task-desc-btn">
        <i class="done fa-solid fa-check mr-1.5 opacity-80 hover:opacity-100 cursor-pointer"></i>
        <i class="delete fa-solid fa-trash opacity-80 hover:opacity-100 cursor-pointer"></i>
    </div>
    </div>`;
  taskBox.insertAdjacentHTML('afterbegin', newText);
};

// fungsi untuk mengecek status pending dan complete
let taskStatus = () => {
  taskTodos = JSON.parse(localStorage.getItem(TODO_STORAGE));

  let completed = 0,
    pending = 0;
  // loop untuk menghitung task pending dan completed
  for (let key in taskTodos) {
    if (taskTodos[key] == true) {
      completed++;
    } else {
      pending++;
    }
  }

  taskPending.innerHTML = pending;
  taskCompleted.innerHTML = completed;
};

// ==============================
//         LOCAL STORAGE
// ==============================

// pembuatan key dan value untuk localstorage
let taskTodos = {}; // value dgn tipe data object
const TODO_STORAGE = 'TODO_STORAGE'; // nama key

// membaca data local storage ketika halaman di load
if ((checkLocal = localStorage.getItem(TODO_STORAGE))) {
  // parse untuk mengubah JSON menjadi object
  taskTodos = JSON.parse(checkLocal);

  taskStatus();

  // loop isi object
  for (let key in taskTodos) {
    createList(key, taskTodos[key]);
  }
}

// fungsi tambah, update, dan hapus local storage
function syncLocalStorage(activity, item, bool = false) {
  switch (activity) {
    case 'ADD':
    case 'UPDATE':
      taskTodos[item] = bool;
      break;
    case 'DELETE':
      delete taskTodos[item];
      break;

    default:
      break;
  }

  // stringify utk mengubah nilai javascript menjadi JSON
  localStorage.setItem(TODO_STORAGE, JSON.stringify(taskTodos));

  taskStatus();
}

// ==============================
//    INTERAKSI TOMBOL-TOMBOL
// ==============================

// menambahkan task baru setelah tekan tombol enter
taskInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    createList(taskInput.value);

    syncLocalStorage('ADD', taskInput.value);

    taskInput.value = '';
    e.preventDefault();
  }
});

// menambahkan task baru setelah klik tombol tambah
addBtn.addEventListener('click', (e) => {
  createList(taskInput.value);

  syncLocalStorage('ADD', taskInput.value);

  taskInput.value = '';
  e.preventDefault();
});

// membuat done dan delete task
taskBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    let status = e.target.parentElement.previousElementSibling.classList.toggle('line-through');
    e.target.parentElement.parentElement.classList.toggle('bg-lime-700');

    syncLocalStorage('UPDATE', e.target.parentElement.previousElementSibling.innerText, status);
  } else if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();

    syncLocalStorage('DELETE', e.target.parentElement.previousElementSibling.innerText);
  }
});
