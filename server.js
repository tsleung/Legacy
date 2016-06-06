var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/assets',express.static(__dirname))
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});