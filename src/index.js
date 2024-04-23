import './styles.css'; // This will not generate a link to the file in the html file, it will generate the css code in <style> tags if you check dev tools, better to use minimize css
import { Task } from './projectAndTask.js';
import { Project } from './projectAndTask.js';
import { generateProjectDiv, generateProjectTasks, generateDefaultProject } from './projectAndTaskDOM.js';

const sidebar = document.querySelector('.sidebar-container');
const addProjectButton = document.querySelector('.add-project-button');
const projectDialog = document.querySelector('#new-project-dialog');
const submitProjectButton = document.querySelector('.submit-project-button');
const cancelProjectButton = document.querySelector('.cancel-project-button');
const sideBarList = document.querySelector('.sidebar-list');

const toDoList = document.querySelector('.to-do-list-container');

generateDefaultProject();
generateProjectDiv(sideBarList);

addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
});

submitProjectButton.addEventListener("click", () => {
    const projectName = document.querySelector('#projName').value;
    const myProject = new Project(projectName); // Object stored in array (contains the variables initialized in constructor)
    myProject.storeProject(); // Store the name as key and object as value in local storage, similar to array above
});

cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
});

// Put this portion in the projectAndTaskDOM file
// submitTaskButton.addEventListener("click", () => {
//     const titleElem = document.querySelector('#title');
//     const descriptionElem = document.querySelector('#description');
//     const dueDateElem = document.querySelector('#dueDate');
//     const radioButtons = document.querySelectorAll(`input[name="priority"]`);
//     let checkedButton = null;

//     radioButtons.forEach(radioButton => {
//         if (radioButton.checked) {
//             checkedButton = radioButton;
//         } else {
//             return;
//         }
//     });

//     // Note: Learn about sanitizing inputs, can definitely write a function for that
//     // Work on getting the task logic working, add to project its under by referenceing header textContent
//     // then generate the DOM for tasks
//     const myTask = new Task(titleElem.value, descriptionElem.value, dueDateElem.value, checkedButton.textContent); // Could set value for buttons in html
// });
  





