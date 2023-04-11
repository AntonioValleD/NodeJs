const mongoose = require('mongoose');

// Database credentials
const user = 'admin';
const password = 'tVyr5wCQevXeX4s1';
let database = 'pokeDatabase';

if (process.env.NODE_ENV === 'test'){
    database = 'testdb';
}

const uri = `mongodb+srv://${user}:${password}@cluster0.bqariom.mongodb.net/${database}?retryWrites=true&w=majority`;

// Database connection
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database connected successfully');
})
.catch((error) => {
    console.log(error);
});


// Database models
const UserModel = mongoose.model('user', { 
        userId: String, 
        userName: String, 
        password: String 
});

const TeamModel = mongoose.model('team', { 
    userId: String, 
    team: Array
});


exports.UserModel = UserModel;
exports.TeamModel = TeamModel;