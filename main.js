import express from 'express'; // express에서는 기본적으로 POST 기능을 제공하지 않는다. 따라서 body-parser 라는 미들웨어를 설치해야한다.
import http from 'http';
import url from 'url'; // 요청한 url을 객체로 만들기 위해 url 모듈 사용.
import path from 'path';
import ejs from 'ejs';
import database from './config/database.js';
import bodyParser from 'body-parser'; // POST로 요청된 body를 쉽게 추출할 수 있는 모듈.
import bcrypt from 'bcrypt';

const __dirname = path.resolve();
const app = express();

// body-parser 사용
app.use(bodyParser.urlencoded({
    // extended 는 중첩된 객체표현을 허용할지 말지를 정한다.
    extended : false
}));

var dbConn = database.init();

// DB 연결 확인
var dbConn = database.dbConnCheck(dbConn);

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
console.log(__dirname);

// login 화면으로
app.get('/login', function(req, res) {
    res.render('login', {});
});

// login
app.post('/login', function(req, res) {
    var inputID = req.body.inputID;
    var inputPW = req.body.inputPW;

    console.log(`ID : ${inputID}, PW : ${inputPW}`);
});

// 회원 가입
app.post('/singin', function(req, res) {
    
});

// 선수 추가 화면으로
app.get('/player', function(req, res) {
    res.render('player', {});
});

app.listen(3000);