// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Post Route

app.post('/sendprojectdata',(req,res) => {
    projectData = req.body
})
// Callback to debug
app.get('/getprojectdata' , (req,res) => {
    res.send(projectData)
})


// Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log("server is runing on localhost: " + port);
};
