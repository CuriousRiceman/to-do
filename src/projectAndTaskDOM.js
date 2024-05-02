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
        
        if (projectName === "All") {
            return;
        } else {
            const deleteProjectButton = document.createElement('button');
            deleteProjectButton.className = "delete-project-button";
            deleteProjectButton.textContent = "X";
            projectContainer.appendChild(deleteProjectButton);
            deleteProjectButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Button is inside another button, prevents from clicking both (bubbling up)
                console.log(projectName);
                const projectIndex = projectArray.indexOf(projectName);
                console.log(projectIndex);
                projectArray.splice(projectIndex, 1);
                console.log(projectArray);
                localStorage.setItem("projectOrder", JSON.stringify(projectArray));
                localStorage.removeItem(projectName);
                generateProjectDiv(component);
                createToDoList("All");
            });
        }
    });
}

export function generateProjectTasks(parentContainer, forWhichProject) {
    const projectTasks = JSON.parse(localStorage.getItem(forWhichProject));
    // Note: projectTasks is an object that contains objects (key, value is object)
    // for loops primarily applies to arrays, Object.keys() returns an array of the object keys
    parentContainer.innerHTML = '';
    Object.keys(projectTasks).forEach((taskTitle) => {
        const taskDetails = projectTasks[taskTitle];
        console.log(taskDetails);
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container'; // Individual card for each task, style it
        // Can just access the task title using the parameter above BUT, if you want to do the following...
        // taskContainer.dataset.taskTitle = taskTitle; // This is to allow the complete button to get which task it is suppose to delete
        // taskContainer.setAttribute also works and is more general (any attribute not just data), dataset will returns an object to access attributes
        const cardHeader = document.createElement('div');
        cardHeader.className = "card-header";

        const titleOfTask = document.createElement('p');
        titleOfTask.className = "title-of-task-element";
        titleOfTask.textContent = taskTitle;
        cardHeader.appendChild(titleOfTask);

        const dueDateElement = document.createElement('p');
        dueDateElement.textContent = `${taskDetails.dueDate}`;
        cardHeader.appendChild(dueDateElement);
        taskContainer.appendChild(cardHeader);

        const expandable = document.createElement("div");
        expandable.className = "expand";

        const descriptionElement = document.createElement('p');
        descriptionElement.className = "description-element";
        descriptionElement.textContent = `Description: ${taskDetails.description}`;
        expandable.appendChild(descriptionElement);

        const priorityElement = document.createElement('p');
        priorityElement.textContent = `Priority: ${taskDetails.priority}`;
        expandable.appendChild(priorityElement);
        
        const modifyElement = document.createElement('button');
        modifyElement.type = "button";
        modifyElement.class = "modify-button";
        modifyElement.textContent = "Modify";
        
        const taskDialog = document.querySelector("#new-task-dialog");
        // IMPORTANT NOTE: LocalStorage do not maintain order of entries, objects order numeric keys in ascending order, string keys in order they are inserted
        // Something to think about is how to modify the task while preserved its display order
        // Possibly use an array to maintain order that is easier to change values
        
        modifyElement.addEventListener("click", () => {
            taskDialog.showModal();
            const titleElem = document.querySelector('#title');
            const descriptionElem = document.querySelector('#description');
            const dueDateElem = document.querySelector('#dueDate');
            const radioButtons = document.querySelectorAll(`input[name="priority"]`);
            titleElem.value = taskTitle;
            descriptionElem.value = taskDetails.description;
            dueDateElem.value = taskDetails.dueDate;
            radioButtons.forEach(radioButton => {
                if (radioButton.value === taskDetails.priority) {
                    radioButton.checked = true;
                } else {
                    return;
                }
            });
            const preservedTaskTitle = titleElem.value;
            // Would usually use removeEventListener but I used an arrow function so it won't work (need to be defined or reference exact function name)
            // But I am to lazy to change it so...
            const submitTaskButton = document.querySelector('.submit-task-button');
            submitTaskButton.addEventListener("click", () => {
                const projectAll = JSON.parse(localStorage.getItem("All"));
                delete projectAll[preservedTaskTitle];
                localStorage.setItem("All", JSON.stringify(projectAll));

                const specificProject = JSON.parse(localStorage.getItem(taskDetails.whichProject));
                delete specificProject[preservedTaskTitle];
                localStorage.setItem("All", JSON.stringify(specificProject));
                const newTask = {
                    description: descriptionElem.value,
                    dueDate: dueDateElem.value,
                    priority: priorityElement.value,
                    whichProject: taskDetails.whichProject,
                };
                specificProject[titleElem.value] = newTask;
                localStorage.setItem(taskDetails.whichProject, JSON.stringify(specificProject));
                generateProjectTasks(parentContainer, forWhichProject);
                // FIX THE MODIFY BUTTON
            });
        });
        
        expandable.appendChild(modifyElement);
        taskContainer.appendChild(expandable);

        taskContainer.addEventListener('click', () => {
            // Toggle the visibility of the expandable section
            if (expandable.style.display === "none") {
                expandable.style.display = "block";
            } else {
                expandable.style.display = "none";
            }
        });

        const completeTaskButton = document.createElement("button");
        // NOTE: Tasks are likely not in chronological order, must create an array similar to what I did for project order
        // It orders based on localStorage, consider implementing it in the Project Class or use something like an ID
        completeTaskButton.type = "button";
        completeTaskButton.textContent = "Complete";
        completeTaskButton.className = "complete-task-button";
        completeTaskButton.addEventListener("click", () => {
            if (forWhichProject === "All") {
                const originalProjectName = taskDetails["whichProject"];
                const originalProjectsTask = JSON.parse(localStorage.getItem(originalProjectName));
                delete originalProjectsTask[taskTitle];
                localStorage.setItem(originalProjectName, JSON.stringify(originalProjectsTask));
                // Deletes from "All" object as well as the original project it is linked to
                delete projectTasks[taskTitle];
                localStorage.setItem(forWhichProject, JSON.stringify(projectTasks));
                generateProjectTasks(parentContainer, forWhichProject);
            } else {
                delete projectTasks[taskTitle];
                localStorage.setItem(forWhichProject, JSON.stringify(projectTasks));
                generateProjectTasks(parentContainer, forWhichProject);
                // Will delete from the "All" object as well
                const allTasks = JSON.parse(localStorage.getItem("All"));
                delete allTasks[taskTitle];
                localStorage.setItem("All", JSON.stringify(allTasks));
            }
        });;
        cardHeader.appendChild(completeTaskButton);
        parentContainer.appendChild(taskContainer);
        
    });
}
