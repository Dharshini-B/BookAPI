const mongoose = require("mongoose");

// Create Publication Schema
const PublicationSchema = mongoose.Schema( {
    id: {
        type: Number,
        required: true,
    },
    name: String,
    books: [String],
});

//Create Publication Model 
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports=PublicationModel;