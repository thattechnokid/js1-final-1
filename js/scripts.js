

var myListItems = document.getElementsByTagName('LI');

// Add the close button to the end of every list item

for (var i = 0; i < myListItems.length; i++) {
  //To add a textNode, you have to create an element first, so I used a span element.. I could technically use a paragraph or an h4 or something


    var spanElement = document.createElement('SPAN');

    //Creates the close/delete sign
    var txt = document.createTextNode('\u00D7');

    // adds delete class to spanElement
    spanElement.className = 'delete';

    // Adds the close txt to the span element
    spanElement.appendChild(txt);

    // Adds the span element to each of the LI items
    myListItems[i].appendChild(spanElement);
}

// ----------------------------

//Getting all close/delete buttons
var close = document.getElementsByClassName('delete');

// if clicked on, the parent element (LI) will be hidden in the DOM
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    // var count = close.length.value;
    div.style.display = 'none';
    // count--;
  }
}


// -------------------------------

// Adding a checkmark to completed To-Do's

var listItems = document.querySelector('ul');
//Listens to a click in the first instance of a UL element... basically the first UL made in the HTML file
listItems.addEventListener('click',function(event){
  if (event.target.tagName === 'LI') {
    //listens to see if the click was triggered by an LI element, and then toggles the checked class to that LI element.
    event.target.classList.toggle('checked');
  }
}, false); //The default return is false.

// -----------------------------------
function newItem(){
//Allow user to add any to do to the list by
  var newListItem = document.createElement('LI');
  var newInput = document.getElementById('myInput').value; //What the user inputted
  var t = document.createTextNode(newInput);

  newListItem.appendChild(t);// Adds input text to the LI element

  //Dont allow BLANK inputs:
  if (newInput === '') {
    alert("You MUST Write something for your To-Do Item!");
  } else {
    document.getElementById('myList').appendChild(newListItem); //Adds the actual LI element into the UL part of the HTML document
  }

  // Reset/clear the input field after clicking the add button
  document.getElementById('myInput').value = '';

  // Add the close button to the new list item. Yes, it wont do it unless you add this:
  var newSpan = document.createElement('SPAN');
  var spanTxt = document.createTextNode('\u00D7');
  newSpan.className = 'delete';
  newSpan.appendChild(spanTxt);
  newListItem.appendChild(newSpan);

  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.display = 'none';
    }

  }
  // ---------------  EDIT Todo items  -----------------

  var editBox = document.createElement('SPAN'); //Added element
  var editLabel = document.createTextNode('Edit'); //Made txt node
  editBox.className = 'edit';
  editBox.appendChild(editLabel);
  newListItem.appendChild(editBox);// Added edit sign to each element

  var editMe = document.getElementsByClassName('edit');
  for (var i = 0; i < editMe.length; i++) {
    editMe[i].onclick = function(){
      var editInput = document.createElement('INPUT');
      var oldText = document.createTextNode(newInput[i]);
      editInput.appendChild(oldText);
      newListItem.replaceChild(editInput, newInput[i]);
    }
  }

} //End of added new items
