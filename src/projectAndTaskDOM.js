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
        projectContainer.addEventListener("click", () => {
            toDoList.innerHTML = '<button type="button" class="add-task-button">Add new task</button>';
            const heading = document.createElement("h2");
            heading.textContent = key;
            toDoList.appendChild(heading);
        });
    }
}

export function generateProjectTasks() {

}