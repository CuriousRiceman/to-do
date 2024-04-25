import { createAddTaskButton, createNewTaskDialog, createToDoList } from "./reuseableDomParts";
import { Project } from "./projectAndTask";

export function generateProjectDiv(component) {
    const storageLength = localStorage.length;
    const projectArray = JSON.parse(localStorage.getItem('projectOrder'));
    if (storageLength === 0 || projectArray.length === 0) {
        return;
    }
    const sideBarList = document.querySelector('.sidebar-list');
    sideBarList.innerHTML = "";
    projectArray.forEach((projectName) => {
        const keyValue = localStorage.getItem(projectName);
        // Note: The use of ID or TIMESTAMP can be used to preserve the order on items saved.
        // By default, localStorage will sort the items alphabetically
        // In this project, I will use an array to store the projects in order
        const projectContainer = document.createElement("button");
        projectContainer.className = "list-project-button";
        projectContainer.textContent = projectName; // Don't use innerHTML due to security risk (can interpret HTML)
        component.appendChild(projectContainer);
        projectContainer.addEventListener("click", () => {
            createToDoList(projectName);
        });
    });
}

export function generateDefaultProject() {
    if (localStorage.getItem('Default') === null) {
        const defaultProject = new Project("Default");
        const projectArray = JSON.parse(localStorage.getItem('projectOrder')) || [];
        projectArray.push(defaultProject.getProjectName());
        localStorage.setItem('projectOrder', JSON.stringify(projectArray));
        defaultProject.storeProject();
        createToDoList(defaultProject.getProjectName());
    } else {
        return;
    }
}

export function generateProjectTasks() {

}
