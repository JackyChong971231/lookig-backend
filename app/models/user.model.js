module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pw_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    search_history: {
      type: Sequelize.JSON,
      allowNull: true
    },
    liked_shops: {
      type: Sequelize.JSON,
      allowNull: true
    }
  });

  return User;
};
