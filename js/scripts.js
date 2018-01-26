// Add the close button to the end of every list item
var myListItems = document.getElementsByTagName('LI');

for (var i = 0; i < myListItems.length; i++) {
  //To add a textNode, you have to create an element first, so I used a span element.. I could technically use a paragraph or an h4 or something

    // NOTE:

    var spanElement = document.createElement('SPAN');

    //Creates the close/delete sign
    var txt = document.createTextNode('\u00D7');

    // adds deleteButton class to spanElement
    spanElement.className = 'deleteButton';

    // Adds the close txt to the span element
    spanElement.appendChild(txt);

    // Adds the span element to each of the LI items
    myListItems[i].appendChild(spanElement);
}

// ----------------------------

var close = document.getElementsByClassName('deleteButton');
