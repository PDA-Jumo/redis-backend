var XMLHttpRequest = require("xhr2");
require("dotenv").config(); // 모듈 불러오기
var {fetchStockPricesPeriodically_main1,fetchStockPricesPeriodically_main2, fetchStockPricesPeriodically_main3, fetchStockPricesPeriodically_sub1,fetchStockPricesPeriodically_sub2,fetchStockPricesPeriodically_sub3,fetchStockPricesPeriodically_sub4,fetchStockPricesPeriodically_sub5} = require("./gagonhoka")
var count_item = 0;
var getKOSPI200 = require("./queries/kospi200");
var getKOSDAQ130 = require("./queries/kospi200");
const pool = require("./dbConnect");

// TEST
// 한투 권장: 50, 200
// 1. 30, 150
// 성공: 10초 동안 225개
// 실패: 10초 동안 5개

// 2. 30, 160
// 성공: 10초 동안 223개
// 실패: 10초 동안 3개

pool.getConnection((err, conn) => {
  if (err) {
    console.error("DB Disconnected:", err);
    return;
  }

  // getKOSPI200 쿼리 실행
  conn.query(getKOSPI200.getKOSPI200, (err, results) => {
    if (err) {
      console.log("Query Error:", err);
      return;
    }

    const kospi200Codes = results.map((item) => item.stock_code);
    // console.log("KOSPI 200 종목코드:", kospi200Codes);

    // getKOSDAQ130 쿼리 실행
    conn.query(getKOSDAQ130.getKOSDAQ130, (err, results) => {
      if (err) {
        console.log("Query Error:", err);
        return;
      }

      const kosdaq200 = results.map((item) => item.stock_code);
      // console.log("KOSDAQ 200 종목코드:", kosdaq200);

      fetchStockPricesPeriodically_main1(kospi200Codes);
      fetchStockPricesPeriodically_main2(kospi200Codes);
      fetchStockPricesPeriodically_main3(kospi200Codes);
      fetchStockPricesPeriodically_sub1(kosdaq200);
      fetchStockPricesPeriodically_sub2(kospi200Codes);
      fetchStockPricesPeriodically_sub3(kospi200Codes);
      fetchStockPricesPeriodically_sub4(kospi200Codes);
      fetchStockPricesPeriodically_sub5(kospi200Codes);
    });
  });
});
