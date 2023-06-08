const mongoose  = require("mongoose");
const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now

    }
});
async function run(){
    await mongoose.connect('mongodb+srv://soulhacker1254:hemant@cluster0.thwvy4u.mongodb.net/eatmania?retryWrites=true&w=majority');

}
run();
module.exports = mongoose.model('users', UserSchema);

// console.log("point 1")



