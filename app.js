var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taiwanRouter = require('./routes/taiwan');
var prepareRouter = require('./routes/prepare');




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
app.use('/taiwan', taiwanRouter);
app.use('/prepare', prepareRouter);


// 抓取電力資料

function scheduleCronstyle(){
  schedule.scheduleJob('*/5 * * * * *', function(){
    fetch('http://data.taipower.com.tw/opendata01/apply/file/d006001/001.txt')
    .then(res => {
        const dest = fs.createWriteStream('./public/data/10min.json');
        res.body.pipe(dest);
        console.log('發電狀況更新' + new Date());
    }).catch(function(error) {
      console.log("Error無法更新");
  });  

  fetch('https://quality.data.gov.tw/dq_download_json.php?nid=25850&md5_url=8f9c784aae351f5834df4d9657df612b')
  .then(res => {
      const dest = fs.createWriteStream('./public/data/prepare.json');
      res.body.pipe(dest);
      console.log('備轉容量更新' + new Date());
  }).catch(function(error) {
    console.log("Error無法更新");
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


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

module.exports = app;


