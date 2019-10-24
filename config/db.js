const mongoose = require('mongoose');
//map global promises
mongoose.Promise = global.Promise;


//mongoose connect
mongoose.connect('mongodb+srv://Ebz:Ebun0325@cluster0-exzpc.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected'))
.catch (err => console.log(err));