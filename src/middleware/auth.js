const checkAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }

    req.session.message = "Please log in to access this page.";
    req.session.messageType = "auth";
    res.redirect("/login");
};

export { checkAuth };