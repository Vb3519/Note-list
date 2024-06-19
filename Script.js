/* ------------------------------------------------- Скрипты (общие) ------------------------------------------------- */    

let tasksContainer = document.querySelector('.tasks-container');
let tasks = Array.from( document.querySelectorAll('.task-body') ); // тут обязательно ставить точку ".task-body"

                            /* --- Функции --- */

// Удаление таска:
function deleteTask(event) {
    let target = event.target;

    if (target.className != 'task-close-btn') {
        return;
    }

    /* target.parentElement.style.display = 'none';  скрывает таск, но не удаляет из DOM */
    target.parentElement.remove();
};

// Добавление таска:
function addTask() {
    let inputField = document.getElementsByTagName('input')[0];
    let taskValue = inputField.value;    

    if (taskValue === '') {
        alert('Type your note please ^_^');
        return;
    };

    let newTaskBody = document.createElement('div');
    newTaskBody.setAttribute('class', 'task-body');
    newTaskBody.innerHTML = `
        <div class="task-text-and-date-container">
            <p class="task-text">${taskValue}</p>
        <div class="task-date">
            00:00
        </div>
        </div>
        <div class="task-importance" data-description="Select importance<br> of current Note">
            [&gt;]
        </div>
        <div class="task-close-btn" data-closeNote="Close current note">
            [X]
        </div>
    `;

    tasksContainer.append(newTaskBody);
    inputField.value = ''; // очистка поля input
}

// Отображение меню выбора важности таска:
function showNoteMenu(event) {
    let target = event.target;

    if ( target.classList != 'task-importance' ) {
        return;
    }

    let taskPriorityContainer = document.querySelector('.task-priority-container');
    taskPriorityContainer.style.visibility = 'visible';

    target.setAttribute('data-menu', 'menu-active'); // ошибка в этом атрибуте

    let priorityBtnListDisable = Array.from( document.querySelectorAll('.task-importance') );

        priorityBtnListDisable.forEach( (button) => { /* когда меню открыто - скрываю все кнопки выбора приоритета */
        button.setAttribute('class', 'task-importance-disabled');
    });

    let inputField = document.getElementsByTagName('input')[0]; /* когда меню открыто - поле добавления тасков неактивно*/
    inputField.disabled = true;

    /*let addTaskContainer = document.querySelectorAll('.add-task-container')[0];
    addTaskContainer.style.display = 'none';*/
}

// Закрытие меню выбора важности таска:
function closeNoteMenu(event) {
    let target = event.target;

    if (target.className !== 'close-priority-menu priority') {
        return;
    }

    target.parentElement.style.visibility = 'hidden';    

    let notePriorityBtn = document.querySelector('.task-importance-disabled[data-menu]');
    notePriorityBtn.setAttribute('class', 'task-importance');
    notePriorityBtn.removeAttribute('data-menu', 'menu-active'); // убираю дата-атрибут при закрытии меню

    let priorityBtnListEnable = Array.from( document.querySelectorAll('.task-importance-disabled') );

        priorityBtnListEnable.forEach( (button) => { /* когда меню закрывается - отрисовываю все кнопки выбора приоритета */
        button.setAttribute('class', 'task-importance');
    });

    let inputField = document.getElementsByTagName('input')[0]; /* когда меню закрывается - поле добавления тасков становится активным */
    inputField.disabled = false;

    /*let addTaskContainer = document.querySelectorAll('.add-task-container')[0];
    addTaskContainer.style.display = 'flex';*/
}

// Присвоение степени важности для заметки:
function setNotePriority(event) {
    let target = event.target;

    let notePriorityBtn = document.querySelector('.task-importance-disabled[data-menu]');    
    notePriorityBtn.setAttribute('class', 'task-importance');
    notePriorityBtn.removeAttribute('data-menu', 'menu-active'); // убираю дата-атрибут при закрытии меню / выборе приоритета

    noteMenu.style.visibility = 'hidden';

    let priorityBtnListEnable = Array.from( document.querySelectorAll('.task-importance-disabled') );

    priorityBtnListEnable.forEach( (button) => { /* когда меню закрывается - отрисовываю все кнопки выбора приоритета */
    button.setAttribute('class', 'task-importance');
    });


    let inputField = document.getElementsByTagName('input')[0]; /* когда меню закрывается - поле добавления тасков становится активным */
    inputField.disabled = false;

    if (target.className === 'priority orange') {
        notePriorityBtn.parentElement.style.background = '#c26a27';
    }

    if (target.className === 'priority blue') {
        notePriorityBtn.parentElement.style.background = '#5158b8';
    }

    if (target.className === 'priority green') {
        notePriorityBtn.parentElement.style.background = '#0a731c';
    }

    if (target.className === 'priority standard') {
        notePriorityBtn.parentElement.style.background = '#737874';
    }    
}

