var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:rahul@cluster0-vuugs.mongodb.net/eScan?retryWrites=true', { useNewUrlParser: true, useFindAndModify: false });
var Schema = mongoose.Schema;

var message=new Schema({
    time:String,
    name:String,
    admessageType:String,
    message:String,
    created_at:Date,
    updated_at:Date
    });
    message.pre('save', function(next) {
        // get the current date
        var currentDate = new Date();
      
        // change the updated_at field to current date
        this.updated_at = currentDate;
      
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
          this.created_at = currentDate;
      
        next();
      });
    var Message=mongoose.model('Message',message);
    module.exports=Message;