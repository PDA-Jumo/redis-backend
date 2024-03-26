const publisher = require('./redis')

// 데이터 저장 및 변경 사항 알림
function publish(stockCode, stockData){
  const channelName = `stockUpdates:${stockCode}`;
  publisher.set(stockCode, JSON.stringify(stockData), (err, reply) => {
    if (err) {
      console.error('Error setting value in Redis:', err);
      return;
    }
    console.log('Set data reply:', reply);
    // 데이터 변경 사항을 해당 주식 코드의 채널에 알림
    publisher.publish(channelName, JSON.stringify({ message: 'Stock data updated', code: stockCode }), (publishErr, publishReply) => {
      if (publishErr) {
        console.error('Error publishing message:', publishErr);
        return;
      }
      console.log('Publish data reply:', publishReply);
      // 실제 어플리케이션에서는 연결을 유지할 수 있지만, 예제를 위해 연결을 종료합니다.
      publisher.quit();
    });
  });
  

}


module.exports = publish;
  
