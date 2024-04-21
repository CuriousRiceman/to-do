export class Project {
    constructor(name) {
        this.name = name;
    }

    getProjectName() {
        return this.name;
    }

    getProjectObject() {
        const projectString = localStorage.getItem(this.name);
        return JSON.parse(projectString);
    }

    storeProject() {
        const projectObject = { // Figure out what info to have
            tasks: {
                "do": "hey hows it"
            }
        };
        const projectString = JSON.stringify(projectObject); // Local storage only supports string values
        localStorage.setItem(this.name, projectString);
    }
    
    deleteProject() {
        localStorage.removeItem(this.name);
    }
}

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    addTask() {

    }

    addTaskToProject() {

    }
}