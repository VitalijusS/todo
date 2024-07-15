// const h1DOM = document.querySelector('h1');
// const formDOM = document.forms[0];
// const textImputDOM = document.querySelector('input');
// const submitButtonDOM = document.querySelector('button');
// const listDOM = document.querySelector('.list');
// const emptyDOM = document.querySelector('.empty');
// let listIndex = 0;

const formDOM = document.forms[0];
const textInputDOM = document.querySelector('input');
const submitButtonDOM = document.querySelector('button');
const listDOM = document.querySelector('.list');

const todoData = [];

// submitButtonDOM.addEventListener('click', event => {
//     event.preventDefault();
//     if (textImputDOM.value.trim() !== '') {
//         emptyDOM.style.display = "none";
//         const HTML = `
//         <article id="${listIndex}" class ="item">
//         <div class="text">${textImputDOM.value}</div>
//         <div class="action">
//         <button class="${listIndex} done">Done</button>
//         <div class="diviter">|</div>
//         <button class ="${listIndex} edit">Edit</button>
//         <button class="${listIndex} delete">Delete</button>
//         </div>
//         </article>
//         `;
//         listDOM.innerHTML += HTML;
//     }
//     listIndex++;
//     textImputDOM.value = '';
//     buttonDone();
//     buttonDelete();
//     buttonEdit();
// });
// function buttonDone() {
//     const btns = document.querySelectorAll('.done');
//     for (const btn of btns) {
//         btn.addEventListener('click', () => {
//             const index = parseInt(btn.className.split(' ')[0]);
//             document.getElementById(index).style.background = 'green';
//         })
//     }
// }
// function buttonEdit() {
//     const btns = document.querySelectorAll('.edit');
//     for (const btn of btns) {
//         btn.addEventListener('click', () => {
//             const index = parseInt(btn.className.split(' ')[0]);
//             document.getElementById(index).style.background = 'white';
//         })
//     }
// }
// function buttonDelete() {
//     const btns = document.querySelectorAll('.delete');
//     for (const btn of btns) {
//         btn.addEventListener('click', () => {
//             const index = parseInt(btn.className.split(' ')[0]);
//             document.getElementById(index).outerHTML = '';
//             if (document.querySelectorAll('.item').length === 0) {
//                 emptyDOM.style.display = "block";
//             }
//         })
//     }
// }


submitButtonDOM.addEventListener('click', event => {
    event.preventDefault();
    if (textInputDOM.value.length === 0) {
        return;
    }
    todoData.push({
        text: textInputDOM.value,
        createdOn: Date.now(),
    });
    renderList();
});
function renderList() {
    if (todoData.length === 0) {
        renderEmptyList();
    } else {
        renderTaskList();
    }
}
function renderEmptyList() {
    listDOM.textContent = "Empty";
    listDOM.classList.add('empty')

}
function renderTaskList() {
    listDOM.classList.remove('empty')
    let HTML = '';
    for (const todo of todoData) {
        HTML += `
        <article class="item">
                <div class="text">${todo.text}</div>
                <div class="date">${formatTime(todo.createdOn)}</div>
                <form class="hidden">
                    <input type="text">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="action">
                    <button>Done</button>
                    <div class="diviter">|</div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>
        `
    }
    listDOM.innerHTML = HTML;
    const articlesDOM = listDOM.querySelectorAll('article');

    for (let i = 0; i < articlesDOM.length; i++) {
        const articleDOM = articlesDOM[i];
        const articleEditFormDOM = articleDOM.querySelector('form')
        const buttonsDOM = articleDOM.querySelectorAll('button');
        const updateInputDOM = articleDOM.querySelector('input');
        buttonsDOM[4].addEventListener('click', () => {
            todoData.splice(i, 1);
            renderList();
        })
        buttonsDOM[3].addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden')
        })
        buttonsDOM[1].addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden')
            updateInputDOM.value = '';
        })
        buttonsDOM[0].addEventListener('click', event => {
            event.preventDefault();
            console.log(updateInputDOM.value);
            todoData[i] = updateInputDOM.value;
            renderTaskList();
        })
    }
    for (let i = 0; i < articlesDOM.length; i++) {
        const deleteDOM = articlesDOM[i].querySelectorAll('button')[2];
        deleteDOM.addEventListener('click', () => {
            articlesDOM[i].style.background = 'green';
        })
    }
}
function formatTime(ms) {
    const d = new Date(ms);
    return `${d.getFullYear()}-${(d.getMonth() + 1 + '').padStart(2, '0')}-
    ${d.getDate()} ${(d.getHours() + '').padStart(2, '0')}:${(d.getMinutes() + '').padStart(2, '0')}:${d.getSeconds()}`;
}