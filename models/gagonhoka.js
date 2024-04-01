const {
  fetchStockPrice_main1,
  fetchStockPrice_main2,
  fetchStockPrice_main3,
  fetchStockPrice_sub1,
  fetchStockPrice_sub2,
  fetchStockPrice_sub3,
  fetchStockPrice_sub4,
  fetchStockPrice_sub5,
} = require("./gethoka");
require("dotenv").config(); // 모듈 불러오기
const publish = require("./redisset");

var count_item = 0;

// TEST
// 한투 권장: 50, 200
// 1. 30, 150
// 성공: 10초 동안 225개
// 실패: 10초 동안 5개

// 2. 30, 160
// 성공: 10초 동안 223개
// 실패: 10초 동안 3개

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main1(codes, AUTHORIZATION) {
  const interval = 90; // milliseconds
  console.log("실투1", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main1(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);

        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main2(codes, AUTHORIZATION) {
  const interval = 50; // milliseconds
  console.log("실투2", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main2(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        //console.log("코드!!!!!!!!!!11", codes);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 실전계좌: 1초당 20 종목
async function fetchStockPricesPeriodically_main3(codes, AUTHORIZATION) {
  const interval = 50; // milliseconds
  console.log("실투3", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_main3(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub1(codes, AUTHORIZATION) {
  const interval = 220; // milliseconds
  console.log("모의1", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub1(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub2(codes, AUTHORIZATION) {
  const interval = 200; // milliseconds
  console.log("모의2", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub2(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub3(codes, AUTHORIZATION) {
  const interval = 200; // milliseconds
  console.log("모의3", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub3(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub4(codes, AUTHORIZATION) {
  const interval = 200; // milliseconds
  console.log("모의4", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub4(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

// 모의계좌 1: 1초당 5종목
async function fetchStockPricesPeriodically_sub5(codes, AUTHORIZATION) {
  const interval = 200; // milliseconds
  console.log("모의5", AUTHORIZATION);
  while (true) {
    for (const code of codes) {
      try {
        const response = await fetchStockPrice_sub5(code, AUTHORIZATION);
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
            total_askp_rsqn:
              parseInt(response.output1.total_askp_rsqn) -
              (parseInt(response.output1.askp_rsqn6) +
                parseInt(response.output1.askp_rsqn7) +
                parseInt(response.output1.askp_rsqn8) +
                parseInt(response.output1.askp_rsqn9) +
                parseInt(response.output1.askp_rsqn10)),
            total_bidp_rsqn:
              parseInt(response.output1.total_bidp_rsqn) -
              (parseInt(response.output1.bidp_rsqn6) +
                parseInt(response.output1.bidp_rsqn7) +
                parseInt(response.output1.bidp_rsqn8) +
                parseInt(response.output1.bidp_rsqn9) +
                parseInt(response.output1.bidp_rsqn10)),
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
        //console.log(transformedResponse);
        publish(code, transformedResponse);
        count_item = count_item + 1;
        console.log(count_item);
        //console.log(count_failed);
      } catch (error) {
        console.error(error.message);
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

module.exports = {
  fetchStockPricesPeriodically_main1,
  fetchStockPricesPeriodically_main2,
  fetchStockPricesPeriodically_main3,
  fetchStockPricesPeriodically_sub1,
  fetchStockPricesPeriodically_sub2,
  fetchStockPricesPeriodically_sub3,
  fetchStockPricesPeriodically_sub4,
  fetchStockPricesPeriodically_sub5,
};
