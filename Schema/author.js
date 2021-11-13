const mongoose = require("mongoose");

// Create Author Schema
const AuthorSchema = mongoose.Schema( {
    id: {
        type: Number,
        required: true,
    },
    name: String,
    books: [String],
});

//Create Author Model 
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports=AuthorModel;