import './styles.css'; // This will not generate a link to the file in the html file, it will generate the css code in <style> tags if you check dev tools, better to use minimize css
import { Task } from './projectAndTask.js';
import { Project } from './projectAndTask.js';

const sidebar = document.querySelector('.sidebar-container');
const addProjectButton = document.querySelector('.add-project-button');
const projectDialog = document.querySelector('#new-project-dialog');
const submitProjectButton = document.querySelector('.submit-project-button');
const cancelProjectButton = document.querySelector('.cancel-project-button');

const toDoList = document.querySelector('.to-do-list-container');
const addTaskButton = document.querySelector('.add-task-button');
const taskDialog = document.querySelector('#new-task-dialog');
const submitTaskButton = document.querySelector('.submit-task-button');
const cancelTaskButton = document.querySelector('.cancel-task-button');

const titleElem = document.querySelector('#title');
const descriptionElem = document.querySelector('#description');
const dueDateElem = document.querySelector('#dueDate');
const priorityLowElem = document.querySelector('#low');
const priorityMediumElem = document.querySelector('#medium');
const priorityHighElem = document.querySelector('#high');

// Notes:
    // Store an array of projects in ONE localStorage key?
    // Store each project as an individual key (name)?
        // Iterate through localStorage since it contains array of KEYS already (console.log(localStorage))
        // Or store it in an array and iterate through that instead
const projectArrayContainer = [];

document.addEventListener('DOMContentLoaded', () => {

});

addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
});

submitProjectButton.addEventListener("click", () => {
    const projectName = document.querySelector('#projName').value;
    const myProject = new Project(projectName); // Object stored in array (contains the variables initialized in constructor)
    projectArrayContainer.push(myProject);
    // Figure out storage method and dom display
    // Note: console.log(localStorage), lists array of objects
    myProject.storeProject(projectName, myProject); // Store the name as key and object as value in local storage, similar to array above
});

cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
});



addTaskButton.addEventListener("click", () => {
    taskDialog.showModal();
});

submitTaskButton.addEventListener("click", () => {

});

cancelTaskButton.addEventListener("click", () => {
    taskDialog.close();
});
  





