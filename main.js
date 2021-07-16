const lists = document.querySelectorAll('.list');
const backlogList = document.getElementById('backlog');
const progressList = document.getElementById('progress');
const completedList = document.getElementById('completed');
const onHoldList = document.getElementById('onhold');

const addItemButtons = document.querySelectorAll('.add-item');


let backlogListArray = ['being cool'];
let progressListArray = ['working out'];
let completedListArray = ['testing'];
let onHoldListArray = ['learning React', 'learning crypto'];

let draggedItem;
let currentColumn;
let lastColumn;
let addItemButton;

function getFromLocalStorage() {
    if (localStorage.getItem('items')) {
        backlogListArray = JSON.parse(localStorage.getItem('items')).backlogItems;
        progressListArray = JSON.parse(localStorage.getItem('items')).progressItems;
        completedListArray = JSON.parse(localStorage.getItem('items')).completedItems;
        onHoldListArray = JSON.parse(localStorage.getItem('items')).onHoldItems;
    } else {
        updateLocalStorage();
    }
}

function updateLocalStorage() {
        const items = {};
        items.backlogItems = backlogListArray;
        items.progressItems = progressListArray;
        items.completedItems = completedListArray;
        items.onHoldItems = onHoldListArray;
        localStorage.setItem('items', JSON.stringify(items));
}

function displayFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('items'));
    items.backlogItems.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerText = task;
        li.draggable = true;
        li.setAttribute('ondragstart', 'drag(event)');
        backlogList.append(li);
    });
    items.progressItems.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerText = task;
        li.draggable = true;
        li.setAttribute('ondragstart', 'drag(event)');
        progressList.append(li);
    });
    items.completedItems.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerText = task;
        li.draggable = true;
        li.setAttribute('ondragstart', 'drag(event)');
        completedList.append(li);
    });
    items.onHoldItems.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerText = task;
        li.draggable = true;
        li.setAttribute('ondragstart', 'drag(event)');
        onHoldList.append(li);
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(column) {
    if (column === 'backlog') {
        backlogList.parentElement.classList.add('over');
        currentColumn = 0;
    }
    if (column === 'progress') {
        progressList.parentElement.classList.add('over');
        currentColumn = 1;
    }
    if (column === 'completed') {
        completedList.parentElement.classList.add('over');
        currentColumn = 2;
    }
    if (column === 'onhold') {
        onHoldList.parentElement.classList.add('over');
        currentColumn = 3;
    }
}

function drop(e) {
    e.preventDefault();
    lists.forEach(list => {
        list.parentElement.classList.remove('over');
    });
    lists[currentColumn].append(draggedItem);
    if (currentColumn === 0) {
        backlogListArray.push(draggedItem.innerText);
    }
    if (currentColumn === 1) {
        progressListArray.push(draggedItem.innerText);
    }
    if (currentColumn === 2) {
        completedListArray.push(draggedItem.innerText);
    }
    if (currentColumn === 3) {
        onHoldListArray.push(draggedItem.innerText);
    }

    if (lastColumn === 'backlog') {
        backlogListArray = backlogListArray.filter(task => task !== draggedItem.innerText);
    }
    if (lastColumn === 'progress') {
        progressListArray = progressListArray.filter(task => task !== draggedItem.innerText);
    }
    if (lastColumn === 'completed') {
        completedListArray = completedListArray.filter(task => task !== draggedItem.innerText);
    }
    if (lastColumn === 'onhold') {
        onHoldListArray = onHoldListArray.filter(task => task !== draggedItem.innerText);
    }
    console.log(currentColumn, backlogListArray, progressListArray, completedListArray, onHoldListArray);
    updateLocalStorage();
}

function drag(e) {
    draggedItem = e.target;
    lastColumn = e.target.parentElement.id;
}

function createInputField(bgClass) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('add-item-container');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('input');
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Item';
    saveButton.classList.add('save-item');
    saveButton.classList.add(bgClass);

    inputContainer.append(saveButton);
    inputContainer.append(input);

    return inputContainer;
}


function addItemToList(e) {
    const clickedButton = e.target;
    if (clickedButton.className === 'add-item') {
        addItemButton = clickedButton;
        const backgroundClass = clickedButton.parentElement.children[0].className.slice(23);
        clickedButton.parentElement.append(createInputField(backgroundClass));
        addItemButton.style.display = 'none';
    }
    if (clickedButton.className.includes('save-item')) {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.innerText = clickedButton.nextSibling.value;
        li.draggable = true;
        li.setAttribute('ondragstart', 'drag(event)');

        if (clickedButton.className.includes('one')) {
            backlogList.append(li);
            backlogListArray.push(li.innerText);
        }
        if (clickedButton.className.includes('two')) {
            progressList.append(li);
            progressListArray.push(li.innerText);
        }
        if (clickedButton.className.includes('three')) {
            completedList.append(li);
            completedListArray.push(li.innerText);
        }
        if (clickedButton.className.includes('four')) {
            onHoldList.append(li);
            onHoldListArray.push(li.innerText);
        }
        addItemButton.style.display = 'block';
        clickedButton.parentElement.style.display = 'none';
        updateLocalStorage();
    }
}



getFromLocalStorage();
displayFromLocalStorage();

window.addEventListener('click', addItemToList);

console.log(backlogListArray, progressListArray, completedListArray, onHoldListArray)


