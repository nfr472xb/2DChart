var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Router = require('./routes/taiwan');

var app = express();

var fetch = require('node-fetch');
var fs=require('fs');  
var schedule = require('node-schedule');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/taiwan', Router);


// 抓取電力資料

function scheduleCronstyle(){
  schedule.scheduleJob('*/5 * * * * *', function(){
    fetch('http://data.taipower.com.tw/opendata01/apply/file/d006001/001.txt')
    .then(res => {
        const dest = fs.createWriteStream('./public/data/10min.json');
        res.body.pipe(dest);
        console.log('檔案更新' + new Date());
    }).catch(function(error) {
      console.log("這不行了");
  });  
  });   
}
scheduleCronstyle();



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

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'));

module.exports = app;
