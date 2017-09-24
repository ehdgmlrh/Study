// 모듈 로드

var client = require('cheerio-httpcli');

// 다운로드
var url = 'http://jpub.tistory.com';
var param = {};
client.fetch(url, param, function(err, $, res ) {   // --1 fetch()메소드의 콜백 함수를 지정하고 있음 
                                                    // 콜백함수의 두번째 인자 $(취득한 데이터)를 이용해 jQueriy처럼 페이지의 특정 요소를 추출 가능
    if (err) {
        console.log('error');
        return ;
    }
    
    // 링크를 추출하여 표시  --2  문서내의 <a>태그를 모두 추출한다 잠시 후 사용할 
    $("a").each(function(idx) {
        var text = $(this).text();
        var href = $(this).attr('href');
        console.log(text + ":" + href);
    });
});