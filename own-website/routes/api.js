var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/website');
var blogs = mongoose.model('blogs', {});
/*
 * BLOGS
 */
router.get('/blogs.do', function(req, res) {
    var data = {};
    if (req.query.key) {
        data.title = new RegExp(req.query.key);
    }
    blogs.find(data).count().exec(function(f, length) {
        blogs.find(data).sort({ id: -1 }).limit(parseInt(req.query.limit)).exec(function(e, docs) {
            if (length > parseInt(req.query.limit)) {
                res.json({ list: docs, status: true });
            } else {
                res.json({ list: docs, status: false });
            }
        });
    });
});
router.get('/blog.do', function(req, res) {
    req.query.id = parseInt(req.query.id);
    blogs.find(req.query).exec(function(e, docs) {
        res.json(docs);
    });
});
module.exports = router;
