var express = require('express');
var router = express.Router();
var blogs = require('./mongoose').blogs;
router.get('/get', function(req, res) {
    var data = {};
    if (req.query.key) {
        data.title = new RegExp(req.query.key);
    }
    data.deleteTime = 0;
    blogs.find(data).count().exec(function(f, length) {
        blogs.find(data).sort({ createTime: -1 }).limit(parseInt(req.query.limit)).exec(function(e, docs) {
            if (length > parseInt(req.query.limit)) {
                res.json({ list: docs, status: true });
            } else {
                res.json({ list: docs, status: false });
            }
        });
    });
});
router.get('/getAll', function(req, res) {
    var data = {};
    if (req.query.key) {
        data.title = new RegExp(req.query.key);
    }
    blogs.find(data).count().exec(function(f, length) {
        blogs.find(data).sort({ createTime: -1 }).limit(parseInt(req.query.limit)).exec(function(e, docs) {
            if (length > parseInt(req.query.limit)) {
                res.json({ list: docs, status: true });
            } else {
                res.json({ list: docs, status: false });
            }
        });
    });
});
router.get('/getOne', function(req, res) {
    req.query.id = parseInt(req.query.id);
    blogs.find(req.query).exec(function(e, docs) {
        res.json(docs);
    });
});
router.get('/add', function(req, res) {
    var blog = new blogs({
        id: new Date().getTime(),
        title: req.query.title,
        createTime: new Date(),
        con: req.query.con,
        deleteTime: 0,
        messages: 0
    });
    blog.save(function(err, data) {
        res.json({ status: true });
    });
});
router.get('/set', function(req, res) {
    var id = parseInt(req.query.id);
    var data = {};
    if (req.query.isDelete) {
        if (req.query.isDelete === "true") {
            data.deleteTime = new Date().getTime();
        } else {
            data.deleteTime = 0;
        }
    } else {
        data.title = req.query.title;
        data.con = req.query.con;
    }
    blogs.update({ id: id }, { $set: data }).exec(function(e, docs) {
        res.json({ status: true });
    });
});
module.exports = router;