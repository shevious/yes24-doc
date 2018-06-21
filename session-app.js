var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// session

var bodyParser = require('body-parser');//POST 방식 전송을 위해서 필요함

var app = express();

app.use(bodyParser.urlencoded({extended: false}));//미들웨어 등록부분

//resave 세션아이디를 접속할때마다 발급하지 않는다

app.use(session({

    secret: '12312dajfj23rj2po4$#%@#',

    resave: false,

    saveUninitialized: true

}));





app.get('/welcome', function(req, res){

    if(req.session.displayName){//값이 있으면 로그인 성공

        res.send(`

<h1>Hello, ${req.session.displayName}</h1>

<a href="/auth/logout">logout</a>

`);

    }else{//값이 없으면 로그인에 실패 혹은 로그인 안한사람

        res.send(`

<h1>Welcome</h1>

<a href="/auth/login">Login</a>

`);

    }

});




app.post('/auth/login', function(req, res){

    var user = {//현재 유저는 한개만 있음

        username:'111',

        password:'111',

        displayName:'test'

    };

    var uname = req.body.username;//POST방식으로 보낸 값을 가져옴

    var pwd = req.body.password;

    if(uname === user.username && pwd === user.password){//아이디와 패스워드 둘다 같으면

        req.session.displayName = user.displayName;

        res.redirect('/welcome');// welcome 페이지로 이동

    }else{//비밀번호가 틀리면

        res.send('who are you?<a href="/auth/login">login</a>');

    }

});



app.get('/auth/login', function(req, res){

    var output = `

<h1>Login</h1>

<form action="/auth/login" method="post">

<p>

<input type="text" name="username" placeholder="username">

</p>

<p>

<input type="password" name="password" placeholder="password">

</p>

<p>

<input type="submit">

</p>

</form>

`;

    res.send(output);

});



app.listen(3003, function(){

    console.log('Connected 3003 port!!!');

});





