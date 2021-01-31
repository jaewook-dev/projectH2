import express from 'express'; // express에서는 기본적으로 POST 기능을 제공하지 않는다. 따라서 body-parser 라는 미들웨어를 설치해야한다.
import http from 'http';
import url from 'url'; // 요청한 url을 객체로 만들기 위해 url 모듈 사용.
import path from 'path';
import ejs from 'ejs';
import database from './config/database.js';
import bodyParser from 'body-parser'; // POST로 요청된 body를 쉽게 추출할 수 있는 모듈.
import bcrypt from 'bcrypt';
import consoleStamp from 'console-stamp'; // console.log 시간 정보 추가

const __dirname = path.resolve();
const app = express();
consoleStamp(console, ['yyyy/mm/dd HH:MM:ss.l']); // console-stamp pattern 설정

// body-parser 사용
app.use(bodyParser.urlencoded({
    // extended 는 중첩된 객체표현을 허용할지 말지를 정한다.
    extended : false
}));

var dbConn = database.init();

// DB 연결 확인
database.dbConnCheck(dbConn);

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

    var idCheckSql = "SELECT MEMBER_ID, MEMBER_NAME FROM MEMBER_INF WHERE MEMBER_ID = ?";

    dbConn.query(idCheckSql, [inputID], function(err, results){
        
        if(err) {
            console.log(err);
        } 

        var memberID = results[0];

        if(memberID == null) {
            console.log("login fail");
            res.send("login fail!!");
        } else {

        }

        console.log(results[0]);
    });
    
});

// 회원 가입
app.post('/singin', function(req, res) {
    
});

// 선수 추가 화면으로
app.get('/player', function(req, res) {
    res.render('player', {});
});

app.post('/player', function(req, res) {
    var memberName = req.body.memberName;
    var playerName = req.body.playerName;
    var playerMainPosition = req.body.playerMainPosition;
    var playerClass = req.body.playerClass;
    var playerLevel = req.body.playerLevel;
    var playerAge = req.body.playerAge;
    var playerType = req.body.playerType;
    var playerOrder = req.body.playerOrder;

    var insertPlayerSQL = "INSERT INTO MEMBER_PLAYER (MEMBER_NAME, PLAYER_NAME, PLAYER_POSITION_MAIN, PLAYER_CLASS, PLAYER_LEVEL, PLAYER_AGE, PLAYER_TYPE, PLAYER_ORDER) VALUES (?, ?, ?, ?, ?, ?, ?)";

    dbConn.query(insertPlayerSQL, [memberName, playerName, playerMainPosition, playerClass, playerLevel, playerAge, playerType, playerOrder], function(err, results){

        if(err) {
            console.log(err);
        } 

    });

    delete req.body;

    res.render('player', {});
});

app.listen(3000);