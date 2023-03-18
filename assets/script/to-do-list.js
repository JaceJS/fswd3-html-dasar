const taskBox = document.querySelector('.task-box');
const addBtn = document.querySelector('.add');

taskBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    e.target.parentElement.previousElementSibling.classList.toggle('line-through');
  } else if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
  }
});
