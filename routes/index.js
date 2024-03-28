var express = require("express");
var router = express.Router();
//////////////////////////////// node-cron /////////////////////////////////
var cron = require("node-cron");
const axios = require("axios");
require("dotenv").config(); // 모듈 불러오기

var XMLHttpRequest = require("xhr2");
var {
  fetchStockPricesPeriodically_main1,
  fetchStockPricesPeriodically_main2,
  fetchStockPricesPeriodically_main3,
  fetchStockPricesPeriodically_sub1,
  fetchStockPricesPeriodically_sub2,
  fetchStockPricesPeriodically_sub3,
  fetchStockPricesPeriodically_sub4,
  fetchStockPricesPeriodically_sub5,
} = require("../models/gagonhoka");
var count_item = 0;
var getKOSPI200 = require("../models/queries/kospi200");
var getKOSDAQ130 = require("../models/queries/kospi200");
const pool = require("../models/dbConnect");

var AUTHORIZATION_R = [];
var AUTHORIZATION_F = [];

let DATA_R = [
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_R_1,
    appsecret: process.env.APPSECRET_R_1,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_R_2,
    appsecret: process.env.APPSECRET_R_2,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_R_3,
    appsecret: process.env.APPSECRET_R_3,
  }),
];

let DATA_F = [
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_F_1,
    appsecret: process.env.APPSECRET_F_1,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_F_2,
    appsecret: process.env.APPSECRET_F_2,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_F_3,
    appsecret: process.env.APPSECRET_F_3,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_F_4,
    appsecret: process.env.APPSECRET_F_4,
  }),
  JSON.stringify({
    grant_type: "client_credentials",
    appkey: process.env.APPKEY_F_5,
    appsecret: process.env.APPSECRET_F_5,
  }),
];

let URL_F = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
let URL_R = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";

async function fetchAccessToken(dataArray, configUrl, AUTHORIZATION) {
  for (let data of dataArray) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: configUrl,
      headers: {
        "content-type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      // 응답으로부터 access_token 값 추출
      const accessToken = response.data.access_token;
      AUTHORIZATION.push(`Bearer ${accessToken}`);
      console.log(`Bearer ${accessToken}`); // 확인을 위해 콘솔에 출력
    } catch (error) {
      console.log(error);
    }
  }
}

