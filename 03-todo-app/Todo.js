const taskInput = document.getElementById('taskInput');
const addbutton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('tasks')) || []


function renderTasks() {
     taskList.innerHTML = '';

     tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed')
        }
        
        const span = document.createElement('span')
        span.textContent = task.text;
        span.addEventListener('click', () => toggleTask(index))

        const buttonBtn = document.createElement('button');
        buttonBtn.textContent = 'Delete';
        buttonBtn.classList.add('delete-btn');
        buttonBtn.addEventListener('click', () => deleteTask(index))

        li.appendChild(span);
        li.appendChild(buttonBtn);
        taskList.appendChild(li);

     });
}


function addTask (){
    const text = taskInput.value.trim();
    if (text === '') {
        return 
    }

    tasks.push({text: text, completed:false})
    taskInput.value = '';
    updateLocalStorage();
    renderTasks();
}


function toggleTask(index){
   tasks[index].completed = !tasks[index].completed
   updateLocalStorage();
   renderTasks();
}

function deleteTask(index){
   tasks.splice(index, 1);
   updateLocalStorage();
   renderTasks()
}

function updateLocalStorage(){
    localStorage.setItem('task', JSON.stringify(tasks))
}

addbutton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
});
