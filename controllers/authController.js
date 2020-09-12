const crypto = require("crypto");
const {
  promisify
} = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("./../utils/email");
const mongoose = require("mongoose");
// const {decode} = require('punycode');

const signToken = (id) => {
  return jwt.sign({
      id,
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  //Do not Send password in Output
  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  //   check if Email and password exist

  if (!email || !password) {
    return next(new AppError("Please Provide Email and Password", 400));
  }

  //if User Exist && password exist
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }
  // when everything is Ok send token to client

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) check if token exist

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are Not Logged in", 401));
  }

  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  //check if User Exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User with this JWT does not Exist.", 401));
  }

  //Check if User has changed Password after the token was issued
  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("User Recently changed Password! Login Again"));
  }

  //Grant Permission to use protected Route
  req.user = currentUser;
  next();
});

// Logout
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 4 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

//ONLY FOR RENDER PAGES , NO ERROR

exports.isLoggedIn = (async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      //check if User Exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      //Check if User has changed Password after the token was issued
      if (currentUser.changePasswordAfter(decoded.iat)) {
        return next();
      }

      //There is LoggedIn User
      res.locals.user = currentUser;

      return next();
    } catch (err) {
      res.locals.user = 0;
      return next();
    }
  }
  res.locals.user = 0;
  next();
});

// ************************************************ AUTHOIZATION ******************************************

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(...roles);
    //roles ['admin','seller']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You Dont have Permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get User on Posted Email
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new AppError("There is no user with this Email", 404));
  }
  //2)Generate the Random ResetToken
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  //3)Send it to User as Email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/alok/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forget your password? Please touch he link below to reset your Password : ${resetURL}. \n Please Ignore if You didnt Made this Request`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (Valid for 10 minute)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token Sent to User",
    });
  } catch (error) {
    (user.passwordResetToken = undefined),
    (user.passwordResetExpires = undefined),
    await user.save({
      validateBeforeSave: false,
    });
    return next(
      new AppError("There was an Error in sending Email . Try Again Later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1)User based on the Token

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  //2)If token is not expired and there is user, Set the New Password
  if (!user) {
    return next(new AppError("Token is Invalid or has Expired", 400));
  }
  user.password = req.body.password;
  user.passwordConf = req.body.passwordConf;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3)Update changePasswordAt property for the user
  //(Implemented in User Model)

  //4) Log the User in send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1)Get User from Collection
  const user = await User.findById(req.user.id).select("+password");

  //2)Check if POSTED CurrentPassword is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      new AppError("Current Password You Entered is Not Correct", 401)
    );
  }

  //3)If so, then Update Password

  user.password = req.body.password;
  user.passwordConf = req.body.passwordConf;
  await user.save();

  //4)Log User in , Send JWT
  createSendToken(user, 200, res);
});