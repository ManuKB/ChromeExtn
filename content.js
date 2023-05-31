hii();
// chrome.runtime.sendMessage({greeting: "Hello from content script!"}, response => {
//   console.log(response.farewell);
// });

var tradeList = [];

setInterval(function () {
  console.log("in loop" + new Date());

  chrome.runtime.sendMessage(
    { url: "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY" },
    (response) => {
      //console.log(response);
      // Do something with the response data
      var date = new Date();
      var timeString = date.toLocaleTimeString();
      document.getElementsByTagName("html")[0].innerHTML = mainPage().content;
      downloadJSON(response, timeString);
      var strike = getStrikes();
      populator.populate(".strikePrice", strike);
    }
  );
}, 60 * 1000);

function downloadJSON(data, filename) {
  if (Object.keys(data).length === 0) {
    console.error("Response Empty");
  } else {
    createTradeList(data);
  }

  //var mr = data;
  // // if (Object.keys(mr).length !== 0) {
  // //   mr.currentPrice = mr.records.underlyingValue;
  // //   mr.timestamp = mr.records.timestamp;
  // //   delete mr.records;
  // //   var nxtStrike = Math.ceil(mr.currentPrice / 50) * 50;
  // //   var index = mr.filtered.data.findIndex(obj => obj.strikePrice === nxtStrike);
  // //   var r = [];
  // //   for (let i = -3; i <= 3; i++) {
  // //     r.push(mr.filtered.data[index+i]);
  // //   }
  // //   mr.total = {};
  // //   mr.total.CE = mr.filtered.CE;
  // //   mr.total.PE = mr.filtered.PE;
  // //   delete mr.filtered;
  // //   mr.strikePrices = r;
  // // }
  // var m = new Blob([JSON.stringify(mr)], { type: "application/json" });
  // var url = URL.createObjectURL(m);
  // var link = document.createElement("a");
  // link.href = url;
  // link.download = filename + ".json";
  // link.click();
  // URL.revokeObjectURL(url);
}
