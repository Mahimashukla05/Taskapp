import { saveTasks, loadTasks } from "./modules/storage.js";
import { validateTaskInput } from "./modules/validation.js";
import { renderTaskList } from "./modules/render.js";

let tasks = loadTasks();

let filter = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

function createTask(text) {

    return {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };

}

function refresh() {

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    renderTaskList(list, filteredTasks);

    document.getElementById("total-count").textContent =
        tasks.length;

    document.getElementById("active-count").textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById("completed-count").textContent =
        tasks.filter(task => task.completed).length;

    saveTasks(tasks);

}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!validateTaskInput(input.value)) {
        return;
    }

    tasks.push(createTask(input.value));

    input.value = "";

    refresh();

});

list.addEventListener("click", (e) => {

    const taskElement = e.target.closest(".task");

    if (!taskElement) return;

    const id = Number(taskElement.dataset.id);

    const task = tasks.find(t => t.id === id);

    if (!task) return;

    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(t => t.id !== id);

        refresh();

        return;
    }

    if (e.target.classList.contains("task-checkbox")) {

        task.completed = e.target.checked;

        refresh();
    }

});

document.querySelectorAll("[data-filter]").forEach(button => {

    button.addEventListener("click", () => {

        filter = button.dataset.filter;

        refresh();

    });

});

refresh();