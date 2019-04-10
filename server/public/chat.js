const socket = io.connect('http://localhost:8000');

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// new event listener for the sending message
btn.addEventListener('click',function (){
    socket.emit('chat',{
        message : message.value,
        handle : handle.value
    })
});

//new event for keypress
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value)
})

//handling keypress event
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing....</p></em>'
})

//displaying the messages 
socket.on('chat', function(data){
    feedback.innerHTML ="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message +'</p>'
})