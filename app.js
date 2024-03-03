// app.js (sau alt fișier principal)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRouter = require("./routes/contactRouter");
const favoriteRouter = require("./routes/favoriteRouter"); // Adaugă noul router

const app = express();

const DB_URL =
  "mongodb+srv://vlad22petru:BnxRFnAqWdmF25ak@cluster0.tx7gmon.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
   
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use("/api/contacts", contactRouter);
app.use("/api/contacts/favorite", favoriteRouter); // Adaugă noul router

module.exports = app;
