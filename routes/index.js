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
  await fetchAccessToken(DATA_R, URL_R, AUTHORIZATION_R);
  await fetchAccessToken(DATA_F, URL_F, AUTHORIZATION_F);
  console.log("실투", AUTHORIZATION_R);
  console.log("모투", AUTHORIZATION_F);

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

        fetchStockPricesPeriodically_main1(kospi200Codes, AUTHORIZATION_R[0]);
        fetchStockPricesPeriodically_main2(kospi200Codes, AUTHORIZATION_R[1]);
        fetchStockPricesPeriodically_main3(kospi200Codes, AUTHORIZATION_R[2]);
        fetchStockPricesPeriodically_sub1(kosdaq200, AUTHORIZATION_F[0]);
        fetchStockPricesPeriodically_sub2(kosdaq200, AUTHORIZATION_F[1]);
        fetchStockPricesPeriodically_sub3(kosdaq200, AUTHORIZATION_F[2]);
        fetchStockPricesPeriodically_sub4(kosdaq200, AUTHORIZATION_F[3]);
        fetchStockPricesPeriodically_sub5(kosdaq200, AUTHORIZATION_F[4]);
      });
    });
  });
}

//NOTE: 토큰 발급 제한: 1분
// second minute hour day-of-month month day-of-week
cron.schedule("59 * * * * *", () => {
  console.log("매 30마다 실행");
  main();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;