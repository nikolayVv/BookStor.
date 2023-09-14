const mongoose = require("mongoose");
const User = mongoose.model("User");
const Comment = mongoose.model("Comment");

// return all comments under a user
// as a request we need userId to load comments
const allComments = (req, res) => {
    let userId = req.params.idUser;
    if (!userId) {
        return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
    }
    User.findById(userId)
        .select("comments")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
            } else if (error) {
                return res.status(500).json(error);
            } 
            res.status(200).json({ comments: user.comments });
        })
};

// add a specific comment of a user
// need to put userId of current user into request, profilePicture of commentator, name, email, and textbody of comment
const addComment = (req, res) => {
    let userId = req.params.idUser;
    if (!userId) {
        return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
    }
    //? je to v redu al je treba nardit tko da dobis userId, commentatorId pa pol povlečš iz baze atribute?
    Comment.create(
        {
            profilePicture: req.body.profilePicture,
            name: req.body.name,
            email: req.body.email,
            text: req.body.text
        },
        (error, comment) => {
            if (error) {
                res.status(400).json(error);
            } else {
                User.findById(userId)
                    .select("comments")
                    .exec((error, user) => {
                        if (!user) {
                            return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
                        } else if (error) {
                            return res.status(500).json(error);
                        }
                        user.comments.push(comment);
                        user.save((error, user) => {
                            if (error) {
                                res.status(400).json(error);
                            } else {
                                res.status(201).json(comment);
                            }
                        })
                    });
            }
        }
    );

};

// edit a specific comment  of a user
//? req has userId to know whose comments we are editing and commentId to know which of his comments to kul?
const editComment = (req, res) => {
    // user id where comment is located (so we can update him)
    let userId = req.params.idUser;
    let commentId = req.params.commentId;
    if (!userId || !commentId) {
        return res.status(404).json({ message: "Couldn't find a user/comment with the given ID!" });
    }
    //? lahko tko nardim da se sam comment posodobi al je treba dejansk nardit da se gre pod userja in pol tam iscemo med vsemi commenti?
    Comment.findById(commentId)
        .exec((error, comment) => {
            if (!comment) {
                return res.status(404).json({ message: "Couldn't find a comment with the given ID!" });
            } else if (error) {
                return res.status(500).json(error);
            }
            comment.profilePicture = req.body.profilePicture;
            comment.name = req.body.name;
            comment.email = req.body.email;
            comment.text = req.body.text;
            comment.created = req.body.created;
            comment.save((error, comment) => {
                if (error) {
                    res.status(404).json(error);
                } else {
                    User.findById(userId)
                        .select("comments")
                        .exec((error, user) => {
                            if (!user) {
                                return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
                            } else if (error) {
                                return res.status(500).json(error);
                            } else if (!user.comments) {
                                return res.status(404).json({ message: "Couldn't find a comment with the given ID!" });
                            }
                            user.comments.forEach(userComment => {
                                if (userComment._id === commentId) {
                                    userComment = comment;
                                }
                            })
                            user.save((error, user) => {
                                if (error) {
                                    res.status(400).json(error);
                                } else {
                                    res.status(200).json({ editedComment: comment });
                                }
                            })
                        });
                }
            });
        });
};

// delete a specific comment of a user
const deleteComment = (req, res) => {
    // user id where comment is located (so we can update user)
    let userId = req.params.idUser;
    let commentId = req.params.idComment;
    if (!userId || !commentId) {
        return res.status(404).json({ message: "Couldn't find the book/user. idBook/idUser is a required parameter" });
    }
    User.findById(userId)
        .select("comments")
        .exec((error, user) => {
            if (!user) {
                return res.status(404).json({ message: "Couldn't find a user with the given ID!" });
            } else if (error) {
                return res.status(500).json(error);
            } else if (!user.comments) {
                return res.status(404).json({ message: "Couldn't find a comment with the given ID!" });
            }
            user.comments.forEach(userComment => {
                if (userComment._id.toString() === commentId) {
                    let index = user.comments.indexOf(userComment);

                    if (index > -1)
                        user.comments.splice(index, 1);
                }
            })
            user.save((error, user) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(200).json({user});
                }
            })
        });
};

module.exports = {
    allComments,
    addComment,
    editComment,
    deleteComment
};