//the array of tasks objects
var Tasks = [];
//the id of tasks
var numberOfTasks = 0;
//the add button
var submitButton = document.getElementById('submitButton');
//edit mode
var editMode = {
    state: false,
    editID: -1,
};

submitButton.onclick = addTask;


//function to add tasks, creates the task object and creates html task entity
function addTask(){
    if (form.taskName.value == '' || form.taskLong.value == '' || form.taskLat.value == ''){
        alert('Please enter all fields');
    } else if (form.taskName.value.length > 10){
        alert('The task name is too long');
    } else {
        var newTask = {
            name: form.taskName.value,
            spec: form.select.value,
            lng: form.taskLong.value,
            lat: form.taskLat.value,
            id: numberOfTasks,
        };
        Tasks.push(newTask);

        var myDiv = document.getElementById('div');
        myDiv.insertAdjacentHTML('beforeend',
            `<li class="list" id="${numberOfTasks}">` +
            `<div class="name" align="center">${newTask.name}</div>` +
            `<div class="spec" align="center">${newTask.spec}</div>` +
            `<div class="lng" align="center">${newTask.lng}</div>` +
            `<div class="lat" align="center">${newTask.lat}</div>` +
            `<input type="button"` +
            `class="delete"` +
            `value="Delete"></<input>` +
            `<input type="button"` +
            `class="edit"` +
            `value="Edit"></<input></li>`);
        document.getElementById("form").reset();
        numberOfTasks++;
        }
};

//function to edit a task, you can edit them in main form
function editTask(){
    if (form.taskName.value == '' || form.taskLong.value == '' || form.taskLat.value == ''){
        alert('Please enter all fields');
    } else if (form.taskName.value.length > 15){
        alert('The task name is too long');
    } else {
        var newTask = {
            name: form.taskName.value,
            spec: form.select.value,
            lng: form.taskLong.value,
            lat: form.taskLat.value,
            id: editMode.editID,
        };

        Tasks[getIndexById(editMode.editID)] = newTask;
        var taskInList = document.getElementById(editMode.editID);
        taskInList.childNodes[0].childNodes[0].nodeValue = newTask.name;
        taskInList.childNodes[1].childNodes[0].nodeValue = newTask.spec;
        taskInList.childNodes[2].childNodes[0].nodeValue = newTask.lng;
        taskInList.childNodes[3].childNodes[0].nodeValue = newTask.lat;
        submitButton.onclick = addTask;
        editMode.state = false;
        editMode.editID = -1;
        document.getElementById("form").reset();
        submitButton.value = 'Add';
        console.log(Tasks);
    }
}

//events for delete and edit buttons which are created dynamically
const listOfTasks = document.querySelector('div');
listOfTasks.addEventListener('click', event => {

    if (event.target.classList.contains('delete') && editMode.state === false){
        var delitionElem =  event.target.parentNode;
        var delitionId = delitionElem.id;
        delitionElem.remove();
        Tasks = Tasks.filter(task => task.id != delitionId);
    }

    if (event.target.classList.contains('edit') && editMode.state === false){
        editMode.state = true;
        var editElem =  event.target.parentNode;
        editMode.editID = editElem.id;
        submitButton.onclick = editTask;
        submitButton.value = 'Save';
        var index =  getIndexById(editMode.editID);
        //fill the forms with value before, so you can edit it
        var editTaskName = document.getElementsByName('taskName');
        editTaskName[0].value = Tasks[index].name;
        var editTaskLng = document.getElementsByName('taskLong');
        editTaskLng[0].value = Tasks[index].lng;
        var editTaskLat = document.getElementsByName('taskLat');
        editTaskLat[0].value = Tasks[index].lat;
    }
});

//get index of element with id
function getIndexById(id){
    var index = Tasks.findIndex(task => task.id == id);
    console.log('aaaaa', index);
    return index;
}