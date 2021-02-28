import express from 'express'; // express에서는 기본적으로 POST 기능을 제공하지 않는다. 따라서 body-parser 라는 미들웨어를 설치해야한다.
import http, { get } from 'http';
import url from 'url'; // 요청한 url을 객체로 만들기 위해 url 모듈 사용.
import path from 'path';
import ejs from 'ejs';
import database from './config/database.js';
import bodyParser from 'body-parser'; // POST로 요청된 body를 쉽게 추출할 수 있는 모듈.
import bcrypt from 'bcrypt';
import consoleStamp from 'console-stamp'; // console.log 시간 정보 추가
import expressLayouts from 'express-ejs-layouts'; // for layout

const __dirname = path.resolve();
const app = express();
consoleStamp(console, ['yyyy/mm/dd HH:MM:ss.l']); // console-stamp pattern 설정


app.use(bodyParser.urlencoded({
    // extended 는 중첩된 객체표현을 허용할지 말지를 정한다.
    extended : false
}));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));


app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');


/* -- DB 연결 확인 -- */
var dbConn = database.init();
database.dbConnCheck(dbConn);


/* -- 화면 Control -- */
// Main 화면
app.get('/', function(req, res) {
    res.render('main', {
        title : "test",
        link : "/css/main.css"
    });
});

// 로그인 화면
app.get('/login', function(req, res) {
    res.render('login', {});
});
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

// 선수 추가 화면
app.get('/player', function(req, res) {
    console.log('/player GET');
    res.render('player', {
        title : "선수 입력",
        link : "/css/main.css"
    });
});
// 선수 추가 화면
app.post('/player', function(req, res) {

    console.log('----- /player(POST) start -----');

    // 선수 정보 변수
    var memberName = req.body.memberName;
    var playerMainPosition = req.body.playerMainPosition;
    var playerName = req.body.playerName;
    var playerClass = req.body.playerClass;
    var playerType = req.body.playerType;
    var playerOrder = req.body.playerOrder;
    var playerLevel = req.body.playerLevel;
    var playerYear = req.body.playerYear;
    var playerAge = req.body.playerAge;
    var playerSubPosition = req.body.playerSubPosition;

    // body에 담겨 넘어온 prameter의 개수
    var paramCount = Object.keys(req.body).length;
    
    //console.log(req.body);

    // memberName은 하나로 들어오는데 나머지 값들은 배열로 들어온다. >> insert 시 에러남.
    // 임시 memberName 나중에 session으로 바꿔야 함.
    if(playerName.length > 1) {
        var arrMemberName = new Array();

        for(var i=0; i<playerName.length; i++) {
            arrMemberName[i] = memberName;
        }
    }

    console.log(req.body);

    var insertPlayerSQL = "";
    insertPlayerSQL += " INSERT INTO MEMBER_PLAYER ( ";
    insertPlayerSQL += "    MEMBER_NAME, PLAYER_MAIN_POSITION, PLAYER_NAME, PLAYER_CLASS, PLAYER_TYPE, PLAYER_ORDER, PLAYER_LEVEL, PLAYER_YEAR, PLAYER_AGE, PLAYER_SUB_POSITION ";
    insertPlayerSQL += " ) VALUES ? ";

    var insertPlayerValue = new Array();

    for(var i=0; i<playerName.length; i++) {
        insertPlayerValue[i] = [memberName, playerMainPosition[i], playerName[i], playerClass[i], playerType[i], playerOrder[i], playerLevel[i], playerYear[i], playerAge[i], playerSubPosition[i]];
    }

    console.log(insertPlayerValue);

    dbConn.query(insertPlayerSQL, [insertPlayerValue], function(err, results){

        if(err) {
            console.log(err);
        } else {
            console.log(results);
        }

    });

    console.log('----- /player(POST) end -----');
    res.redirect('/player'); // Get 방식으로 /player 화면 redirect
});

app.listen(3000);