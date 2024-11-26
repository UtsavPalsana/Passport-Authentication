const mongoose = require( 'mongoose' );

exports.connectMongoose = () => {
    mongoose.connect('mongodb://localhost:27017/admin').then((e) => console.log('Connected to mongodb : ${e.connection.host'))
    .catch((E) => console.log(e))
};

const userSchema = new mongoose.Schema({
    name : String,
    username: {
        type : String,
        required : true,
        unique  : true 
    },
    password: String,
    });


exports.User = mongoose.model("User", userSchema);
