//import eventemitter class
const EventEmitter = require('events');

//create event class
class Button extends EventEmitter {};

// create object
const button = new Button();


button.on('click', ()=>{
    console.log("button clicked");
});


button.on('mouseover', ()=>{
    console.log("mouse is over the button");
});

//trigger events
button.emit('click');
button.emit('mouseover');
