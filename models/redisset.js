const publisher = require("./redis");

async function publish(stockCode, stockData){
  publisher.set(stockCode, JSON.stringify(stockData))
  publisher.publish(stockCode, JSON.stringify(stockData))
}

module.exports = publish;


