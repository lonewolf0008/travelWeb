const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.userSignup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) next(err);

      req.flash("success", `Welcome ${username} 🙏`);
      res.redirect("/listing");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.userLogin = async (req, res) => {
  req.flash("success", `Welcome back ${req.body.username} 👏`);
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "logged out 👋");
    res.redirect("/listing");
  });
};
