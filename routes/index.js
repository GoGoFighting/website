var express = require('express');
var router = express.Router();
/*HOME*/
router.get('/', function(req, res, next) {
    res.render('index', {});
});
/*BLOGS MENU*/
router.get('/blogs', function(req, res, next) {
    res.render('blogs', {});
});
/*BLOG DETAIL*/
router.get('/about', function(req, res, next) {
    res.render('about', {});
});
/*ABOUT ME*/
router.get('/blog', function(req, res, next) {
    res.render('blog', {});
});
/*BACKSTAGE*/
router.get('/backstage', function(req, res, next) {
    res.render('backstage', {});
});
module.exports = router;
