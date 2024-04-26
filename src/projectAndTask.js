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
        const projectObject = { };
        const projectString = JSON.stringify(projectObject); // Local storage only supports string values
        localStorage.setItem(this.name, projectString);
    }
    
    deleteProject() {
        localStorage.removeItem(this.name);
    }
}

export class Task {
    constructor(title, description, dueDate, priority, whichProject) {
        this.whichProject = whichProject;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.whichProject = whichProject; // Uhhh trial and error.
    }

    storeTaskUnderProject() {
        const projectTaskObject = JSON.parse(localStorage.getItem(this.whichProject));
        const newTask = {
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            whichProject: this.whichProject
        };
        projectTaskObject[this.title] = newTask;
        localStorage.setItem(this.whichProject, JSON.stringify(projectTaskObject));
        console.log("done");
    }

    getWhichProject() {
        return this.whichProject;
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