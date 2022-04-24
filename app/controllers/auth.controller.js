const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const passwordHashed = bcrypt.hashSync(req.body.password, 8)
  // Save User to Database
  User.create({
    user_name: req.body.username,
    email: req.body.email,
    pw_hash: passwordHashed,
    role_id: 2
  })
    // .then(user => {
    //   if (req.body.roles) {
    //     Role.findAll({
    //       where: {
    //         role_name: {
    //           [Op.or]: req.body.roles
    //         }
    //       }
    //     }).then(roles => {
    //       user.setRoles(roles).then(() => {
    //         res.send({ message: "User registered successfully!" });
    //       });
    //     });
    //   } else {
    //     // user role = 1
    //     Role.create({role_id: 3, }).then(() => {
    //       res.send({ message: "User registered successfully!" });
    //     });
    //   }
    // })
    .then(() => {
      res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      user_name: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.pw_hash
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.user_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      Role.findOne({
        where: {
          role_id: user.role_id
        }
      }).then(role => {
        res.status(200).send({
          id: user.user_id,
          username: user.user_name,
          email: user.email,
          roles: role.role_name,
          accessToken: token,
          search_history: user.search_history,
          liked_shops: user.liked_shops
        });
      })
      // var authorities = [];
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      //   res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //     roles: authorities,
      //     accessToken: token
      //   });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
