//모듈 로드     --1 모듈 cheerio-httpcli를 client라는 이름의 변수에 대입

var client = require('cheerio-httpcli');

// 다운로드     --2 fetch()메소드를 사용하여 HTML을 취득하는 부분
//                fetch()메소드의 인자는 URL, 파라미터, 콜백함수

var url = 'http://jpub.tistory.com';
var param = {};

client.fetch(url, param, function (err, $, res) {           // err :오류정보, $ : 취득한 데이터, res : 서버의 응답정보
    // 에러 체크
    if (err) { 
        console.log("Error: ", err);
        return ;
    }
    
    //다운로드 한 결과를 화면에 출력     --3 취득한 데이터를 담은 변수 $의 html() 메소드를 호출함으로써 취득한 HTML을 콘솔창에 표시
    var body = $.html();
    console.log("ok1");
    //console.log(body);
    console.log("ok2");
});