// Добавление обработчиков к заметкам:
function setEventListeners(note) {}; // не использовал эту функцию (не знаю как)


                            /* --- Обработчики событий --- */

// Удаление таска (обработчик):
tasksContainer.addEventListener( 'click', deleteTask );

// Добавление нового таска (обработчик):
const addTaskBtn = document.querySelector('.add-task-btn');
addTaskBtn.onclick = addTask; // указывай имена переменных, которые содержат функции без "()".

// Отображение меню выбора важности таска (обработчик):
tasksContainer.addEventListener( 'click', showNoteMenu );

// Закрытие меню выбора важности таска (обработчик):
let noteMenu = document.querySelector('.task-priority-container');
noteMenu.addEventListener('click', closeNoteMenu);

// Присвоение степени важности для заметки (обработчик):
noteMenu.addEventListener('click', setNotePriority);


 // --------------------- Тултип над / под элементом открытия меню (НАЧАЛО)---
 let tooltipElemImportance = document.querySelector('.tooltip-importance'); // в глобальной области видимости создан элемент

 tasksContainer.addEventListener('mouseover', function renderImportanceTooltip(event) {
     let target = event.target;
     // если нет описания - то "return"
     if ( !target.dataset.description ) {
         return;
     }

     tooltipElemImportance = document.createElement('div');
     tooltipElemImportance.setAttribute('class', 'tooltip-importance');
     tooltipElemImportance.innerHTML = target.dataset.description;

     document.body.append(tooltipElemImportance);

     let importanceBtnCoords = target.getBoundingClientRect(); // координаты кнопки выбора важности заметки
     // позиционирование по центру и слева:
     let left = importanceBtnCoords.left + (target.offsetWidth - tooltipElemImportance.offsetWidth) / 2;
     
     if (left < 0) { // тут не нужно это условие
         left = 0;
     }

     tooltipElemImportance.style.left = left + 'px';

     let top = importanceBtnCoords.top - tooltipElemImportance.offsetHeight - 5; // координаты Y эл-та кнопки - высота тултипа - 5px;

     if (top < 0) {
         top = importanceBtnCoords.top + target.offsetHeight + 5; /* не пойму относительно чего позиционируется подсказка
         (когда есть прокрутка в родительском элементе "tasksContainer"). Кнопка и window?, т.к. цепляю тултип к document.body, но обработчик на tasksContainer */
     }

     tooltipElemImportance.style.top = top + 'px';

 })

 tasksContainer.addEventListener('mouseout', function removeImportanceTooltip(event) {
     
     if(tooltipElemImportance) {
         tooltipElemImportance.remove();
         tooltipElemImportance = null;
     }
 })

// --------------------- Тултип над / под элементом открытия меню (КОНЕЦ)---


// --------------------- Тултип над / под элементом закрытия таска (НАЧАЛО)---
// Некорректно работает (подсказка не отображается под элементом, когда надо)

/*
let tooltipElemCloseNote = document.querySelector('.closeNote'); когда объявлена в глобальной области видимости - баг, может быть много тултипов.
Т.к. заметок тоже много.
*/

document.addEventListener('mouseover' , function renderCloseMenuTooltip(event) {
 let tooltipElemCloseNote = document.querySelector('.close-note')
 let target = event.target;

 if ( !target.dataset.closenote ) { // "closenote" с маленькой буквы пишется НЕ camelCase
     return;
 }

 tooltipElemCloseNote = document.createElement('div');
 tooltipElemCloseNote.setAttribute('class', 'close-note');
 tooltipElemCloseNote.innerHTML = target.dataset.closenote;

 document.body.append(tooltipElemCloseNote);

 let closeNoteBtnCoords = target.getBoundingClientRect();

 let left = closeNoteBtnCoords.left + (target.offsetWidth - tooltipElemCloseNote.offsetWidth) / 2;

 if (left < 0) { // тут не нужно это условие
         left = 0;
     }

 tooltipElemCloseNote.style.left = left + 'px';

 let top = closeNoteBtnCoords.top - tooltipElemCloseNote.offsetHeight - 5;

 if (top < 0) {
     top = closeNoteBtnCoords.top + target.offsetHeight + 5;
 }

 tooltipElemCloseNote.style.top = top + 'px';
})


document.addEventListener('mouseout', function removeCloseMenuTooltip(event) {
 let tooltipElemCloseNote = document.querySelector('.close-note')

 if (tooltipElemCloseNote) {
     tooltipElemCloseNote.remove()
     tooltipElemCloseNote = null;
 }
})

// --------------------- Тултип над / под элементом закрытия таска (КОНЕЦ)---
