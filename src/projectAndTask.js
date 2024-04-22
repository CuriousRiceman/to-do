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
                "init": "init value"
            }
        };
        const projectString = JSON.stringify(projectObject); // Local storage only supports string values
        localStorage.setItem(this.name, projectString);
    }
    
    deleteProject() {
        localStorage.removeItem(this.name);
    }

    removeTask() {
        
    }
}

export class Task {
    constructor(title, description, dueDate, priority, whichProject) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.whichProject = whichProject; // Uhhh trial and error.
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    getWhichProject() {
        return this.whichProject;
    }
}