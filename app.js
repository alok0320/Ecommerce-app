const path = require("path");
const morgan = require("morgan");
const express = require("express");
const ejs = require("ejs");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoose = require("mongoose");
const productRouter = require("./Routes/productRoutes");
const userRouter = require("./Routes/userRoutes");
const viewRouter = require("./Routes/viewRoutes");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const MongoStore = require("connect-mongo")(session);
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);

const app = express();

//**************************  STRIPE *********************************** */

//**************************  STRIPE END*********************************** */

//1)    ***** GLOBAL MIDDLEWARES */

//Set Security HTTP headers
// app.use(helmet());

// Set limit to API request from one IP
// const limiter = rateLimit({
//   max: 300,
//   windowMs: 60 * 60 * 1000,
//   message: "Too Many Request Please Try After One Hour",
// });
// app.use("/alok", limiter);

//Data Sanitization Against NoSQL Query Injection
app.use(mongoSanitize());
app.use(cors());
//Data Sanitization Against XSS
// app.use(xss());

//Prevent Parameter Polluting
// app.use(hpp());

// To Set Pug Engine(Templates)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//To Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

//Body Parser, reading data from body in to req.body
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    cookie: {
      maxAge: 180 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//Development logging to console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.get("/", (req, res) => {
//   res.render("base");
// });

app.use("/alok/api/v1/products", productRouter);
app.use("/alok/api/v1/users", userRouter);
app.use("/", viewRouter);
app.use("/add-to-cart", viewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in this Server`));
});

app.use(globalErrorHandler);

module.exports = app;

// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1"
// },