var socket  = io.connect();

socket.on('connect', function(data){
    document.getElementById("status").innerHTML="Status: Websocket connected.";
})
socket.on('ConnectionRefused', function(data){
    socket.disconnect();
    document.getElementById("status").innerHTML="Status:Refused! Websocket disconnected.";
})
socket.on('status-update', function(data) {
    ReceivedStatusUpdate(data.message)
})


function sendFieldUpdate(field){
    socket.emit('field-update',{message: field});
}


function sendStateUpdate(newState){
    socket.emit('status-update',{message: newState});
}
