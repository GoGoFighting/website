var express = require('express');
var router = express.Router();
var blogs = require('./mongoose').blogs;
var messages = require('./mongoose').messages;
router.get('/add', function(req, res) {
    var message = new messages({
    	id: new Date().getTime(),
        blogId: parseInt(req.query.blogId),
        createTime: new Date(),
        content: req.query.content,
        userName: req.query.userName,
        userEmail: req.query.userEmail,
        deleteTime: 0
    });
    message.save(function(err, data) {
        messages.find({ blogId: parseInt(req.query.blogId) }).count().exec(function(e, length) {
            blogs.update({ id: parseInt(req.query.blogId) }, { $set: { messages: length } }).exec(function(f, docs) {
                res.json({ status: true });
            });
        });
    });
});
router.get('/get', function(req, res) {
    messages.find({ blogId: parseInt(req.query.blogId), deleteTime: 0}).count().exec(function(f, length) {
        messages.find({ blogId: parseInt(req.query.blogId), deleteTime: 0}).sort({ createTime: -1 }).limit(parseInt(req.query.limit)).exec(function(e, docs) {
            if (length > parseInt(req.query.limit)) {
                res.json({ list: docs, status: true, number: length });
            } else {
                res.json({ list: docs, status: false, number: length });
            }
        });
    });
});
router.get('/getBlogMessage', function(req, res) {
    messages.find({ blogId: parseInt(req.query.blogId) }).sort({ createTime: -1 }).exec(function(e, docs) {
        res.json({ list: docs });
    });
});
router.get('/set', function(req, res) {
	var data = {};
	if (req.query.isDelete === "true") {
        data.deleteTime = new Date().getTime();
    } else {
        data.deleteTime = 0;
    }
    messages.update({ blogId: parseInt(req.query.blogId), userName: req.query.userName, id: parseInt(req.query.id) }, { $set: data }).exec(function(e, docs) {
        res.json({ status: true });
    });
});
module.exports = router;