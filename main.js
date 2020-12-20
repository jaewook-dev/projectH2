import express from 'express';
import http from 'http';
import url from 'url'; // 요청한 url을 객체로 만들기 위해 url 모듈 사용
import path from 'path';
import ejs from 'ejs';
import database from './config/database.js';

const __dirname = path.resolve();
const app = express();

var dbConn = database.init();

// DB 연결 확인
var dbConn = database.dbConnCheck(dbConn);

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
console.log(__dirname);

app.get('/', function(req, res) {
    res.render('login', {});
});

app.listen(3000);