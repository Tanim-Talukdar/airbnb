const User = require("../models/user.js");

module.exports.signupFrom = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success" , "Welcome to the Wanderlust!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginFrom =  (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) =>{
    req.flash("success", "Welcome back to the Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }else{
            req.flash("success" , "you are loggout!");
            res.redirect("/listings");
        }
    });
};