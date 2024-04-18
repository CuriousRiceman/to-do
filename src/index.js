import './styles.css'; // This will not generate a link to the file in the html file, it will generate the css code in <style> tags if you check dev tools, better to use minimize css

const sidebar = document.querySelector('.sidebar-container');
const addButton = document.querySelector('.add-task-button');
const toDoList = document.querySelector('.to-do-list-container');
const dialog = document.querySelector('#new-task-dialog');
const submitButton = document.querySelector('.submit-button');
const cancelButton = document.querySelector('.cancel-button');


addButton.addEventListener("click", () => {
    dialog.showModal();
});
  
// submitButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     const titleValue = titleInput.value;
//     const authorValue = authorInput.value;
//     const pageValue = pagesInput.value;
//     const readValue = readCheckbox.checked;
//     dialog.close();
// });

cancelButton.addEventListener("click", () => {
    dialog.close();
});
  





