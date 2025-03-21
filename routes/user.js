const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllersUser = require("../controllers/user.js");


router.route("/signup")
    //Signup From
    .get(controllersUser.signupFrom)
    //Signup
    .post(wrapAsync(controllersUser.signup));


router.route("/login")
    //Login Form
    .get(controllersUser.loginFrom)
    //Login
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login" , failureFlash: true}) ,wrapAsync(controllersUser.login));

//Logout
router.get("/logout", controllersUser.logout);

module.exports = router;