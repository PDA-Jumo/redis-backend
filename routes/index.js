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
  // await fetchAccessToken(DATA_R, URL_R, AUTHORIZATION_R);
  // await fetchAccessToken(DATA_F, URL_F, AUTHORIZATION_F);
  // console.log("실투", AUTHORIZATION_R);
  // console.log("모투", AUTHORIZATION_F);

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
        // fetchStockPricesPeriodically_main1(kospi200Codes, AUTHORIZATION_R[0]);
        // fetchStockPricesPeriodically_main2(kospi200Codes, AUTHORIZATION_R[1]);
        // fetchStockPricesPeriodically_main3(kospi200Codes, AUTHORIZATION_R[2]);
        // fetchStockPricesPeriodically_sub1(kosdaq200, AUTHORIZATION_F[0]);
        // fetchStockPricesPeriodically_sub2(kosdaq200, AUTHORIZATION_F[1]);
        // fetchStockPricesPeriodically_sub3(kosdaq200, AUTHORIZATION_F[2]);
        // fetchStockPricesPeriodically_sub4(kosdaq200, AUTHORIZATION_F[3]);
        // fetchStockPricesPeriodically_sub5(kosdaq200, AUTHORIZATION_F[4]);

        //NOTE: TEST 코드
        fetchStockPricesPeriodically_main1(
          kospi200Codes,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImQwZjNkYmViLTBlYWYtNDYwYS1hN2ZhLWJmOGMzYmQ1N2NjYSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE0LCJpYXQiOjE3MTE1ODQ5MTQsImp0aSI6IlBTa2RoQ29uVHJxN2txMVRKNXhPS1pCWGh6MTRoa0Z0YjJFUSJ9.pfsAeOa0q7ASE93paYuP3aLmr8QdhA4drbyMr7rGvIp4cdwCuWHbQASinykr9678MvesKzXzmYaUjWeGZoiKDg"
        );
        fetchStockPricesPeriodically_main2(
          kospi200Codes,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6Ijk5Y2Y4NmJiLTY5ZTItNDgxZC1hNzgwLTRjNGNkNzM0ZWJlNSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE0LCJpYXQiOjE3MTE1ODQ5MTQsImp0aSI6IlBTa01ITFNlckFyOHhMY0oxRDRjYnp2UUxwVFF6eHRCMktVSSJ9.doetRasCl4Kuvf6axBSu3rTa0IXFTMO0RsySJuM-Uc_KNQFDissNeCDBJQ1OKF4Z2JwiXTrshpa3TWGP0GV3jA"
        );
        fetchStockPricesPeriodically_main3(
          kospi200Codes,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImNiZWZmMzY2LWQwZmQtNGRlZS04YzA2LTYwODdkZDlhYmNjNyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTeDVqNmcyYlNXVVh0QjB5M3R3cElsSTRNUzB5cWhTSUF4QiJ9.C8mYbTbqJEOQcAl7dkJ3ZU-D_R1r0olj_RbH38bcrpGOu4McsSRK-zpz7W5XQPhLIW9-mPU66GTX3kY7qGTzGA"
        );
        fetchStockPricesPeriodically_sub1(
          kosdaq200,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6Ijc3YzFkODY5LWQ2MTctNGRlYS04ZWRiLTNhY2M1ZTI3N2I3NSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTbkhCbmU2MjdBdlVyU3c2bXl3WlJqYUFjbnNoZ1Z1RTVqNSJ9.bWnsQ1-rNJyNUbtw5BKGDXyKSRY2REt7BSB-c1GVNN9pXEiSiVZJvstFt7PKWwqTnoMRZttLNkm_Fkoly4B4rg"
        );
        fetchStockPricesPeriodically_sub2(
          kosdaq200,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjM4NDgxNjFjLTY3YWQtNDM1ZC1iMDIzLWFmZTY0MDljMjE3MyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTNU5WS0xyT0cyT25rWm1Wc3B1M2twTUhXOFNjQVhKbEdoaiJ9.fD2XXnKsy3mOnr2se9qqdVIKuUWuZoJvNpzKkgYvaOb8MEdkOktBvhJ75ALJoF69NeGREEV6sVTW7Evq2mdlrA"
        );
        fetchStockPricesPeriodically_sub3(
          kosdaq200,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6IjI4ZGFiNWZlLWIzNTctNGFkMi04OTY5LTM0ZjJjYWJhN2I2NSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTVUpEWHhROU51ZUpSTGZUaU5HUTlHR0dTMlVYbEVtZ3RSdyJ9.1VZJd7yqLb0UgqKmDDSAIDAiIGmwwUyIX_jEs4Ky-lJGOi44_7Md9oXwbmIVEYoYX87DuHNYrdrHXDFizGGHuw"
        );
        fetchStockPricesPeriodically_sub4(
          kosdaq200,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImJlNTU0MGFkLTcwOTMtNDBlNi1hNzdhLWZlMTZkMmU1ZTE1NSIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTcTZkNHZwUG0yeTNnV3JKam5zQ0RoYlFRRURGeW9WemYxeCJ9.AHqHIPooGh10XsizUL6jjchQRh2RbE4cjjxUgd9-Tk4x8kLhq0ZJiWC1ylNRcv8eI_D2T6MtaA2FYv3tgIqUHg"
        );
        fetchStockPricesPeriodically_sub5(
          kosdaq200,
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b2tlbiIsImF1ZCI6ImU4ZDM2NmUyLWYwM2QtNDBjYy1iOTBkLTcyMTk2MDI4NGM0MyIsImlzcyI6InVub2d3IiwiZXhwIjoxNzExNjcxMzE1LCJpYXQiOjE3MTE1ODQ5MTUsImp0aSI6IlBTUEVTTUlzaFJrcVVtZHJzUUpTNGZDN0M3UU9ka3NnUXlkdSJ9.HWftNTnPwvOISEIQ68f9CHSGXBbdXHxPcMxmhGbMkNkUNUuiQuZLGEAoBM5jqpslNJTe7N9p0I5UlzIfjVVdLw"
        );
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
