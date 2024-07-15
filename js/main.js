const h1DOM = document.querySelector('h1');
const formDOM = document.forms[0];
const textImputDOM = document.querySelector('input');
const submitButtonDOM = document.querySelector('button');
const listDOM = document.querySelectorAll('.list')[1];
const emptyDOM = document.querySelector('.empty');
let listIndex = 0;

const todoData = [];

submitButtonDOM.addEventListener('click', event => {
    event.preventDefault();
    if (textImputDOM.value.trim() !== '') {
        emptyDOM.style.display = "none";
        const HTML = `
        <article id="${listIndex}" class ="item">
        <div class="text">${textImputDOM.value}</div>
        <div class="action">
        <button class="${listIndex} done">Done</button>
        <div class="diviter">|</div>
        <button class ="${listIndex} edit">Edit</button>
        <button class="${listIndex} delete">Delete</button>
        </div>
        </article>
        `;
        listDOM.innerHTML += HTML;
    }
    listIndex++;
    textImputDOM.value = '';
    buttonDone();
    buttonDelete();
    buttonEdit();
});
function buttonDone() {
    const btns = document.querySelectorAll('.done');
    for (const btn of btns) {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.className.split(' ')[0]);
            document.getElementById(index).style.background = 'green';
        })
    }
}
function buttonEdit() {
    const btns = document.querySelectorAll('.edit');
    for (const btn of btns) {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.className.split(' ')[0]);
            document.getElementById(index).style.background = 'white';
        })
    }
}
function buttonDelete() {
    const btns = document.querySelectorAll('.delete');
    for (const btn of btns) {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.className.split(' ')[0]);
            document.getElementById(index).outerHTML = '';
            if (document.querySelectorAll('.item').length === 0) {
                emptyDOM.style.display = "block";
            }
        })
    }
}


// submitButtonDOM.addEventListener('click', event => {
//     event.preventDefault();
//     if (textImputDOM.value.length === 0) {
//         return;
//     }
//     todoData.push(textImputDOM.value);
//     renderList();
// });
// function renderList() {
//     if (todoData.length === 0) {
//         renderEmptyList();
//     } else {
//         renderTaskList();
//     }
// }
// function renderEmptyList() {
//     listDOM.textContent = "Empty";
// }
// function renderTaskList() {
//     for (const todo of todoData) {
//         HTML += `
//         <article class="item">
//                 <div class="text">${todo}</div>
//                 <div class="action">
//                     <button>Done</button>
//                     <div class="diviter">|</div>
//                     <button>Edit</button>
//                     <button>Delete</button>
//                 </div>
//             </article>
//         `
//     }
//     listDOM.innerHTML = HTML;
// }