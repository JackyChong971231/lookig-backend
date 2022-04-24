const db = require("../models");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const { authJwt } = require("../middleware");

const SUCCESS = 1;
const FAILED  = 0;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send({
    isSignedIn: true,
    message: "User Content."
  });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.addIntoSearchHistory = (req, res) => {
  const token = req.body.authHeader["x-access-token"]
  const decoded = jwt.verify(token, config.secret);
  const user_id = decoded.id;
  db.User.update({search_history: req.body.searchString},{where: {user_id: user_id}})
    .then(([affectedCount, affectedRows]) => {
      console.log( affectedCount, affectedRows )
      res.status(200).send(affectedRows)
    });
  // SearchHistory.findOne({
  //   where: {
  //     user_id: req.body.user_id
  //   }
  // })
  //   .then(user => {
  //     res.status(200).send({
  //       history_list: user.history_list,
  //     });
  //   })
}

exports.submitReview = (req, res) => {
  const token = req.body.authHeader["x-access-token"]
  const decoded = jwt.verify(token, config.secret);
  const user_id = decoded.id;
  db.Review.create({
    user_id: user_id,
    shop_id: req.body.reviewInfo.shop_id,
    rating: req.body.reviewInfo.rating,
    comment: req.body.reviewInfo.comment
  })
    .then(response => {
      res.status(200).send(response)
    })
}

exports.saveOrUnsavedShop = (req, res) => {
  const token = req.body.authHeader["x-access-token"]
  const decoded = jwt.verify(token, config.secret);
  const user_id = decoded.id;
  db.User.update({liked_shops: req.body.savedShopsArray}, {where: {user_id: user_id}})
    .then(([affectedCount, affectedRows]) => {
      res.status(200).send(affectedRows)
    });
}