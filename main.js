import database from './config/database.js';

var dbConn = database.init();

// DB 연결 확인
var dbConn = database.dbConnCheck(dbConn);