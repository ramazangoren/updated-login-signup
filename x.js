const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const session = require("express-session");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(__dirname + "http://localhost:3000/Main.js "));
db.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
  }
});

app.post("/api/login", (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;
  db.query(
    "SELECT * FROM login where username ='" + Username +"' AND Password ='" +Password +"';",[Username, Password],
    function (err, result) {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        console.log("you have successfully logged in");
        res.redirect("http://localhost:3000/Main ");
      } else {
        res.send({ message: "wrong username/password" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
