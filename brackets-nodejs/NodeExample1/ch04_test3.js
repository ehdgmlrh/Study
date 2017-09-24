
/**
 * 4장 Test 3
 * 
 * event 사용하기
 */

process.on('tick', function(count, testvalue) {
	console.log('tick 이벤트 발생함 : %s', count);
    console.log('testvalue = %d', testvalue);
});

setTimeout(function() {
	console.log('2초 후에 tick 이벤트 전달 시도함.');
	
	process.emit('tick', '20', '4');
}, 2000);

