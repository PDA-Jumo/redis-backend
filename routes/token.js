//INSERT INTO CoreStock SELECT * FROM Stock WHERE market_type='KOSPI' ORDER BY updated_at, market_cap DESC LIMIT 200;
//INSERT INTO CoreStock SELECT * FROM Stock WHERE market_type='KOSDAQ'ORDER BY updated_at, market_cap DESC LIMIT 130;
const { format } = require("date-fns");
require("dotenv").config();
var express = require("express");

var getKOSPI200 = require("../models/queries/kospi200");
var getKOSDAQ130 = require("../models/queries/kospi200");

var AUTHORIZATION_R = [];
var AUTHORIZATION_F = [];

// 실전 투자용 데이터
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

// 모의 투자용 데이터
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
const pool = require("../models/dbConnect");
const axios = require("axios");

async function fetchAccessToken(type, dataArray, configUrl, AUTHORIZATION) {
  console.log(dataArray.length);
  for (let i = 0; i < dataArray.length; i++) {
    let data = dataArray[i];
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
      const accessToken = response.data.access_token;
      AUTHORIZATION.push(`Bearer ${accessToken}`);

      const TOKEN_ID = `${type}${i + 1}`;
      const TOKEN = `Bearer ${accessToken}`;

      console.log(TOKEN_ID);
      const updatedAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      pool.getConnection((err, conn) => {
        conn.query(
          `UPDATE Token SET token = ?, updated_at = ? WHERE token_id = ?`,
          [TOKEN, updatedAt, TOKEN_ID],
          (error, rows) => {
            conn.release();
            console.log("SUCCESS");
            // console.log(rows);
          }
        );
      });

      console.log(`Bearer ${accessToken}`);
    } catch (error) {
      console.log(error);
    }
  }
}

async function getToken() {
  await fetchAccessToken("main", DATA_R, URL_R, AUTHORIZATION_R);
  await fetchAccessToken("sub", DATA_F, URL_F, AUTHORIZATION_F);
  console.log("실투", AUTHORIZATION_R);
  console.log("모투", AUTHORIZATION_F);
}

module.exports = getToken;
