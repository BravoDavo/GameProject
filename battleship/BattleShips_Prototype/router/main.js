/**
 * Created by admin on 20.10.2015.
 */
var express = require('express');
var router  = express.Router();




    router.get('/', function(req, res){
        res.render('index.html')
    });

    router.get('/about', function(req,res){
        res.render('about.html');
    });




module.exports = router;
