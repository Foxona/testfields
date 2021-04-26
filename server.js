var express = require("express");
var cors = require("cors");
// var bodyParser = require("body-parser");
var app = express();

// app.options('*', cors())
app.use(cors());

// app.use(bodyParser.urlencoded({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.all("/posttodo", function (req, res, next) {
  res.json({
    msg: "This is CORS-enabled for all origins!",
    data: req.body,
  });
});
const port = 8333;
app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
