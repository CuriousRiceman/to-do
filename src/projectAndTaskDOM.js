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
        // Can just access the task title using the parameter above BUT, if you want to do the following...
        // taskContainer.dataset.taskTitle = taskTitle; // This is to allow the complete button to get which task it is suppose to delete
        // taskContainer.setAttribute also works and is more general (any attribute not just data), dataset will returns an object to access attributes
        const titleOfTask = document.createElement('p');
        titleOfTask.textContent = taskTitle;
        taskContainer.appendChild(titleOfTask);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${taskDetails.description}`;
        taskContainer.appendChild(descriptionElement);

        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `Due Date: ${taskDetails.dueDate}`;
        taskContainer.appendChild(dueDateElement);

        const priorityElement = document.createElement('p');
        priorityElement.textContent = `Priority: ${taskDetails.priority}`;
        taskContainer.appendChild(priorityElement);

        const completeTaskButton = document.createElement("button");
        // NOTE: Tasks are likely not in chronological order, must create an array similar to what I did for project order
        // It orders based on localStorage, consider implementing it in the Project Class or use something like an ID
        completeTaskButton.type = "button";
        completeTaskButton.textContent = "Complete";
        completeTaskButton.className = "complete-task-button";
        completeTaskButton.addEventListener("click", () => {
            delete projectTasks[taskTitle];
            localStorage.setItem(whichProject, JSON.stringify(projectTasks));
            generateProjectTasks(parentContainer, whichProject);
        });;
        taskContainer.appendChild(completeTaskButton);
        parentContainer.appendChild(taskContainer);
        
    });
}
