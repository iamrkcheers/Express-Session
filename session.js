var session=require("express-session");
//var express=require("express");
//var app=express();
app.use(session({
    secret:'Donald Trump',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true,maxAge:60000}
}));
app.get('/login.html',function(req,res,next){
    var session=req.session;
    session.userid=req.param.userid;
});
app.get('/anime.html',function(req,res,next){
    var session=req.session;
    if(!session.userid)
        res.sendFile('login.html');
});
app.get('/',function(req,res,next){
    var session=req.session;
    if(session.views){
        session.views++;
        res.writeHead('Content-Type','text/html');
        res.write("<h1>Session Views are : "+session.views+"</h1>");
        res.write("<h1>Expires in : "+(session.cookie.maxAge/1000)+"</h1>");
        res.end();
    }
    else{
        session.views=1;
        res.write("<h1>Hello, How are .. Khaana khaake jaana !</h1>");
    }
});