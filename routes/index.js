var express = require("express");
var router = express.Router();
//////////////////////////////// node-cron /////////////////////////////////
var cron = require("node-cron");
const axios = require("axios");
require("dotenv").config(); // 모듈 불러오기

var accessTokens = [];

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

let URL_R = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";
let URL_F = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";

async function fetchAccessToken(dataArray, configUrl) {
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
      accessTokens.push(`Bearer ${accessToken}`);
      console.log(`Bearer ${accessToken}`); // 확인을 위해 콘솔에 출력
    } catch (error) {
      console.log(error);
    }
  }
}

async function main() {
  await fetchAccessToken(DATA_R, URL_R);
  await fetchAccessToken(DATA_F, URL_F);
  console.log(accessTokens); // 모든 토큰이 추가된 후, 전역 배열 확인을 위해 출력
}

// second minute hour day-of-month month day-of-week
cron.schedule("30 * * * * *", () => {
  console.log("매 30마다 실행");
  main();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
