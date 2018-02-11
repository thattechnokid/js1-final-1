
//===== Version 3.0 of todo app =====

//Declaring all variables/constants
var completedList = document.querySelector('#completed-tasks'),
    incompleteList = document.querySelector('#incomplete-tasks'),
    taskInput = document.querySelector('#new-input'),
    editPopup = document.querySelector('.edit-popup'),
    addButton = document.querySelector('.add-button'),
    completedTaskArray = [],
    incompleteTaskArray = [];

//============  Local Storage Allocators  =============

var completedTaskStorage = localStorage.getItem(completedTaskArray),
    incompleteTaskStorage = localStorage.getItem(incompleteTaskArray),
    incompleteParsedArray = JSON.parse(incompleteTaskStorage) || [],
    completedParsedArray = JSON.parse(completedTaskStorage) || [];
    //If we dont add the || [], JS will throw an error if there is an empty storage thingy...lol


// This makes sure that before the page is closed/refreshed, the values of the completedTaskArray and the incompleteTaskArray are stringified, and added to the localStorage

window.onbeforeunload = function(){
  localStorage.setItem('completedTaskArray', JSON.stringify(completedTaskArray));
  localStorage.setItem('incompleteTaskArray', JSON.stringify('incompleteTaskArray'));
}

//================  THE Good Stuff!  =================

//Object constructor function
function TodoItem(text){
  //Finally figured out how the 'this' thing worked.... sorta
  this.li = document.createElement('li');
  this.li.textContent = text; //List element for Todo
  //Debating on using fontawesome or not
  this.checkbox = document.createElement('i');
  this.checked = document.createElement('i');//checked off Todo
  this.editButton = document.createElement('i');
  this.deleteButton = document.createElement('i');
  //------Trying Font-awesome with classes--------
  this.checkbox.classList.add('fa', 'fa-circle');

  //This next one needs to be hidden until the item is completed/checked, as per the strikeThrough() function below
  this.checked.classList.add('fa', 'fa-check-circle', 'hidden');
  this.editButton.classList.add('fa', 'fa-pencil-square-o');
  this.deleteButton.classList.add('fa', 'fa-times-circle');

  // add all icons to the List
  this.li.append(this.checkbox, this.checked, this.editButton, this.deleteButton);

  //strike-through the text and check off the box;
  this.strikeThrough = function(){
    this.li.classList.add('strike-through');
    this.checked.classList.remove('hidden');
    this.checkbox.classList.add('hidden');
    this.editButton.classList.add('hidden');
    //Edit button isnt needed since it is completed... duh
  }
}

//Add An item to the TOdo/incompleted list from the users' input
var inputtedText = function(){
  addButton.addEventListener('click', function(){ //add button click
    var inputText = taskInput.value; //gets user input text
    if (inputText.length > 0) { //Wont make a todo if no text is entered
      incompleteTaskArray.push(inputText); //Adding the text to the incompleted array to also be added to the localStorage later

      var createTaskElement = new TodoItem(inputText); //Create a new instance of the TodoItem object constructor function called createTaskElement

      incompleteList.append(createTaskElement.li); //The createTaskElement.li accesses the li element created in the TodoItem object constructor function and adds it to the HTML in the incompleted UL

      taskInput.value = ''; //Clears the input on the
    }
  });
}

inputtedText();