async function main() {
  // 1. Token을 발급
  // NOTE: TEST시 해제
  await fetchAccessToken(DATA_R, URL_R, AUTHORIZATION_R);
  await fetchAccessToken(DATA_F, URL_F, AUTHORIZATION_F);
  console.log("실투", AUTHORIZATION_R);
  console.log("모투", AUTHORIZATION_F);

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("DB Disconnected:", err);
      return;
    }

    // 2. DB에서 시총 순으로 KOSPI 200개 가져옴
    conn.query(getKOSPI200.getKOSPI200, (err, results) => {
      if (err) {
        console.log("Query Error:", err);
        return;
      }

      const kospi200Codes = results.map((item) => item.stock_code);
      // console.log("KOSPI 200 종목코드:", kospi200Codes);

      // 3. DB에서 시총 순으로 KOSDAQ 200개 가져옴
      conn.query(getKOSDAQ130.getKOSDAQ130, (err, results) => {
        if (err) {
          console.log("Query Error:", err);
          return;
        }

        const kosdaq200 = results.map((item) => item.stock_code);

        //NOTE: 실제 코드
        fetchStockPricesPeriodically_main1(kospi200Codes, AUTHORIZATION_R[0]);
        fetchStockPricesPeriodically_main2(kospi200Codes, AUTHORIZATION_R[1]);
        fetchStockPricesPeriodically_main3(kospi200Codes, AUTHORIZATION_R[2]);
        fetchStockPricesPeriodically_sub1(kosdaq200, AUTHORIZATION_F[0]);
        fetchStockPricesPeriodically_sub2(kosdaq200, AUTHORIZATION_F[1]);
        fetchStockPricesPeriodically_sub3(kosdaq200, AUTHORIZATION_F[2]);
        fetchStockPricesPeriodically_sub4(kosdaq200, AUTHORIZATION_F[3]);
        fetchStockPricesPeriodically_sub5(kosdaq200, AUTHORIZATION_F[4]);

        //NOTE: TEST 코드
        // fetchStockPricesPeriodically_main1(
        //   kospi200Codes,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImRjOWVhMGM4LTY3MGYtNGMwMi1iZjJkLTIwMzRjNGU4MjQ3NCIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkwLCJpYXQiOjE3MTE0OTUyOTAsImp0aSI6IlBTa2RoQ29uVHJxN2txMVRKNXhPS1pCWGh6MTRoa0Z0YjJFUSJ9.UPOvxewIbM3KEuwy8EkKsvndwQA63pMuvP0yLg-9k8RhqzbCWZvGUI9apWWRxZX-VuM5Z5obJPdsgLCXai3q6A"
        // );
        // fetchStockPricesPeriodically_main2(
        //   kospi200Codes,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImM0MzMzYWRkLWQwODYtNDY4NS1hN2I1LTBjYzhkZDMyZGJhZSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkwLCJpYXQiOjE3MTE0OTUyOTAsImp0aSI6IlBTa01ITFNlckFyOHhMY0oxRDRjYnp2UUxwVFF6eHRCMktVSSJ9.gH47_zjI4bOxQMx-vElFTDaeaaHygbVBgKefzPaFOohunnSnOs83sDGN33EvR6UgW44G_CIxOSVCNR3eAS3GjA"
        // );
        // fetchStockPricesPeriodically_main3(
        //   kospi200Codes,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjA5Y2JlYWE2LTQyNzQtNGE2MC04NmFiLTI2NDg3OTlmNDBkYyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTeDVqNmcyYlNXVVh0QjB5M3R3cElsSTRNUzB5cWhTSUF4QiJ9.TAWI1QiJlTZfc0PauOyy1kawr8RcHuhUIuooTGR2hw9jnro9o9dKF9SFSEA3om2lOhkg4PR_lY918eDRzyouFQ"
        // );
        // fetchStockPricesPeriodically_sub1(
        //   kosdaq200,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjBlYjBlZDJmLTY4OTItNDMyMC1iZDMzLTgxZDQ4MDlkMmJjNiIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTbkhCbmU2MjdBdlVyU3c2bXl3WlJqYUFjbnNoZ1Z1RTVqNSJ9.3_BWapd1-rfqPJGrryHt4CUZSDpj1vIXO6lKvpF-EV8b--hUfXo82rSn1Hua2FjiAtvRAGnuuMUKQT7bJHowyQ"
        // );
        // fetchStockPricesPeriodically_sub2(
        //   kosdaq200,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImRmNTRkN2RhLTAwY2YtNDY0Yi05NTkxLWUzNTNiNWNiYmFlMCIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTNU5WS0xyT0cyT25rWm1Wc3B1M2twTUhXOFNjQVhKbEdoaiJ9.i0FyQhmMMeCeiDie8H8K7eZqdVSqknCZK8YsHqa4jUVQm5iBXWb3GG-NOqfFHl20uwVBww-y9dBkmJNt6Ln5YQ"
        // );
        // fetchStockPricesPeriodically_sub3(
        //   kosdaq200,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImQ2MjZkMWY0LTVhMTYtNDYyZC04MGQ5LTc3NzA1MGEwOWZhYSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTVUpEWHhROU51ZUpSTGZUaU5HUTlHR0dTMlVYbEVtZ3RSdyJ9.5-Mux4QdaHpixVJOlp3Y_SzKdSz6ELOPxHMmCyVzvyk4AKyyiCjinjGDJm1KYqI0oeoyiaeHuCFmZIdt7yhUVQ"
        // );
        // fetchStockPricesPeriodically_sub4(
        //   kosdaq200,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjViNTM3NGE1LTdkNzMtNDljYS05ZDczLTlkYTJmZTcyMjk2MiIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTcTZkNHZwUG0yeTNnV3JKam5zQ0RoYlFRRURGeW9WemYxeCJ9.4srLu00giG4BsobiOKiPwr4fu4mM90TXgc8ejbPTKdFl8ItvgWwRS8hGtgLQirgIjuWXyO0kWR-pkL0iuhRwEQ"
        // );
        // fetchStockPricesPeriodically_sub5(
        //   kosdaq200,
        //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjA2Y2IyOGZlLWM5YTEtNDZkZC05NTY4LTkzM2QxYzJkYzNjMiIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNTgxNjkxLCJpYXQiOjE3MTE0OTUyOTEsImp0aSI6IlBTUEVTTUlzaFJrcVVtZHJzUUpTNGZDN0M3UU9ka3NnUXlkdSJ9.OPmlBb7dFNQWJEY9ntt4ntJJYLgwnCTnYHQKChSUP1CEI7c_rK_NghYM98nK0rwgss2VxAX6vYpUUQrx8SB4og"
        // );
      });
    });
  });
}

//NOTE: 토큰 발급 제한: 1분
// second minute hour day-of-month month day-of-week
//NOTE: 실제 코드
// cron.schedule("59 * * * * *", () => {
//   console.log("매 30마다 실행");
//   main();
// });

//NOTE: TEST 코드
main();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
