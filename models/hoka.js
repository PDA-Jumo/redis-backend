var XMLHttpRequest = require("xhr2");
var getKOSPI200 = require("./queries/kospi200");
var getKOSDAQ130 = require("./queries/kospi200");
const pool = require("./dbConnect");
const set_cache = require("./redis");
require("dotenv").config(); // 모듈 불러오기

var count_item = 0;
var count_failed = 0;

// TEST
// 한투 권장: 50, 200
// 1. 30, 150
// 성공: 10초 동안 225개
// 실패: 10초 동안 5개

// 2. 30, 160
// 성공: 10초 동안 223개
// 실패: 10초 동안 3개

function fetchStockPrice_main1(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_R_1);
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
function fetchStockPrice_main2(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_R_2);
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
function fetchStockPrice_main3(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_R_3);
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

function fetchStockPrice_sub1(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_F_1);
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

// 모의투자: 상진
function fetchStockPrice_sub2(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_F_2);
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
function fetchStockPrice_sub3(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_F_3);
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
function fetchStockPrice_sub4(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_F_4);
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

// 모의투자: 예리
function fetchStockPrice_sub5(code) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url =
      "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    xhr.open("GET", `${url}?fid_cond_mrkt_div_code=J&fid_input_iscd=${code}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("authorization", process.env.AUTHORIZATION_F_5);
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

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main1(codes) {
  const interval = 30; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main1(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "메인1 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main2(codes) {
  const interval = 30; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main2(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "메인2 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main3(codes) {
  const interval = 30; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main3(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "메인3 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub1(codes) {
  const interval = 160; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub1(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "서브1 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub2(codes) {
  const interval = 160; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub2(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "서브2 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub3(codes) {
  const interval = 160; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub3(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "서브3 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub4(codes) {
  const interval = 160; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub4(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "서브4 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub5(codes) {
  const interval = 160; // milliseconds
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub5(code);
        // 필요한 JSON 형식으로 변환
        const transformedResponse = {
          func: "서브5 함수",
          code: code,
          output1: {
            askp: [
              response.output1.askp1,
              response.output1.askp2,
              response.output1.askp3,
              response.output1.askp4,
              response.output1.askp5,
            ],
            bidp: [
              response.output1.bidp1,
              response.output1.bidp2,
              response.output1.bidp3,
              response.output1.bidp4,
              response.output1.bidp5,
            ],
            askp_rsqn: [
              response.output1.askp_rsqn1,
              response.output1.askp_rsqn2,
              response.output1.askp_rsqn3,
              response.output1.askp_rsqn4,
              response.output1.askp_rsqn5,
            ],
            bidp_rsqn: [
              response.output1.bidp_rsqn1,
              response.output1.bidp_rsqn2,
              response.output1.bidp_rsqn3,
              response.output1.bidp_rsqn4,
              response.output1.bidp_rsqn5,
            ],
            total_askp_rsqn: response.output1.total_askp_rsqn,
            total_bidp_rsqn: response.output1.total_bidp_rsqn,
          },
          output2: {
            stck_prpr: response.output2.stck_prpr,
            stck_oprc: response.output2.stck_oprc,
            antc_cntg_vrss_sign: response.output2.antc_cntg_vrss_sign,
            antc_cntg_vrss: response.output2.antc_cntg_vrss,
            antc_cntg_prdy_ctrt: response.output2.antc_cntg_prdy_ctrt,
          },
        };

        // 변환된 데이터 출력
        console.log(transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

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
