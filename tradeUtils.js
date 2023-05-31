function createTradeList(data) {
  var mr = data;
  if (Object.keys(mr).length !== 0) {
    mr.currentPrice = mr.records.underlyingValue;
    mr.timestamp = mr.records.timestamp;
    delete mr.records;
    var nxtStrike = Math.ceil(mr.currentPrice / 50) * 50;
    var index = mr.filtered.data.findIndex(
      (obj) => obj.strikePrice === nxtStrike
    );
    var r = [];
    for (let i = -3; i <= 3; i++) {
      r.push(mr.filtered.data[index + i]);
    }
    mr.total = {};
    mr.total.CE = mr.filtered.CE;
    mr.total.PE = mr.filtered.PE;
    delete mr.filtered;
    mr.strikePrices = r;
  }
  addToTradeList(mr);
}

function addToTradeList(mr) {
  if (tradeList.length >= 5) {
    tradeList = tradeList.slice(tradeList.length - 4);
  }
  tradeList.push(mr);
}

function getStrikes() {
  var strike = [];
  tradeList[tradeList.length - 1].strikePrices.forEach((element) => {
    var pcr = {};
    pcr.strikePrice = element.strikePrice;
    strike.push(pcr);
  });
  getPCROfStrikes(strike);

  return strike;
}

function getPCROfStrikes(strike) {
  strike.forEach((element) => {
    for (let index = 0; index < tradeList.length; index++) {
      var st = tradeList[index].strikePrices.find((ele) => {if(ele.strikePrice == element.strikePrice){return ele;}});
      if(st != undefined && (Object.keys(st).length !== 0)){
        element["PCR"+index] = (st.PE.openInterest/st.CE.openInterest).toFixed(2);
      }
    }
  });
}
