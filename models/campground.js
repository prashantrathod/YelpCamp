var mongoose = require("mongoose");
var Comment = require("./comment");


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:        String,
    price:       String,
    image:       String,
    location:    String,
    lat:         Number,
    lng:         Number,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Compile Schema in to a model:
module.exports = mongoose.model("Campground", campgroundSchema); // makes a model using the schema above
