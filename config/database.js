import mysql from 'mysql';
import os from 'os'; // 호스트 이름 가져오기 위한 모듈

var dbInfo = {
    dev : {
        host : 'localhost',
        port : '3306',
        user : 'admin',
        password : 'admin',
        database : 'webdb',
        multipleStatements : true // 다중 쿼리를 한번에 처리
    }

    // REAL DB는 추후에 추가
};

var dbConnection = {
    init : function() {
        var hostName = os.hostname();

        // 로컬 개발환경에서 mysql.createConnection()
        if(hostName == 'DESKTOP-NHP7CJ2') {
            return mysql.createConnection(dbInfo.dev); 
        }
        // REAL DB 추가시 else문으로 빠지면 됨
    }, 

    dbConnCheck : function(conn) {
        conn.connect(function(err) {
            if(err) {
                console.log("mysql connection error : " + err);
            } else {
                console.log("mysql connected successfully!");
            }
        });
    }
};

//module.exports = dbConnection; // 이거 왜 안됨?
export default dbConnection

