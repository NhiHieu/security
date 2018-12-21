const mongoose = require('mongoose')

const {Schema} = mongoose;

const commentSchema = new Schema({
    author:{
        type: String
    },
    description:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema);