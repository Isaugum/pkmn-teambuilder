console.log("Starting...");
const express = require("express");
require("dotenv").config();

const searchRouter = require('./routes/search.js');
const registerRouter = require('./routes/registerUser.js');
const loginRouter = require('./routes/login.js');

const app = express();
const port = process.env.PORT;

//ROUTES
app.use("/search", searchRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

//SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
