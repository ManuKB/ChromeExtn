var tradeList = [];

function mainPage() {
    return { "content": "<head> <style> html, body { height: 100%; margin: 0; padding: 0; } .container { display: flex; flex-wrap: wrap; height: 100%; } .box { flex: 1 0 50%; box-sizing: border-box; border: 1px solid black; } tr, td{ border: 1px solid black; } table{ padding: 10px; } </style></head><body> <div class='container'> <div class='box box1'> <table> <tr class='strikePrice'> <td>{{strikePrice}}</td> <td>{{PCR0}}</td> <td>{{PCR1}}</td> <td>{{PCR2}}</td> <td>{{PCR3}}</td> <td>{{PCR4}}</td> </tr> </table> </div> <div class='box'>Content 2</div> <div class='box'>Content 3</div> <div class='box'>Content 4</div> </div></body>"};
}
