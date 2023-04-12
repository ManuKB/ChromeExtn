setInterval(function() {
  console.log("in loop"+ new Date());


chrome.runtime.sendMessage({url: 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY'}, function(response) {
  console.log(response);
  // Do something with the response data
  var date = new Date();
  var timeString = date.toLocaleTimeString();
  downloadJSON(response, timeString);
var body = document.body;
// Replace the body with new HTML content
body.innerHTML = "<h1>Hello World!</h1><p>This is the new content.</p>";
});
}, 120*1000);

function downloadJSON(data, filename) {
  var jsonBlob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  var url = URL.createObjectURL(jsonBlob);
  var link = document.createElement('a');
  link.href = url;
  link.download = filename + '.json';
  link.click();
  URL.revokeObjectURL(url);
}