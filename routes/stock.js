require("dotenv").config(); // 모듈 불러오기
var express = require("express");
var router = express.Router();

var getKOSPI200 = require("../models/queries/kospi200");
var getKOSDAQ130 = require("../models/queries/kospi200");
const pool = require("../models/dbConnect");

function get_KOSPI() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.error("DB Disconnected:", err);
        reject(err);
        return;
      }

      conn.query(getKOSPI200.getKOSPI200, (err, results) => {
        if (err) {
          console.log("Query Error:", err);
          reject(err);
          return;
        }

        const KOSPI_LIST = results.map((item) => item.stock_code);
        resolve(KOSPI_LIST);
      });
    });
  });
}

function get_KOSDAQ() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        console.error("DB Disconnected:", err);
        reject(err);
        return;
      }

      conn.query(getKOSDAQ130.getKOSDAQ130, (err, results) => {
        if (err) {
          console.log("Query Error:", err);
          reject(err);
          return;
        }

        const KOSDAQ_LIST = results.map((item) => item.stock_code);
        resolve(KOSDAQ_LIST);
      });
    });
  });
}

module.exports = { get_KOSDAQ, get_KOSPI };
