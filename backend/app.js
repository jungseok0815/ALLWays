const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const corsMiddleware = require('./src/middleware/cors');
const loginRouter = require('./src/routes/login');
const joinRouter = require('./src/routes/join');
const findIdRouter = require('./src/routes/findid/findId');
const findPasswordRouter = require('./src/routes/findpassword/findPassword');
const sendEmail_IdRouter = require('./src/routes/findid/sendEmail-id');
const sendEmail_PasswordRouter = require('./src/routes/findpassword/sendEmail-password');
const checkCodeRouter = require('./src/routes/findpassword/resetcode/checkResetcode');
const changePasswordRouter = require('./src/routes/findpassword/resetcode/changePassword');
const favoriteRouter = require('./src/routes/FavoritesData/FavoritesData');
// const version = require('./src/routes/version');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const {sequelize, User} = require('./models');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);



const app = express();


const options = {
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "9401",
  database: "mapproject",
};


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MySQLStore(options),
    resave: false,
    saveUninitialized: false,
  })
);
app.set('port', process.env.PORT || 3001);

// 'html' 확장자를 사용하는 파일을 렌더링하는 엔진 설정
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

// views 폴더 경로 설정
app.set('views', path.join(__dirname, 'views'));

sequelize.sync({force: false}).then(()=> {
  console.log('데이터베이스 연결 성공');
}).catch((err) => {
  console.error(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(express.urlencoded({extended : false}));

app.use('/api/login', loginRouter);
app.use('/api/join', joinRouter);
app.use('/api/findId', findIdRouter);
app.use('/api/findPassword', findPasswordRouter);
app.use('/api/sendEmail-id', sendEmail_IdRouter);
app.use('/api/sendEmail-password', sendEmail_PasswordRouter);
app.use('/api/checkResetCode', checkCodeRouter);

app.use('/api/favorite',favoriteRouter)

app.use('/api/changePassword', changePasswordRouter);


// app.use('/version', version);




app.use((req, res, next) => {
  const error = new Error (`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});







const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
