/**
 * Created by admin on 20.10.2015.
 */
module.exports  =   function(app){
    app.get('/', function(req, res){
        res.render('index.html')
    });

    app.get('/about', function(req,res){
        res.render('about.html');
    });
}