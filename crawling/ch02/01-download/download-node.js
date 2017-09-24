/*
가장 간단한 다운로드 방법
대부분의 웹 브라우저는 HTML파일 하나만 내려 받지 않고 그 안에 연결된 이미지나 CSS 파일들을 순차적으로 다운로드 한다.
따라서 브라우저를 사용하면 하나의 웹 페이지 정도는 순식간에 내려받을 수 있다. 

Node.js로 다운로드해 보자
*/

// url에 있는 파일을 saveoath에 다운로드한다.

// 다운로드할 URL을 지정
var url = "http://jpub.tistory.com/";

//저장할 위치를 지정
var savepath = "./test.html";

// 사용 모듈 정의
var http = require('http');
var fs = require('fs');

// 출력 지정
var outfile = fs.createWriteStream(savepath);

// 비동기로 URL의 파일 다운로드
http.get(url, function(res) {
    res.pipe(outfile);
    res.on('end', function() {
        outfile.close();
        console.log("ok");
    })
})