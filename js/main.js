const formDOM = document.forms[0];
const textInputDOM = document.querySelector('input[type="text"]');
const colorInputDOM = document.querySelector('input[type="color"]');
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
            state: 'todo',
            color: colorInputDOM.value,
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
        <article class="item" data-state="${todo.state}" style="border-left-color:${todo.color}">
                <div class="text">${todo.text}</div>
                <div class="date">${formatTime(todo.createdOn)}</div>
                <div class="done">Done</div>
                <form class="hidden">
                    <input type="text" value="${todo.text}">
                    <button type="submit">Update</button>
                    <button type="button">Cancel</button>
                </form>
                <div class="action">
                    <button>Done</button>
                    <div class="diviter">|</div>
                    
                    ${todo.state === 'done' ? '' : `<button>Edit</button>`}
                    <button class="delete">Delete</button>
                </div>
            </article>
        `
    }
    listDOM.innerHTML = HTML;
    const articlesDOM = listDOM.querySelectorAll('article');

    for (let i = 0; i < articlesDOM.length; i++) {
        const articleDOM = articlesDOM[i];
        const articleEditFormDOM = articleDOM.querySelector('form')
        const updateInputDOM = articleDOM.querySelector('input');

        const deleteDOM = articlesDOM[i].querySelector('.delete')
        if (deleteDOM !== null) {

            deleteDOM.addEventListener('click', () => {
                todoData.splice(i, 1);
                renderList();
                localStorage.setItem('tasks', JSON.stringify(todoData));
                showToastSuccess('Task is deleted')
            })
        }

        const editDOM = articlesDOM[i].querySelectorAll('button')[3]
        if (editDOM !== null) {
            editDOM.addEventListener('click', () => {
                articleEditFormDOM.classList.remove('hidden')
            })

        }

        const canceleDOM = articlesDOM[i].querySelectorAll('button')[1]
        if (canceleDOM !== null) {
            canceleDOM.addEventListener('click', () => {
                articleEditFormDOM.classList.add('hidden')
                updateInputDOM.value = '';
                showToastInfo('Task was not changed')
            })
        }


        const changeDOM = articlesDOM[i].querySelectorAll('button')[0];
        if (changeDOM !== null) {
            changeDOM.addEventListener('click', event => {
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

        const doneDOM = articlesDOM[i].querySelectorAll('button')[2];
        if (doneDOM !== null) {

            doneDOM.addEventListener('click', () => {
                todoData[i].state = 'done';
                articlesDOM[i].classList.add('completed');
                localStorage.setItem('tasks', JSON.stringify(todoData));
                showToastInfo('Task is completed')
                renderTaskList();
            })
        }
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

const sortingListDOM = document.querySelector('.list-actions');
const sortingButtonsDOM = sortingListDOM.querySelectorAll('button');

const btnTime09DOM = sortingButtonsDOM[0];
btnTime09DOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnTime09DOM.classList.add('active');
    todoData.sort((a, b) => a.createdOn - b.createdOn);
    renderTaskList();
});

const btnTime90DOM = sortingButtonsDOM[1];
btnTime90DOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnTime90DOM.classList.add('active');
    todoData.sort((a, b) => b.createdOn - a.createdOn);
    renderTaskList();
});

const btnColorAZDOM = sortingButtonsDOM[2];
btnColorAZDOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnColorAZDOM.classList.add('active');
    todoData.sort((a, b) => a.color < b.color ? -1 : a.color === b.color ? 0 : 1);
    renderTaskList();
});

const btnColorZADOM = sortingButtonsDOM[3];
btnColorZADOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnColorZADOM.classList.add('active');
    todoData.sort((a, b) => a.color < b.color ? 1 : a.color === b.color ? 0 : -1);
    renderTaskList();
});

const btnNameAZDOM = sortingButtonsDOM[4];
btnNameAZDOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnNameAZDOM.classList.add('active');
    todoData.sort((a, b) => a.text < b.text ? -1 : a.text === b.text ? 0 : 1);
    renderTaskList();
});

const btnNameZADOM = sortingButtonsDOM[5];
btnNameZADOM.addEventListener('click', () => {
    sortingListDOM.querySelector('.active').classList.remove('active');
    btnNameZADOM.classList.add('active');
    todoData.sort((a, b) => a.text < b.text ? 1 : a.text === b.text ? 0 : -1);
    renderTaskList();
});

