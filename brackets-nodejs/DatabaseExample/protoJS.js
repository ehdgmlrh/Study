/**
 * 데이터베이스 사용하기
 * 
 * 몽고디비에 연결하고 클라이언트에서 로그인할 때 데이터베이스 연결하도록 만들기
 
 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 *    http://localhost:3000/public/login.html
 *
 * @date 2016-11-10
 * @author Mike
 */

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//===== 데이터베이스 연결 =====//

/*// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;
*/


// mongoose 모듈 불러오기
var mongoose = require('mongoose');

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터 베이스 모델 객체를 위한 변수 선언
var UserModel;


//데이터베이스에 연결
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/local';
	
	// 데이터베이스 연결
    console.log('데이터 베이스에 연결을 시도합니다');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function() {
        console.log('데이터 베이스에 연결되었습니다 : ' + databaseUrl);
        
        // 스키마 정의
        UserSchema = new mongoose.Schema({
            id: String,
            Password : String,
            name : String
        });
        console.log('UserSchema 정의함');
        
        //UserModel 모델 정의
        UserModel = mongoose.model('users', UserSchema);
        console.log('UserModel 정의함');
        
        
    });
    
    
    //연결이 끊어질 경우 5초후 재연결
    database.on('disconnected', function () {
        console.log('연결이 끊어졌습니다. 5초후 다시 연결합니다');
        setInterval(connectDB, 5000);
    });
}


//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 전송 확인 함수
router.route('/process/send').post(function(req, res) {
	console.log('/process/send 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    console.log('요청 파라미터 req의 body 확인');
    console.dir(req.body);
    
    addUser(database, paramId, paramPassword, paramName);
    
});

//사용자를 추가하는 함수
var addUser = function(database, id, password, name) {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
	
	// UserModel 인스턴스 생성
	var user = new UserModel({"id":id, "password":password, "name":name});

	// save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
	user.save(function() {
		console.log("사용자 데이터 추가함.");
	     
	});
};


// 라우터 객체 등록
app.use('/', router);



// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  connectDB();
   
});
