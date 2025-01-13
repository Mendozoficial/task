document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <button>${task.completed ? 'Desmarcar' : 'Completar'}</button>
            `;
            taskList.appendChild(li);

            li.querySelector('button').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks(filter);
            });
        });
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        tasks.push({ text: taskInput.value, completed: false });
        taskInput.value = '';
    saveTasks();
        renderTasks();
    });

    filters.forEach(button => {
        button.addEventListener('click', () => {
            renderTasks(button.id);
        });
    });

    renderTasks();
});