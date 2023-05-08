hii();
// chrome.runtime.sendMessage({greeting: "Hello from content script!"}, response => {
//   console.log(response.farewell);
// });
setInterval(function () {
  console.log("in loop" + new Date());

  chrome.runtime.sendMessage({ url: "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY" },response => {
      //console.log(response);
      // Do something with the response data
      var date = new Date();
      var timeString = date.toLocaleTimeString();
      downloadJSON(response, timeString);
      var body = document.body;
      // Replace the body with new HTML content
      body.innerHTML = "<h1>Hello World!</h1><p>This is the new content.</p>";
    }
  );
}, 60 * 1000);

function downloadJSON(data, filename) {
  var mr = data;
  if (Object.keys(mr).length !== 0) {
    mr.currentPrice = mr.records.underlyingValue;
    mr.timestamp = mr.records.timestamp;
    delete mr.records;
    var nxtStrike = Math.ceil(mr.currentPrice / 50) * 50;
    var index = mr.filtered.data.findIndex(obj => obj.strikePrice === nxtStrike);
    var r = [];
    for (let i = -3; i <= 3; i++) {
      r.push(mr.filtered.data[index+i]);
    }
    mr.total = {};
    mr.total.CE = mr.filtered.CE;
    mr.total.PE = mr.filtered.PE;
    delete mr.filtered;
    mr.strikePrices = r;
  }
  var m = new Blob([JSON.stringify(mr)], { type: "application/json" });
  var url = URL.createObjectURL(m);
  var link = document.createElement("a");
  link.href = url;
  link.download = filename + ".json";
  link.click();
  URL.revokeObjectURL(url);
}
