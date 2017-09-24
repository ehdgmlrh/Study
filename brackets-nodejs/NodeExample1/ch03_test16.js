/**
 * 3장 Test 16
 * 
 * 함수가 결과값으로 리턴됨
 */
console.log('----------start1-----------');
function add(a, b, callback) {
	console.log('add 함수 실행');
    var result = a + b;
	callback(result);

	var history = function() {
		console.log('history 함수 실행');
        console.log('history 함수 종료 및 a + b = result 반환');
        return a + ' + ' + b + ' = ' + result; 
	};
	return history;
}
console.log('----------end1-----------');

console.log('----------start2-----------');
var history = add(10, 10, function(result) {
	console.log('파라미터로 전달된 콜백 함수 호출됨.');
	console.log('더하기 (10, 10)의 결과 : %d', result);
});

console.log(history());
console.log('----------end2-----------');


console.log('----------start3-----------');
console.log('결과값으로 받은 함수 실행 결과 : ' + history());
console.log('----------end3-----------');
