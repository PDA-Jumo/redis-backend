var express = require("express");

const getKOSPI200 =
  "SELECT stock_code FROM CoreStock WHERE market_type='KOSPI' ORDER BY updated_at, market_cap DESC;";

const getKOSDAQ130 =
  "SELECT stock_code FROM CoreStock WHERE market_type='KOSDAQ'ORDER BY updated_at, market_cap DESC;";

module.exports = {
  getKOSDAQ130,
  getKOSPI200,
};
