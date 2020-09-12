const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const {
    where
} = require('./../models/userModel');






//*************************Updating CurrentUser Data***********************************

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(element => {
        if (allowedFields.includes(element)) newObj[element] = obj[element];
    });
    return newObj;
}




exports.updateMe = catchAsync(async (req, res, next) => {

    //1) Create Error if User Posted Passwod Data
    if (req.body.password || req.body.passwordConf) {
        return next(new AppError('This Route is not for Updating Password use /updatePassword for Updating Password', 400));
    }

    //2)Filtering the Data which we dont want to allow user to update
    const filteredBody = filterObj(req.body, 'name', 'email');

    //Update Data
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'Success',
        data: {
            updateUser
        }
    });
});

//*************************  END  ***********************************


exports.getAllUsers = async (req, res, next) => {
    // role = "admin"
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: {
            users
        },
    });
};

exports.createUser = (req, res) => {
    res.status(201).json({
        status: "success",
        data: "User Created",
    });
};

exports.getSingleUser = (req, res) => {
    const id = req.params.id * 1;
    const singleUser = users.find((el) => el.id === id);
    res.status(200).json({
        status: "success",
        data: {
            singleUser,
        },
    });
};

exports.updateUser = (req, res) => {
    res.status(200).json({
        status: "success",
        data: "<Updated User>",
    });
};

exports.deleteUser = (req, res) => {
    res.status(404).json({
        status: "success",
        data: "<User Deleted Successfully>",
    });
};