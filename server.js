var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var axios = require("axios");
var app = express();

app.options("*", cors());
app.use(cors());
app.use(bodyParser.urlencoded({ type: "*/*" }));

app.get("/todos", function (req, res, next) {
  // console.log(req.url);
  axios
    .get("https://react-hooks-5298f-default-rtdb.firebaseio.com/todos.json")
    .then((firebaseResp) => {
      // Object.keys(firebaseResp.data).forEach((key) => {
      //   arrayData.push(firebaseResp.data[key]);
      // });
      if (firebaseResp.data === null) {
        res.send({ data: [] });
        return;
      }
      const newa = Object.values(firebaseResp.data);
      res.send({ data: newa });
    });
});

app.post("/todos", function (req, res, next) {
  const items = req.body.items;
  items.map((v) => {
    let b = { ...v };
    if (b.complete !== undefined) {
      b.complete = true;
    } else {
      b.complete = false;
    }
    return b;
  });
  res.redirect(301, "http://localhost:3000/");
});

app.post("/todos/delete", function (req, res, next) {
  const deleteItem = Number(req.query.id);
  req.filter((item) => {
    return item.id !== deleteItem;
  });
  // res.redirect(301, "http://localhost:3000/");
});

const port = 8333;

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
