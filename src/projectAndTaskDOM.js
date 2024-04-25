import { createAddTaskButton, createNewTaskDialog, createToDoList} from "./reuseableDomParts";

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

export function generateProjectTasks(parentContainer, whichProject) {
    const projectTasks = JSON.parse(localStorage.getItem(whichProject));
    // Note: projectTasks is an object that contains objects (key, value is object)
    // for loops primarily applies to arrays, Object.keys() returns an array of the object keys
    parentContainer.innerHTML = '';
    Object.keys(projectTasks).forEach((taskTitle) => {
        const taskDetails = projectTasks[taskTitle];
        
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container'; // Individual card for each task, style it

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${taskDetails.description}`;
        taskContainer.appendChild(descriptionElement);

        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `Due Date: ${taskDetails.dueDate}`;
        taskContainer.appendChild(dueDateElement);

        const priorityElement = document.createElement('p');
        priorityElement.textContent = `Priority: ${taskDetails.priority}`;
        taskContainer.appendChild(priorityElement);

        const projectElement = document.createElement('p');
        projectElement.textContent = `Which Project: ${taskDetails.whichProject}`;
        taskContainer.appendChild(projectElement);

        parentContainer.appendChild(taskContainer);
    });
}
