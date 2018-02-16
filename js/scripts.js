
//===== Version 3.0 of todo app =====

//Declaring all variables/constants
var completedList = document.querySelector('#completed-tasks'),
    incompleteList = document.querySelector('#incomplete-tasks'),
    taskInput = document.querySelector('#new-input'),
    editPopup = document.querySelector('.edit-popup'),// Edit editPopup
    editToDo = document.querySelector('.list-edit'),//edit input box
    addButton = document.querySelector('.add-button'),
    editTodoForm = document.forms.editToDo, //Just to make things down below more readable and easier to type
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
  this.checkbox.classList.add('fa', 'fa-circle-o');

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
      createTaskElement.li.style.listStyleType = 'none';
      createTaskElement.li.style.fontSize = '18px';
      createTaskElement.li.style.marginBottom = '30px';//Make font bigger and no bullets

      incompleteList.append(createTaskElement.li); //The createTaskElement.li accesses the li element created in the TodoItem object constructor function and adds it to the HTML in the incompleted UL

      taskInput.value = ''; //Clears the input on the
    }
  });
}


// =========== Remove an item from the array =========
  var removeFromArray = function(arrayToRemoveFrom, whatToRemove){
    for (var i = 0; i < arrayToRemoveFrom.length; i++) {
      if (arrayToRemoveFrom[i] === whatToRemove) {
        arrayToRemoveFrom.splice(i, 1);
      }
    }
  };

  // ======== Delete an item from the todo-list ======
  var deleteThisTask = function(whichItem){
    var confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete == true) {
      console.log('Deleting Task...');
      var todoText = whichItem.textContent; //Puts current todo text in this variable to log to the console... not necessary

      if (whichItem.parentElement === incompleteList) { //Tests if the list item that is trying to be removed is in the incompleteList

        incompleteList.removeChild(whichItem); //removes the list item
        removeFromArray(incompleteTaskArray, whichItem.textContent); //removes the text from the given array that was in the todo list
        console.log(`Deleted your todo: ${todoText}`);

      }else if (whichItem.parentElement === completedList) {
        completedList.removeChild(whichItem);
        removeFromArray(completedTaskArray, whichItem.tectContent);
        console.log(`Deleted your todo: ${todoText}`);

      }
    }else{
      //do Nothing
      console.log('Task deletion was cancelled');
    }
  }//END of delete task


  // ============= EDIT AN ITEM in the todo list ==============

  var editThisTask = function(whichItem){
    editToDo.value = whichItem.textContent; //Give input value the same text thats in the LI todo item

    editPopup.classList.remove('hidden'); //Show the edit modal
    //Give the Save button a listener
    editTodoForm.save.addEventListener('click', function(e){
      saveEdits(e)
    });
    document.addEventListener('keypress', function(e){
      saveEdits(e)
    });

    var saveEdits = function(e){
      if (e.target === editTodoForm.save || e.keyCode === 13) {
        e.preventDefault(); //Prevent clicking save from submitting the form.
        if (editToDo.value.length === 0) { //If nothing is inputted/blank, hide the edit editPopup
          editPopup.classList.add('hidden');
        }else {
          var editedTodoText = editToDo.value;
          //In order for this to work, we have to create a new instance of the TodoItem object constructor function and replace the old one with the new one
          var replacingTask = new TodoItem(editedTodoText);//Creating new todo
          replacingTask.li.style.listStyleType = 'none';
          replacingTask.li.style.fontSize = '18px';
          replacingTask.li.style.marginBottom = '30px';//Make font bigger and no bullets

          editPopup.classList.add('hidden');//Hiding editPopup

          for (var i = 0; i <= incompleteTaskArray.length; i++) {
            if (incompleteTaskArray[i] === whichItem.textContent) {
              incompleteTaskArray.splice(i, 1, editedTodoText); //Deletes old todo text in the incompleteTaskArray and replaces it with what was entered in the editPopup
            }
          }//End of array changes

          incompleteList.replaceChild(replacingTask.li, whichItem);
          editToDo.value = '';
        }
        editTodoForm.save.removeEventListener('click', function(e){
          saveEdits(e)
        });
        document.removeEventListener('keypress', function(e){
          saveEdits(e)
        });
      }
    }
  }

//===================  LOCAL STORAGE  ======================+
var loadLocalStorage = function(whichArray){
  for (var i = 0; i < whichArray.length; i++) {
    if (whichArray[i] !== undefined && whichArray[i] !== null) { //Validation
      var todoText = whichArray[i];
    }
  }
}

// ================  Add listeners for the edit, complete, and delete buttons  =======================


var actionButtonListeners = function(){
  document.addEventListener('click', function(event){
    var whichItem = event.target.parentElement;
    //whichItem targets the parent LI element of whatever icon was clicked. so if you clicked the complete circle, it will return 'incompleteList', but if you click for instance on the delete button on the COMPLETED area, it will return 'completedList'

    switch (event.target.classList[1]) {//Switch is easier than a if | the [1] gives us the second class in the classList for the LI elements' button that was clicked on
      case 'fa-circle-o':
        checkOffThisTask(whichItem);
        break;

      case 'fa-check-circle':
        uncheckOffThisTask(whichItem);
        break;

      case 'fa-pencil-square-o':
        editThisTask(whichItem);
        break;

      case 'fa-times-circle':
        deleteThisTask(whichItem);
        break;

    }
  });
}//End of button actionButtonListeners


//Running functions that need to be ran
inputtedText();

actionButtonListeners();
