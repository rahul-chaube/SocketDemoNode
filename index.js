var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Message=require('./MessageSchema');
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected  '+socket.id);

     socket.on("join",function (userName) {
      console.log("new User "+userName);
      
      io.emit("newJoin",userName+" join the group");
    });

    socket.on("command",function (message) {
      
      console.log("command Received "+message);
      io.emit("command","Command Received "+message);
    });
    socket.on('chat message', function(msg){
      console.log(msg);
        var message=new Message(msg);
        message.save(function (error) {
          if(error)
          {
            console.log(error);
            throw error;
            
          }
          Message.find({},function(err,message){
            if(err) throw err;
            // res.send(message);
            io.emit('chat message', message);
        });
          console.log("Message Save on Database");
          
        });
    
      });
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
   
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});