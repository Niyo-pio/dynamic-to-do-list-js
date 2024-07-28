document.addEventListener('DOMContentLoaded', () => {
   
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    };

    
    const addTask = (taskText, save = true) => {
        if (!taskText) return;

      
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        
        li.appendChild(removeButton);

      
        taskList.appendChild(li);

       
        taskInput.value = "";

        
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    };

    
    const saveTaskToLocalStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    
    const removeTaskFromLocalStorage = (taskText) => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
        }
    });
    
    loadTasks();
});
