
// ----------  Declaring all variables  ------------

// Input box for making new item
var newInput = document.getElementById('new-task');

// [0] grabs 1st instance of the button element in the Document, and that is the add button
var addBtn = document.getElementsByTagName('button')[0];

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
