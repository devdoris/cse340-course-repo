import bcrypt from "bcrypt";
import {
    createUser,
    authenticateUser,
    getAllUsers
} from "../models/users.js";

import {
    getProjectsByUserId
} from "../models/volunteers.js";

const showUserRegistrationForm = (req, res) => {
    res.render("register", {
        title: "Register"
    });
};

const processUserRegistrationForm = async (req, res) => {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!name || name.length < 2 || name.length > 100) {
        req.session.message =
            "Name must be between 2 and 100 characters.";
        return res.redirect("/register");
    }

    if (!email || email.length > 100) {
        req.session.message =
            "Please enter a valid email address.";
        return res.redirect("/register");
    }

    if (!password || password.length < 8 || password.length > 72) {
        req.session.message =
            "Password must be between 8 and 72 characters.";
        return res.redirect("/register");
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUser(name, email, passwordHash);

        req.session.message =
            "Registration successful! Please log in.";
        req.session.messageType = "success";

        res.redirect("/");
    } catch (error) {
        console.error("Error registering user:", error);

        if (error.code === "23505") {
            req.session.message =
                "An account with this email already exists. Please use a different email or log in.";
            req.session.messageType = "error";

            return res.redirect("/register");
        }

        req.session.message =
            "An error occurred during registration. Please try again.";
        req.session.messageType = "error";

        res.redirect("/register");
    }
};

const showLoginForm = (req, res) => {
    if (req.query.logout === "success") {
        res.locals.message = "Logout successful!";
        res.locals.messageType = "success";
    }

    res.render("login", {
        title: "Login"
    });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);

        if (user) {
            req.session.user = user;

            req.session.message = "Login successful!";
            req.session.messageType = "success";

            if (res.locals.NODE_ENV === "development") {
                console.log("User logged in:", user);
            }

            res.redirect("/dashboard");
        } else {
            req.session.message = "Invalid email or password.";
            req.session.messageType = "error";
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Error during login:", error);

        req.session.message =
            "An error occurred during login. Please try again.";
        req.session.messageType = "error";

        res.redirect("/login");
    }
};

const processLogout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error logging out:", error);
            return res.redirect("/");
        }

        res.redirect("/login?logout=success");
    });
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.session.message =
            "Please log in to access this page.";

        return res.redirect("/login");
    }

    next();
};

const requireRole = (role, pageName = "this page", redirectPath = "/") => {
    return (req, res, next) => {
        // Check if user is logged in
        if (!req.session || !req.session.user) {
            req.session.message =
                "Please log in to access this page.";
                req.session.messageType = "error";
            return res.redirect("/login");
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.session.message =
                `You do not have permission to ${pageName}.`;
                req.session.messageType = "error";
            return res.redirect(redirectPath);
        }

        next();
    };
};

const showDashboard = async (req, res) => {
    const user = req.session.user;

    const volunteerProjects =
        await getProjectsByUserId(user.user_id);

    res.render("dashboard", {
        title: "Dashboard",
        name: user.name,
        email: user.email,
        volunteerProjects
    });
};

const showUsersPage = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.render("users", {
            title: "Users",
            users
        });
    } catch (error) {
        console.error("Error getting users:", error);

        res.status(500).render("500", {
            title: "Server Error"
        });
    }
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
};