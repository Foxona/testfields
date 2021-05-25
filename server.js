var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

let todos = [
  { id: 0, task: "Помыть кота", complete: true },
  { id: 5, task: "Удалить кебаб", complete: false },
  { id: 3, task: "Взорвать воронеж", complete: true },
];

app.options("*", cors());
app.use(cors());

app.use(bodyParser.urlencoded({ type: "*/*" }));

app.get(
  "https://react-hooks-5298f-default-rtdb.firebaseio.com/todos",
  function (req, res) {
    console.log(req);
    console.log(res);
    res.json({ msg: "резалт", data: req });
  }
);

app.get("/todos", function (req, res, next) {
  res.json({
    msg: "ЗАПРОСЫ",
    data: todos,
  });
});

app.post("/todos", function (req, res, next) {
  const items = req.body.items;
  todos = items.map((v) => {
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
  todos = todos.filter((item) => {
    return item.id !== deleteItem;
  });
  // res.redirect(301, "http://localhost:3000/");
});

const port = 8333;

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
