import { Task } from "./projectAndTask";
import { generateProjectTasks } from "./projectAndTaskDOM";
// Function to create the "Add new task" button
export function createAddTaskButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'add-task-button';
    button.textContent = 'Add new task';
    return button;
}

// Function to create the new task dialog
export function createNewTaskDialog() {
    const dialog = document.createElement('dialog');
    dialog.id = 'new-task-dialog';
    // Create the form
    const form = document.createElement('form');
    form.id = 'task-form';

    // Create the first form container
    const formContainerOne = document.createElement('div');
    formContainerOne.className = 'form-container-one';

    // Create Title label and input
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title:';
    formContainerOne.appendChild(titleLabel);
    formContainerOne.appendChild(document.createElement('br'));

    const titleInput = document.createElement('input');
    titleInput.value = "";
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    formContainerOne.appendChild(titleInput);
    formContainerOne.appendChild(document.createElement('br'));

    // Create Description label and textarea
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description';
    formContainerOne.appendChild(descriptionLabel);
    formContainerOne.appendChild(document.createElement('br'));

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.value = "";
    descriptionTextarea.style.resize = 'none';
    descriptionTextarea.id = 'description';
    descriptionTextarea.name = 'description';
    formContainerOne.appendChild(descriptionTextarea);
    formContainerOne.appendChild(document.createElement('br'));

    // Create Due date label and input
    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateLabel.textContent = 'Due date';
    formContainerOne.appendChild(dueDateLabel);
    formContainerOne.appendChild(document.createElement('br'));

    const dueDateInput = document.createElement('input');
    dueDateInput.value = "";
    dueDateInput.type = 'date';
    dueDateInput.id = 'dueDate';
    dueDateInput.name = 'dueDate';
    formContainerOne.appendChild(dueDateInput);
    formContainerOne.appendChild(document.createElement('br'));

    form.appendChild(formContainerOne);

    // Create the second form container
    const formContainerTwo = document.createElement('div');
    formContainerTwo.className = 'form-container-two';

    // Create Priority label and buttons
    const priorityLabel = document.createElement('p');
    priorityLabel.id = 'read';
    priorityLabel.textContent = 'Priority';
    formContainerTwo.appendChild(priorityLabel);

    const priorityDiv = document.createElement('div');
    priorityDiv.className = 'priority-buttons';

    const lowPriority = document.createElement('input');
    lowPriority.checked = false;
    lowPriority.type = 'radio';
    lowPriority.id = 'low';
    lowPriority.name = 'priority';
    lowPriority.value = 'low';
    priorityDiv.appendChild(lowPriority);
    priorityDiv.appendChild(document.createTextNode('Low'));

    const mediumPriority = document.createElement('input');
    mediumPriority.checked = false;
    mediumPriority.type = 'radio';
    mediumPriority.id = 'medium';
    mediumPriority.name = 'priority';
    mediumPriority.value = 'medium';
    priorityDiv.appendChild(mediumPriority);
    priorityDiv.appendChild(document.createTextNode('Medium'));

    const highPriority = document.createElement('input');
    highPriority.checked = false;
    highPriority.type = 'radio';
    highPriority.id = 'high';
    highPriority.name = 'priority';
    highPriority.value = 'high';
    priorityDiv.appendChild(highPriority);
    priorityDiv.appendChild(document.createTextNode('High'));

    formContainerTwo.appendChild(priorityDiv);
    form.appendChild(formContainerTwo);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'submit-or-cancel';

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.className = 'submit-task-button';
    submitButton.textContent = 'Submit';
    buttonContainer.appendChild(submitButton);

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'cancel-task-button';
    cancelButton.textContent = 'Cancel';
    buttonContainer.appendChild(cancelButton);

    form.appendChild(buttonContainer);

    dialog.appendChild(form);
    return dialog;
}

export function createToDoList(key) {
    const toDoList = document.querySelector('.to-do-list-container');
    toDoList.innerHTML = "";
    const addTaskButtonElem = createAddTaskButton();
    const newTaskDialogElem = createNewTaskDialog();
    const heading = document.createElement("h2");
    const listTasks = document.createElement("div")
    heading.className = "project-task-header"
    heading.textContent = key;
    listTasks.className = "tasks-display";
    listTasks.innerHTML = "Hello"; // call function that loops and displays the items
    toDoList.appendChild(heading);
    toDoList.appendChild(listTasks);
    toDoList.appendChild(addTaskButtonElem);
    toDoList.appendChild(newTaskDialogElem);

    const addTaskButton = document.querySelector('.add-task-button');
    const taskDialog = document.querySelector('#new-task-dialog');
    const submitTaskButton = document.querySelector('.submit-task-button');
    const cancelTaskButton = document.querySelector('.cancel-task-button');
    
    addTaskButton.addEventListener("click", () => {
        taskDialog.showModal();
    });

    const titleElem = document.querySelector('#title');
    const descriptionElem = document.querySelector('#description');
    const dueDateElem = document.querySelector('#dueDate');
    const radioButtons = document.querySelectorAll(`input[name="priority"]`);
    
    submitTaskButton.addEventListener("click", (event) => {
        event.preventDefault();
        let checkedButton = null;
        radioButtons.forEach(radioButton => {
            if (radioButton.checked) {
                checkedButton = radioButton;
            } else {
                return;
            }
        });
        // Note: Learn about sanitizing inputs, can definitely write a function for that
        const myTask = new Task(titleElem.value, descriptionElem.value, dueDateElem.value, checkedButton.value, heading.textContent);
        myTask.storeTaskUnderProject();
        generateProjectTasks(listTasks, key); // Displays it once a new task is created
        
        // Reset the values
        titleElem.value = "";
        descriptionElem.value = "";
        dueDateElem.value = "";
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
        taskDialog.close();
    });
    cancelTaskButton.addEventListener("click", () => {
        taskDialog.close();
    });
    generateProjectTasks(listTasks, key); // Displays it one the list is created
}