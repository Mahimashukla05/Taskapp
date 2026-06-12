export function renderTaskList(taskList, tasks) {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <li class="empty-state">
                <p>🌸 No tasks yet. Add your first task!</p>
            </li>
        `;

        return;
    }

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.className = `task ${task.completed ? "completed" : ""}`;

        li.dataset.id = task.id;

        li.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.completed ? "checked" : ""}
                >

                <span>${task.text}</span>
            </label>

            <button class="delete-btn">
                🗑 Delete
            </button>
        `;

        taskList.appendChild(li);

    });

}
