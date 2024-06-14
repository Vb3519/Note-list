 /* ------------------------------------------------- Скрипты (общие) ------------------------------------------------- */    
    
 let tasksContainer = document.querySelector('.tasksContainer');
    
 // удаление таска (обработчик):
 tasksContainer.addEventListener('click', (event) => {
 let target = event.target;

 if ( target.classList != 'taskCloseBtn' ) {        
     return;
 }

 /* target.parentElement.style.display = 'none';  скрывает таск, но не удаляет из DOM */
 target.parentElement.remove();
})

 // добавление нового таска (обработчик):
 const inputField = document.querySelector('input');
 const addTaskBtn = document.querySelector('.addTaskBtn');

 addTaskBtn.onclick = function() {
     let taskValue = inputField.value;

     if ( taskValue === '' ) { // если поле "input" пустое, то обработчик не срабатывает (достаточно обычного или строгого сравнения? "==" или "===")
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


 // Отображение [меню выбора уровня важности заметки] (общий обработчик - 4 шт. вложенных обработчиков):
    tasksContainer.addEventListener('click', (event) => {        
        let target = event.target;
        if ( target.classList != 'taskImportance' ) {
            return;
        }
        
        let taskPriorityContainer = document.querySelector('.taskPriorityContainer');
        taskPriorityContainer.style.visibility = 'visible';

     
     // --------------------- скрипты для меню выбора уровня важности заметки ---(НАЧАЛО)---


     // обработчик №1 на элементе-меню "position: absolute; visibility:hidden" : выбор цвета тела заметки (оранжевый)
     taskPriorityContainer.addEventListener('click', event => {         
         let target = event.target;
         
         if ( target.classList != 'priority orange' ) { // classList - это все классы, потому надо указывать все классы элемента (иначе не работает)
             return;
         }
         
         taskPriorityContainer.parentElement.style.background = '#d69129'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.
         
         taskPriorityContainer.style.visibility = 'hidden';
     });

     // обработчик №2 на элементе-меню "position: absolute; visibility:hidden" : выбор цвета тела заметки (синий)
     taskPriorityContainer.addEventListener('click', event => {         
         let target = event.target;

         if ( target.classList != 'priority blue' ) {
             return;
         }
         
         taskPriorityContainer.parentElement.style.background = '#464c9c';
         taskPriorityContainer.style.visibility = 'hidden';
     });

     // обработчик №3 на элементе-меню "position: absolute; visibility:hidden" : выбор цвета тела заметки (зеленый)
     taskPriorityContainer.addEventListener('click', event => {         
         let target = event.target;

         if ( target.classList != 'priority green' ) {
             return;
         }
         
         taskPriorityContainer.parentElement.style.background = '#469c47'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.         
         taskPriorityContainer.style.visibility = 'hidden';
     });

     // обработчик №4 на элементе-меню "position: absolute; visibility:hidden" : выбор цвета тела заметки (стандартный серый)
     taskPriorityContainer.addEventListener('click', event => {         
         let target = event.target;
        
         if ( target.classList != 'priority standard' ) {
             return;
         }
         
         taskPriorityContainer.parentElement.style.background = 'gray'; // !!!!! на этом элементе висит обработчик, применяю к его родителю стили.
         taskPriorityContainer.style.visibility = 'hidden';
     });
     
     /* Обработчик №5 на элементе-меню "position: absolute; visibility:hidden" : закрытие меню */
     taskPriorityContainer.addEventListener('click', event => {
         let target = event.target;

         if ( target.classList != 'closePriorityMenu priority' ) {
             return;
         }

         taskPriorityContainer.style.visibility = 'hidden';
     });
    })

 // --------------------- скрипты для меню выбора уровня важности заметки ---(КОНЕЦ)---

 

 // --------------------- Тултип над / под элементом открытия меню (НАЧАЛО)---
 let tooltipElemImportance = document.querySelector('.tooltipImportance'); // в глобальной области видимости создан элемент

 tasksContainer.addEventListener('mouseover', event => {
     let target = event.target;
     // если нет описания - то "return"
     if ( !target.dataset.description ) {
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

 tasksContainer.addEventListener('mouseout', event => {
     
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

document.addEventListener('mouseover' , function(event) {
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


document.addEventListener('mouseout', event => {
 let tooltipElemCloseNote = document.querySelector('.closeNote')

 if (tooltipElemCloseNote) {
     tooltipElemCloseNote.remove()
     tooltipElemCloseNote = null;
 }
})

// --------------------- Тултип над / под элементом закрытия таска (КОНЕЦ)---