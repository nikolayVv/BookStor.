const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        (username, password, cbEnd) => {
            User.findOne(
                { username: username },
                (error, user) => {
                    if (error) return cbEnd(error);
                    if (!user)
                        return cbEnd(null, false, {
                            message: "Wrong username.",
                        });
                    if (!user.verifyPassword(password))
                        return cbEnd(null, false, { message: "Wrong password." });
                    return cbEnd(null, user);
                }
            );
        }
    )
);