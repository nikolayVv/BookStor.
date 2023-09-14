const mongoose = require("mongoose");
const User = mongoose.model("User");
const Rating = mongoose.model("Rating");

const allRatings = (req, res) => {
    let idUser = req.params.idUser;
    if (!idUser) {
        return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
    }
    User.findById(idUser)
        .select("alreadyRanked")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
            } else if (error) {
                return res.status(500).json(error);
            }
            res.status(200).json({ ratings: user.alreadyRanked, user: user });
        });
};

const addRating = (req, res) => {
    let idUser = req.params.idUser; //tisti ki je dobil rating
    if (!idUser) {
        return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
    }
    Rating.create(
        {
            userId: req.body.userId,
            rank: req.body.rank
        },
        (error, rating) => {
            if (error) {
                res.status(400).json(error);
            } else {
                User.findById(idUser)
                    .select("ranking alreadyRanked")
                    .exec((error, user) => {
                        if (!user) {
                            return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
                        } else if (error) {
                            return res.status(500).json(error);
                        }
                        user.alreadyRanked.push(rating);
                        calculateRanking(req, res, user, rating);
                    });
            }
        }
    );
};

const editRating = (req, res) => {
    let inside = false;
    let idUser = req.params.idUser; //tisti ki je dobil rating
    if (!idUser) {
        return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
    }
    User.findById(idUser)
        .select("ranking alreadyRanked")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({ message: "Couldn't find a user with the given ID! " });
            } else if (error) {
                return res.status(500).json(error);
            }
            user.alreadyRanked.forEach(rating => {
                    if (rating.userId === req.body.userId && !inside) {
                        inside = true;
                        rating.rank = req.body.rank;
                        rating.save((error, rating) => {
                            if (error) {
                                res.status(400).json(error);
                            } else {
                                calculateRanking(req, res, user, rating);
                            }
                        });
                    }
            });
            if (!inside) {
                res.status(404).json({ message: "Couldn't find a user with the given ID!" });
            }
        });
};

const calculateRanking = (req, res, user, editedRating) => {
    let totalScore = 0;
    let totalResponse = user.alreadyRanked.length;
    user.alreadyRanked.forEach(rating => {
        totalScore += rating.rank;
    });
    user.ranking = totalScore/totalResponse;
    user.save((error, user) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(201).json({ rating: editedRating, userRanking: user.ranking });
        }
    });
}

module.exports = {
    allRatings,
    addRating,
    editRating
};