
// ----------  Declaring all variables  ------------

// Input box for making new item
var newInput = document.getElementById('new-task');

// [0] grabs 1st instance of the button element in the Document, and that is the add button
var addBtn = document.getElementsByTagName('span')[0];

// Incomplete task List
var incompleteTaskList = document.getElementById('incomplete-tasks');

//complete task List
var completeTaskList = document.getElementById('completed-tasks');

/************************
******** New Item *******
*************************/

var createNewTodo = function(todoString){
  //Creating vars for different elements

  var listItem = document.createElement('li'); // new LI

  //LI todo elements:
  var checkBox = document.createElement('input'); //Will change type to a checkbox later...
  var label = document.createElement('label');
  var editInput = document.createElement('input'); //The input box that can be used to edit the todo Item

  var editBtn = document.createElement('button');
  var deleteBtn = document.createElement('button');

  // Modifying elements to the right types, etc.
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editBtn.innerText = 'Edit'; //Making sure that the new buttons that are added to new elements say "Edit" inside of them
  editBtn.className = 'edit';
  deleteBtn.innerText = 'Delete';
  deleteBtn.className = 'delete';

  label.innerText = todoString; //Whatever string is passed through the text box will be appended to the label of the todo Item

  // appending items to the LI element that is added to the list in order
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  return listItem;

}

//////ADD A NEW TASK///////////////////////////////////////////////////
//this takes the listItem returned in the function above

var addTask = function(){
  console.log("Add task...");

   //Create a new LI w/ text from #new-task:
  var listItem = createNewTodo(newInput.value);

  //Append listItem to incompleteTaskList
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  //Clear out input after button is pushed
  newInput.value = "";

}


//Edit an existing task//////////////////////////////////////////////////

var editTask = function() {
  console.log("Edit task");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");


  //Check to see if parent is in .editMode
  if (containsClass){

    //Switch from .editMode
    //Label's text becomes the input's value
    label.innerText = editInput.value;


  } else {

    //Switch to .editMode
    //Input's value becomes the label's text
    editInput.value = label.innerText
  }


    //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");

}



//Delete existing task/////////////////////////////////////////////////

var deleteTask = function(){
  console.log("delete task");

  //Remove parent LI from UL
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);

}


//Mark task as complete////////////////////////////////////////////////

var taskCompleted = function() {
  console.log("complete task");

  //append task LI to the #completed-tasks
  var listItem = this.parentNode;
  completeTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

//Mark task as incomplete////////////////////////////////////////////////

var taskIncomplete = function() {
  console.log("incomplete task");

  //append task LI to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

}


//BIND TASK EVENTS//////////////////////////////////////////////
//Selects necessary elements, binds event handlers to them
//Calls functions when those events happen.


var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind li events");

  //Select li's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editBtn = taskListItem.querySelector("button.edit");
  var deleteBtn = taskListItem.querySelector("button.delete");

   //bind  editTask function to edit button
  editBtn.onclick = editTask;

    //bind deleteTask function to delete button
  deleteBtn.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request");

}


//Set the click handler to the addTask function
addBtn.addEventListener("click", addTask);

//Set another click to perform an ajax request
addBtn.addEventListener("click", ajaxRequest);


//Cycle over incompleteTaskList ul items
  //for each li, bind events to li children (taskcCompleted)
for (var i = 0; i < incompleteTaskList.children.length; i += 1){
  bindTaskEvents(incompleteTaskList.children[i],taskCompleted);
}

//Cycle over completeTaskList ul items
   //for each li
    //bind events to li children [taskIncomplete]
for (var i = 0; i < completeTaskList.children.length; i += 1){
  bindTaskEvents(completeTaskList.children[i],taskIncomplete);
}

//taskInput is the same as this: document.getElementById("new-task");
//add event listener for key up event and pass in event object
//event can be named anything you like although it's more intuitive
//to use event or ev or e
newInput.addEventListener('keyup', function (event) {
  //check to see if the enter key was pressed
  if (event.which === 13) {
    //if so, run the addTask function
    addTask();
  }
});
