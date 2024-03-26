var XMLHttpRequest = require("xhr2");
require("dotenv").config(); // 모듈 불러오기

var count_failed = 0;

//한투 api 요청 (데이터 가공 전)

//실전 계좌: 유준
function fetchStockPrice_main1(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_R_1);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_R_1);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    xhr.setRequestHeader("hashkey", process.env.HASH_R_1);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;
          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

// 실전 계좌: 서희
function fetchStockPrice_main2(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_R_2);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_R_2);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    xhr.setRequestHeader("hashkey", process.env.HASH_R_2);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;
          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

// 실전 계좌: 별하
function fetchStockPrice_main3(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_R_3);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_R_3);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    xhr.setRequestHeader("hashkey", process.env.HASH_R_3);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;
          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

//모의투자: 유준
function fetchStockPrice_sub1(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_F_1);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_F_1);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    // xhr.setRequestHeader(
    //   "hashkey",
    //   "01bee4d630cd3816471ac0e678ea2be451b4b89a2f61970bb32c91d35a8b8fea"
    // );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;

          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

//모의투자: 상진
function fetchStockPrice_sub2(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_F_2);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_F_2);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    // xhr.setRequestHeader(
    //   "hashkey",
    //   "01bee4d630cd3816471ac0e678ea2be451b4b89a2f61970bb32c91d35a8b8fea"
    // );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;

          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

// 모의투자: 서희
function fetchStockPrice_sub3(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_F_3);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_F_3);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    // xhr.setRequestHeader(
    //   "hashkey",
    //   "01bee4d630cd3816471ac0e678ea2be451b4b89a2f61970bb32c91d35a8b8fea"
    // );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;

          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

// 모의투자: 별하
function fetchStockPrice_sub4(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_F_4);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_F_4);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    // xhr.setRequestHeader(
    //   "hashkey",
    //   "01bee4d630cd3816471ac0e678ea2be451b4b89a2f61970bb32c91d35a8b8fea"
    // );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;

          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

//모의투자: 예리
function fetchStockPrice_sub5(code, AUTHORIZATION) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", AUTHORIZATION);
    xhr.setRequestHeader("appKey", process.env.APPKEY_F_5);
    xhr.setRequestHeader("appSecret", process.env.APPSECRET_F_5);
    xhr.setRequestHeader("tr_id", "FHKST01010200");
    // xhr.setRequestHeader(
    //   "hashkey",
    //   "01bee4d630cd3816471ac0e678ea2be451b4b89a2f61970bb32c91d35a8b8fea"
    // );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          count_failed = count_failed + 1;

          reject(new Error(`Failed to fetch stock price for code ${code}`));
        }
      }
    };
    xhr.send(null);
  });
}

module.exports = {
  fetchStockPrice_main1,
  fetchStockPrice_main2,
  fetchStockPrice_main3,
  fetchStockPrice_sub1,
  fetchStockPrice_sub2,
  fetchStockPrice_sub3,
  fetchStockPrice_sub4,
  fetchStockPrice_sub5,
};
