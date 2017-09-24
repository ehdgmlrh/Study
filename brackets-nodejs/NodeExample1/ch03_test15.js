/**
 * 3장 Test 15
 * 
 * 함수를 파라미터로 전달
 */

function add( a, b, callback) {
	console.log('add 함수 실행');
    var result = a + b;
	callback(result);
    console.log('add 함수 종료');
}
 
add(10, 10, function(result) {
	console.log('파라미터로 전달된 콜백 함수 호출됨.');
	console.log('더하기 (10, 10)의 결과 : %d', result);
});

