export class Project {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    storeProject(projectName) {
        localStorage.setItem("projectName", projectName);
        console.log("hi");
    }
    
    deleteProject() {
        localStorage.removeItem("projectName");
    }
}

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    addProject() {

    }

    addTaskToProject() {

    }
}