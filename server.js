const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const app = require("./app");

const DB = process.env.DATABASE_DEV.replace(
  "<PASSWORD>",
  process.env.DATABASE_DEV_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection Successful");
  });
let port = process.env.PORT
if (port == null || port == "") {
  port = 5000
}
app.listen(port, () => {
  console.log(`Server Started on Port ${port}...`);
});

// ERROR HANDLING lecture 13,14 Left (For Uncaught Rejctions and Uncaught Exception)