var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/website');
var messageSchema = new mongoose.Schema({
	id: {
		type: Number,
        required: true
	},
    blogId: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        required: true
    },
    deleteTime: {
        type: Number,
        required: true
    }
}, { safe: true });
var messages = mongoose.model('message', messageSchema);


var blogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    con: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        required: true
    },
    deleteTime: {
        type: Number,
        required: true
    },
    messages: {
        type: Number,
        required: true
    }
}, { safe: true });
var blogs = mongoose.model('blogs', blogSchema);

module.exports = {
	blogs: blogs,
	messages: messages
};
