require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//API
const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established! "))
  .catch((err) => {
    console.log(err);
  });
  
//Initialisation of the express application
const OurAPP = express();

OurAPP.use(express.json());

// Microservices
OurAPP.use("/book", Book);
OurAPP.use("/author", Author);
OurAPP.use("/publication", Publication);

OurAPP.get("/", (request, response) => {
  response.json({ message: "Server is working!" }); // convert data to json
});

OurAPP.listen(9000, () => console.log("Server is running")); // listen to port 9000
