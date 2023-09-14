const mongoose = require("mongoose");
const passport = require("passport");
const User = mongoose.model("User");
const Book = mongoose.model("Book");

const allUsers = (req, res) => {
    User.find()
    // .select("_id name surname email username phoneNumber")
    .exec((napaka, user) => {
        if (!user) {
            return res.status(404).json({
                message: "Couldn't find any users in the database!",
            });
        } else if (napaka) {
            return res.status(500).json(napaka);
        }
        res.status(200).json(user);
    });
};

const userDetails = (req, res) => {
    User.findById(req.params.idUser)
        .select("-myBooks -randomValue -hashValue")
        .exec((napaka, user) => {
            if (!user) {
                return res.status(404).json({
                    message: "Couldn't find a user with the given ID!",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(user);
        });
};

const userLog = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required",
        });
    }
    passport.authenticate("local", (error, user, data) => {
        if (error)
            return res.status(500).json(error);
        if (user)
            res.status(200).json({ token: user.generateJWT() });
        else
            res.status(401).json(data);
    })(req, res)
};

const userRegister = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, password and email are required.",
        });
    }
    const user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.country = req.body.country;
    user.city = req.body.city;
    user.address = req.body.address;
    user.phoneNumber = req.body.phoneNumber;
    user.role = req.body.role;
    user.convertPassword(req.body.password);

    user.save((error) => {
        if (error)
            res.status(500).json(error);
        else
            res.status(200).json({ token: user.generateJWT() })
    })
};

const addUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (!username || !email || !password) {
        return res.status(400).json({
            sporočilo: "Username, password and email are required.",
        });
    }
    const user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.country = req.body.country;
    user.city = req.body.city;
    user.address = req.body.address;
    user.phoneNumber = req.body.phoneNumber;
    user.role = req.body.role;
    user.convertPassword(req.body.password);

    user.save((error) => {
        if (error)
            res.status(500).json(error);
        else
            res.status(200).json(user);
    })
}

const checkUser = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    if (!username || !email) {
        return res.status(400).json({
            sporočilo: "Username and email are required.",
        });
    }
    User.findOne({ $or: [{ email: email }, { username: username }] })
        .select("_id")
        .exec((napaka, user) => {
            if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(user);
        });
};

const editUser = (req, res) => {
    if (!req.params.idUser) {
        return res.status(404).json({
            message: "Couldn't find the user. idUser is a required parameter",
        });
    }
    User.findById(req.params.idUser)
        .select("-myBooks -randomValue -hashValue")
        .exec((napaka, user) => {
            if (!user) {
                return res.status(404).json({
                    message: "Couldn't find a user with the given ID!",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
            user.country = req.body.country;
            user.city = req.body.city;
            user.address = req.body.address;
            user.phoneNumber = req.body.phoneNumber;
            user.profilePicture = req.body.profilePicture;
            user.save((napaka, user) => {
                if (napaka) {
                    res.status(404).json(napaka);
                } else {
                    res.status(200).json(user);
                }
            });
        });
};

const deleteUser = async (req, res) => {
    const { idUser } = req.params;

    if (idUser) {
        User.findById(idUser).exec((napaka, user) => {
            if (!user) {
                return res.status(404).json({
                    message: "Couldn't find a user with the given ID!",
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            for (let i = 0; i < user.myBooks.length; i++) {
                Book.findByIdAndRemove(user.myBooks[i]._id).exec((napaka) => {
                    if (napaka) {
                        return res.status(500).json(napaka);
                    }
                });
            }
            User.findByIdAndRemove(user._id).exec((napaka) => {
                if (napaka) {
                    return res.status(500).json(napaka);
                }
                res.status(204).json(null);
            });
        });
    } else {
        res.status(404).json({
            message: "Couldn't find a user with the given ID!",
        });
    }
};

module.exports = {
    allUsers,
    userDetails,
    checkUser,
    editUser,
    deleteUser,
    userLog,
    userRegister,
    addUser
};
