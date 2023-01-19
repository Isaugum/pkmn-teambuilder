console.log("Starting...");
const express = require("express");
require("dotenv").config();
const searchRouter = require('./routes/search.js');

const app = express();
const port = process.env.PORT;

//ROUTES
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
