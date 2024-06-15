/* ------------------------------------------------- Скрипты (общие) ------------------------------------------------- */    
    
let tasksContainer = document.querySelector('.tasksContainer');
    
// удаление таска (обработчик):
tasksContainer.addEventListener('click', function deleteTask(event) {
let target = event.target;

if (target.classList != 'taskCloseBtn') {        
    return;
}

/* target.parentElement.style.display = 'none';  скрывает таск, но не удаляет из DOM */
target.parentElement.remove();
})

// добавление нового таска (обработчик):
const inputField = document.querySelector('input');
const addTaskBtn = document.querySelector('.addTaskBtn');

addTaskBtn.onclick = function addTask() {
    let taskValue = inputField.value;

    if (taskValue === '') { // если поле "input" пустое, то обработчик не срабатывает (достаточно обычного или строгого сравнения? "==" или "===")
        alert('Type your note please ^_^');
        return;
    }

    let newTaskBody = document.createElement('div');
    newTaskBody.setAttribute('class', 'taskBody');
    newTaskBody.innerHTML = `
        <div class="taskTextAndDateContainer">
                <p class="taskText">${taskValue}</p>
            <div class="taskDate">00:00</div>
            </div>
            <div class="taskImportance" data-description="Select importance<br> of current Note">[&gt;]</div>
            <div class="taskCloseBtn" data-closeNote="Close current note">[X]</div>
        </div>
    `;
    
    tasksContainer.append(newTaskBody);        
    inputField.value = ''; // очистка поля input
}


// Добавление [меню выбора уровня важности заметки] (общий обработчик - 4 шт. вложенных):
tasksContainer.addEventListener('click', function showNoteMenu(event) {
    let target = event.target;        
    if (target.classList != 'taskImportance') {
        return;
    }
    
    let taskPriorityContainer = document.createElement('div');
    taskPriorityContainer.setAttribute('class', 'taskPriorityContainer');

    taskPriorityContainer.innerHTML = `
        <div class="taskPriorityMenuHeader">
            Choose task priority:
        </div>

        <div class="priority orange">
            High
        </div>

        <div class="priority blue">
            Medium
        </div>

        <div class="priority green">
            Low
        </div>

        <div class="priority standard">
            Standard
        </div>

        <div class="closePriorityMenu priority">[close menu]</div>
    `;

    target.parentElement.append(taskPriorityContainer);
    target.setAttribute('class', 'taskImportanceMenuActive'); /* чтобы не отрисовывалось меню несколько раз - меняю класс кнопки:
    "taskImportance" -> "taskImportanceMenuActive" */
    
    taskPriorityContainer.style = `
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        gap: 0.3rem;
    `;
    // target - это "taskImportance" кнопка
    target.parentElement.querySelector('.taskImportanceMenuActive').addEventListener('click', function(event) {
        /* при смене класса обработчик перевешивается на тотже элемент, но с уже новым классом.
        Если не указать "taskPriorityContainer.remove();" меню будут добавлять без ограничения по кол-ву уже кнопкой с новым классом
        че происходит ^_^ */
        let target = event.target;
        taskPriorityContainer.remove(); // удаляет все лишние меню
        target.parentElement.querySelector('.taskImportanceMenuActive').setAttribute('class', 'taskImportance'); /* заново не присваивает класс,
        но обработчик работает */
    })

    
    // --------------------- скрипты для меню выбора уровня важности заметки ---(НАЧАЛО)---


    // обработчик №1 на отрисованном элементе-меню: выбор цвета тела заметки (оранжевый)
    taskPriorityContainer.addEventListener('click', function notePriorityHigh (event) {
        let taskBody = document.querySelector('.taskBody');            

        let target = event.target;
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer');

        if (target.classList != 'priority orange') { // classList - это все классы, потому надо указывать все классы элемента (иначе не работает)
            return;
        }

        //taskPriorityContainer.style.background = 'orange'; цвет самого меню
        taskPriorityContainer.parentElement.style.background = '#d69129'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.
        taskPriorityContainer.remove();
    });

    // обработчик №2 на отрисованном элементе-меню: выбор цвета тела заметки (синий)
    taskPriorityContainer.addEventListener('click', function notePriorityMedium (event) {
        let taskBody = document.querySelector('.taskBody');
        let target = event.target;
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer');

        if (target.classList != 'priority blue') {
            return;
        }
        
        taskPriorityContainer.parentElement.style.background = '#464c9c';
        taskPriorityContainer.remove();
    });

    // обработчик №3 на отрисованном элементе-меню: выбор цвета тела заметки (зеленый)
    taskPriorityContainer.addEventListener('click',  function notePriorityLow (event) {
        let taskBody = document.querySelector('.taskBody');
        let target = event.target;
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer');

        if (target.classList != 'priority green') {
            return;
        }
        
        taskPriorityContainer.parentElement.style.background = '#469c47'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.
        taskPriorityContainer.remove();
    });

    // обработчик №4 на отрисованном элементе-меню: выбор цвета тела заметки (стандартный серый)
    taskPriorityContainer.addEventListener('click', function notePriorityStandard (event) {
        let taskBody = document.querySelector('.taskBody');
        let target = event.target;
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer');

        if (target.classList != 'priority standard') {
            return;
        }
        
        taskPriorityContainer.parentElement.style.background = 'gray'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.
        taskPriorityContainer.remove();
    });
    
    /* Обработчик №5 на отрисованном элементе-меню: закрытие меню */
    taskPriorityContainer.addEventListener('click', function hideNoteMenu(event) {
        let target = event.target;
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer'); /* !!!!! В первую очередь ищется именно элемент
        на котором висит обработчик (это вообще законно? ^_^ правильно?) */

        if (target.classList != 'closePriorityMenu priority') {
            return;
        }

        //target.parentElement.style.display ='none'; просто скрывает, но не убирает элемент из DOM
        //target.parentElement.remove();
        taskPriorityContainer.remove();
        
        /* --- не отрисовывается обратно элемент [>], решил на скрывать его при клике ---

        let taskImportanceElement = document.createElement('div');
        taskImportanceElement.innerHTML = `
            [>]
        `;
        taskImportanceElement.setAttribute('class', 'taskImportance');
        taskPriorityContainer.parentElement.append(taskImportanceElement); */
    });
})

// --------------------- скрипты для меню выбора уровня важности заметки ---(КОНЕЦ)---



// --------------------- Тултип над / под элементом открытия меню (НАЧАЛО)---
let tooltipElemImportance = document.querySelector('.tooltipImportance'); // в глобальной области видимости создан элемент

tasksContainer.addEventListener('mouseover', function renderImportanceTooltip(event) {
    let target = event.target;
    // если нет описания - то "return"
    if (!target.dataset.description) {
        return;
    }

    tooltipElemImportance = document.createElement('div');
    tooltipElemImportance.setAttribute('class', 'tooltipImportance');
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
let tooltipElemCloseNote = document.querySelector('.closeNote')
let target = event.target;

if ( !target.dataset.closenote ) { // "closenote" с маленькой буквы пишется НЕ camelCase
 return;
}

tooltipElemCloseNote = document.createElement('div');
tooltipElemCloseNote.setAttribute('class', 'closeNote');
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
let tooltipElemCloseNote = document.querySelector('.closeNote')

if (tooltipElemCloseNote) {
 tooltipElemCloseNote.remove()
 tooltipElemCloseNote = null;
}
})

// --------------------- Тултип над / под элементом закрытия таска (КОНЕЦ)---