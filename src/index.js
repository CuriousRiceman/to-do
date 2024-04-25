import './styles.css'; // This will not generate a link to the file in the html file, it will generate the css code in <style> tags if you check dev tools, better to use minimize css
import { Project } from './projectAndTask.js';
import { generateProjectDiv} from './projectAndTaskDOM.js';
import { createToDoList } from './reuseableDomParts.js';

const sidebar = document.querySelector('.sidebar-container');
const addProjectButton = document.querySelector('.add-project-button');
const projectDialog = document.querySelector('#new-project-dialog');
const submitProjectButton = document.querySelector('.submit-project-button');
const cancelProjectButton = document.querySelector('.cancel-project-button');
const sideBarList = document.querySelector('.sidebar-list');
const toDoList = document.querySelector('.to-do-list-container');

function generateDefaultProject() {
    if (localStorage.getItem('Default') === null) {
        const defaultProject = new Project("Default");
        const projectArray = JSON.parse(localStorage.getItem('projectOrder')) || [];
        projectArray.push(defaultProject.getProjectName());
        localStorage.setItem('projectOrder', JSON.stringify(projectArray));
        defaultProject.storeProject();
        createToDoList(defaultProject.getProjectName());
    } else {
        return;
    }
}

generateDefaultProject();
generateProjectDiv(sideBarList);
createToDoList("Default");

addProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
});

// Note: Catching errors/exception for submitting project/task button is good to, but I won't do it this time.
submitProjectButton.addEventListener("click", (event) => {
    event.preventDefault(); // Upon creation, it will display the project header since w/o it, it will refresh every time and render nothing in the right container
    const projectName = document.querySelector('#projName').value;
    const projectArray = JSON.parse(localStorage.getItem('projectOrder')) || [];
    const myProject = new Project(projectName); // Object stored in array (contains the variables initialized in constructor)
    myProject.storeProject(); // Store the name as key and object as value in local storage, similar to array above
    projectArray.push(projectName);
    localStorage.setItem('projectOrder', JSON.stringify(projectArray));
    createToDoList(projectName);
    generateProjectDiv(sideBarList);
    projectDialog.close();
    document.querySelector('#projName').value = ''; // Since it no longer resets page
});

cancelProjectButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    projectDialog.close();
});


  


