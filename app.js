const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
//import all routes
const poll = require('./routes/poll')


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(cors());

//use routes
app.use('/poll', poll);



const port = 3000;

//start server
app.listen(port, () => console.log(`Server started on port ${port}`));


