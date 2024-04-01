require("dotenv").config(); // 모듈 불러오기
var express = require("express");
var router = express.Router();
//////////////////////////////// node-cron /////////////////////////////////
const axios = require("axios");

const { get_KOSPI, get_KOSDAQ } = require("./stock.js");

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

const pool = require("../models/dbConnect");

async function getTokenList() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
        return;
      }

      conn.query(`SELECT * FROM Token`, (error, rows) => {
        conn.release(); // 연결 해제
        if (error) {
          reject(error);
        } else {
          resolve(rows); // rows를 resolve해 결과를 반환
        }
      });
    });
  });
}

async function main() {
  // await getToken();

  const KOSPI_LIST = await get_KOSPI();
  const KOSDAQ_LIST = await get_KOSDAQ();
  const TOKEN_LIST = await getTokenList();
  // console.log(TOKEN_LIST);
  const main1Token = TOKEN_LIST.find((item) => item.token_id === "main1");
  const main2Token = TOKEN_LIST.find((item) => item.token_id === "main2");
  const main3Token = TOKEN_LIST.find((item) => item.token_id === "main3");
  const sub1Token = TOKEN_LIST.find((item) => item.token_id === "sub1");
  const sub2Token = TOKEN_LIST.find((item) => item.token_id === "sub2");
  const sub3Token = TOKEN_LIST.find((item) => item.token_id === "sub3");
  const sub4Token = TOKEN_LIST.find((item) => item.token_id === "sub4");
  const sub5Token = TOKEN_LIST.find((item) => item.token_id === "sub5");

  // console.log("///////////////////////////////////////////");
  // console.log(KOSPI_LIST);
  // console.log(main1Token);
  // console.log("///////////////////////////////////////////");

  // KOSPI_LIST를 67, 67, 66개로 나누기
  // KOSPI는 대략 3.5초에 한번씩 반복
  const KOSPI_PARTS = [
    KOSPI_LIST.slice(0, 67),
    KOSPI_LIST.slice(67, 134),
    KOSPI_LIST.slice(134),
  ];

  // KOSDAQ_LIST를 26개씩 5개로 나누기
  // KOSDAQ는 대략 5초에 한번씩 반복
  const KOSDAQ_PARTS = [];
  for (let i = 0; i < KOSDAQ_LIST.length; i += 26) {
    KOSDAQ_PARTS.push(KOSDAQ_LIST.slice(i, i + 26));
  }
  console.log(KOSDAQ_PARTS[0]);
  console.log(KOSDAQ_PARTS[1]);
  console.log(KOSDAQ_PARTS[2]);
  console.log(KOSDAQ_PARTS[0]);
  console.log(KOSDAQ_PARTS[1]);
  console.log(KOSDAQ_PARTS[2]);
  console.log(KOSDAQ_PARTS[3]);
  console.log(KOSDAQ_PARTS[4]);

  await Promise.all([
    fetchStockPricesPeriodically_main1(KOSPI_PARTS[0], main1Token.token),
    fetchStockPricesPeriodically_main2(KOSPI_PARTS[1], main2Token.token),
    fetchStockPricesPeriodically_main3(KOSPI_PARTS[2], main3Token.token),
    fetchStockPricesPeriodically_sub1(KOSDAQ_PARTS[0], sub1Token.token),
    fetchStockPricesPeriodically_sub2(KOSDAQ_PARTS[1], sub2Token.token),
    fetchStockPricesPeriodically_sub3(KOSDAQ_PARTS[2], sub3Token.token),
    fetchStockPricesPeriodically_sub4(KOSDAQ_PARTS[3], sub4Token.token),
    // fetchStockPricesPeriodically_sub5(KOSDAQ_PARTS[4], sub5Token.token);
  ]);
}

//NOTE: TEST 코드
main();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
