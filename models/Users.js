const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    comments: [
        {type: Schema.Types.ObjectId, ref: 'Comment', required: false}
    ]
})

module.exports = mongoose.model('User', userSchema);