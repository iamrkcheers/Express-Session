var exp=require("express");
var abc=exp();
var bp=require("body-parser");
var session=require("express-session");
//var express=require("express");
//var app=express();

abc.use(exp.static("folder"));
abc.use(bp.urlencoded({extended:false}));
abc.use(bp.json());
abc.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

abc.use(session({
    secret:'Donald Trump',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true,maxAge:60000}
}));
abc.get('/login.html',function(req,res,next){
    var session=req.session;
    session.userid=req.param.userid;
});
abc.get('/anime.html',function(req,res,next){
    var session=req.session;
    if(!session.userid)
        res.sendFile('login.html');
});
abc.get('/',function(req,res,next){
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

abc.get("/loginjson",function(req,res){
    var usage=require("./usage.js");
    usage.getUser(res);
});
abc.post("/loginpost",function(req,res){
    var usage=require("./usage.js");
    usage.addUser(req.body.id,req.body.usnm,req.body.pswd,res);
});
abc.listen(1234);