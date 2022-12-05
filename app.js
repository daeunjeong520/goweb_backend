/* express 앱과 mySql 연결 */

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
// passportConfig();
app.set('port', process.env.PORT || 3000);

const { sequelize } = require('./models');


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));

// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false
//     },
// }));

// app.use(passport.initialized());
// app.use(passport.session());

// router
require('./routes/showPost')(app);
require('./routes/naver')(app);
require('./routes/signUp')(app);
require('./routes/login')(app);
require('./routes/cart')(app);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});