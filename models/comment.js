var mongoose = require("mongoose");

//SCHEMA - comment

var commentSchema = mongoose.Schema({
    text: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    author: {                                       //here we added author as an object that has two properties, id and username
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Comment", commentSchema);