var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");



// View engine
app.set('view engine','ejs');

// Colocando Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cookieParser("udwaiudhiwuah"));

// Usando o Express Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// Usando o Flash
app.use(flash())

app.get("/",(req, res) =>{
    var emailError = req.flash("emailError");
    var nomeError = req.flash("pontosError");
    var pontosError = req.flash("nomeError")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined: emailError;

   res.render("index",{emailError,pontosError,nomeError});
})

app.post("/form",(req, res) =>{
    var {email, nome, pontos} = req.body;
    var emailError;
    var nomeError;
    var pontosError;


    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio!";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos!";
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio!";
    }

    if(nome.length < 4){
        nomeError = "O nome é muito pequeno!"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError",emailError);
        req.flash("pontosError",pontosError);
        req.flash("nomeError",nomeError);
        res.redirect("/")
    }else{
        res.send("SHOW DE BOLA ESSE FORM!")
    }
 
})



app.listen(3000,(req, res) => {
    console.log("Servidor Rodando")
})