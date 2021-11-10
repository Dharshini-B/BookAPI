//Import Express
const express = require("express");

//Initialisation of the express application
const OurAPP = express();

OurAPP.get("/",(request,response) => { // routing root route(localhost), get->http method
    response.json({message : "Request Served!"}); // convert data to json
});

OurAPP.listen(4000,() => console.log("Server is running")); // listen to port 4000