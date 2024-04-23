import { createAddTaskButton, createNewTaskDialog } from "./reuseableDomParts";
import { Project } from "./projectAndTask";
export function generateProjectDiv(component) {
    const storageLength = localStorage.length;
    if (storageLength === 0) {
        return;
    }

    for (let i = 0; i < storageLength; i++) {
        const key = localStorage.key(i);
        const keyValue = localStorage.getItem(key);
        
        const projectContainer = document.createElement("button");
        projectContainer.className = "list-project-button";
        projectContainer.textContent = key; // Don't use innerHTML due to security risk (can interpret HTML)
        component.appendChild(projectContainer);
        console.log(key);
        console.log(keyValue);
        // Can definitely get this as a parameter just like 'component' for reuseability, however, I'm tired.
        const toDoList = document.querySelector('.to-do-list-container');
        
        // Separate and make it a reuseable DOM portion, takes in parameter key
        // ^ intended for default page upon opening it
        projectContainer.addEventListener("click", () => {
            toDoList.innerHTML = "";
            const addTaskButtonElem = createAddTaskButton();
            const newTaskDialogElem = createNewTaskDialog();
            const heading = document.createElement("h2");

            heading.textContent = key;
            toDoList.appendChild(heading);
            toDoList.appendChild(addTaskButtonElem);
            toDoList.appendChild(newTaskDialogElem);

            const addTaskButton = document.querySelector('.add-task-button');
            const taskDialog = document.querySelector('#new-task-dialog');
            const submitTaskButton = document.querySelector('.submit-task-button');
            const cancelTaskButton = document.querySelector('.cancel-task-button');

            addTaskButton.addEventListener("click", () => {
                taskDialog.showModal();
            });
            submitTaskButton.addEventListener("click", () => {

            });
            cancelTaskButton.addEventListener("click", () => {
                taskDialog.close();
            });
        });

        
    }
}

export function generateDefaultProject() {
    const defaultProject = new Project("Default");
    defaultProject.storeProject();
}

export function generateProjectTasks() {

}