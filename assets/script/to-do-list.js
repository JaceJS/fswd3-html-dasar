const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add');
const taskBox = document.querySelector('.task-box');

// menambahkan task baru setelah tekan tombol enter
taskInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let newText = `<div class="task-list py-2 px-3 flex justify-between bg-rose-600 rounded-full mb-2">
    <p class="task-desc">${taskInput.value}</p>
    <div class="task-desc-btn">
        <i class="done fa-solid fa-check mr-1.5 opacity-80 hover:opacity-100 cursor-pointer"></i>
        <i class="delete fa-solid fa-trash opacity-80 hover:opacity-100 cursor-pointer"></i>
    </div>
    </div>`;

    taskBox.insertAdjacentHTML('afterbegin', newText);

    taskInput.value = '';
    e.preventDefault();
  }
});

// menambahkan task baru setelah klik tombol tambah
addBtn.addEventListener('click', (e) => {
  let newText = `<div class="task-list py-2 px-3 flex justify-between bg-rose-600 rounded-full mb-2">
  <p class="task-desc">${taskInput.value}</p>
  <div class="task-desc-btn">
      <i class="done fa-solid fa-check mr-1.5 opacity-80 hover:opacity-100 cursor-pointer"></i>
      <i class="delete fa-solid fa-trash opacity-80 hover:opacity-100 cursor-pointer"></i>
  </div>
  </div>`;

  taskBox.insertAdjacentHTML('afterbegin', newText);

  taskInput.value = '';
  e.preventDefault();
});

// membuat done dan delete task
taskBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    e.target.parentElement.previousElementSibling.classList.toggle('line-through');
  } else if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
});
