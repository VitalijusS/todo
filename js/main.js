const formDOM = document.forms[0];
const textInputDOM = document.querySelector('input');
const submitButtonDOM = document.querySelector('button');
const listDOM = document.querySelector('.list');
const toastDOM = document.querySelector('.toast');
const toastTitle = toastDOM.querySelector('.title')
const toastText = toastDOM.querySelector('.text')
const toastClose = toastDOM.querySelector('.close')


let todoData = [];
const localData = localStorage.getItem('tasks');
console.log(localData)
if (localData !== null) {
    todoData = JSON.parse(localData);
    renderTaskList();
}
toastClose.addEventListener('click', () => {
    toastDOM.classList.remove('active')
})

submitButtonDOM.addEventListener('click', event => {
    event.preventDefault();
    const validationText = isValidText(textInputDOM.value);
    if (validationText !== true) {
        showToastError(validationText);
    } else {
        todoData.push({
            text: textInputDOM.value.trim(),
            createdOn: Date.now(),
        });
        localStorage.setItem('tasks', JSON.stringify(todoData));
        renderList();
        showToastSuccess('Task was created');
    }
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
            showToastSuccess('Task is deleted')
        })
        buttonsDOM[3].addEventListener('click', () => {
            articleEditFormDOM.classList.remove('hidden')
        })
        buttonsDOM[1].addEventListener('click', () => {
            articleEditFormDOM.classList.add('hidden')
            updateInputDOM.value = '';
            showToastInfo('Task was not changed')
        })
        buttonsDOM[0].addEventListener('click', event => {
            event.preventDefault();
            const validationText = isValidText(updateInputDOM.value);
            if (validationText !== true) {
                showToastError(validationText)
                return;
            }
            todoData[i].text = updateInputDOM.value;
            renderTaskList();
            showToastSuccess('Task was changed')

        })
    }
    for (let i = 0; i < articlesDOM.length; i++) {
        const deleteDOM = articlesDOM[i].querySelectorAll('button')[2];
        deleteDOM.addEventListener('click', () => {
            articlesDOM[i].style.background = 'green';
            showToastInfo('Task is completed')
        })
    }
}
function formatTime(ms) {
    const d = new Date(ms);
    return `${d.getFullYear()}-${(d.getMonth() + 1 + '').padStart(2, '0')}-${d.getDate()} ${(d.getHours() + '').padStart(2, '0')}:${(d.getMinutes() + '').padStart(2, '0')}:${d.getSeconds()}`;
}
function isValidText(text) {
    if (typeof text !== 'string') {
        return "Needs to be text";
    }
    if (text === '') {
        return "Text can't be empty";
    }
    if (text.trim() === '') {
        return "Text can't contain only empty space";
    }
    if (text.trim()[0] !== text.trim()[0].toUpperCase()) {
        return "Text should start with upper case";
    }

    return true;
}
function showToast(type, title, text) {
    toastDOM.classList.add('active');
    toastTitle.textContent = title;
    toastDOM.dataset.state = type;
    toastText.textContent = text;
}
function showToastSuccess(text) {
    showToast('success', 'Success', text)
}
function showToastInfo(text) {
    showToast('info', 'Info', text)
}
function showToastError(text) {
    showToast('error', 'Error', text)
}
