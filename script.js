document.addEventListener("DOMContentLoaded", () => {
    let taskInput = document.getElementById("taskInput");
    let addTaskButton = document.getElementById("addTaskButton");
    let taskList = document.getElementById("taskList");


    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    let renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            let  li = document.createElement("li");
            li.className = "flex items-center mb-2";
            li.innerHTML = `
                <span class="flex-grow">${task}</span>
                <button class="ml-4 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600" onclick="editTask(${index})">Edit</button>
                <button class="ml-4 bg-red-500 text-white p-1 rounded hover:bg-red-600" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };
    let addTask = () => {
        let task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    };

    window.editTask = (index) => {
        let newTask = prompt("Edit your task", tasks[index]);
        if (newTask !== null) {
            tasks[index] = newTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    renderTasks();
    
});
let ClearAll =() =>{
    localStorage.removeItem("tasks");
    location.reload();
    console.log(localStorage);
}


