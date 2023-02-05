console.log("Starting...");
const express = require("express");
const { db, initializeDatabase } = require("./loadDatabase");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "userId",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    expires: 60 * 60 * 24,
  }

}))

const registerRouter = require('./routes/registerUser.js');
const loginRouter = require('./routes/login.js');

//ROUTES
app.use("/login", loginRouter);
app.use("/register", registerRouter);

//SERVER
app.listen(port, () => {
  initializeDatabase();
  console.log(`Server listening on port ${port}`);
});
