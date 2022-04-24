const config = require("../config/db.config.js");
const categoryDbHandler = require("./data/category.dataclass.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: '0',
    define: {
      freezeTableName: '1'
    },

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

////////////////////////////////////////////// New //////////////////////////////////////////////
const db = {};

db.Sequelize = Sequelize;   // The Library
db.sequelize = sequelize;   // Points to the database

db.Role                 = require("../models/role.model.js")(sequelize, Sequelize);
db.User                 = require("../models/user.model.js")(sequelize, Sequelize);
db.Shop                 = require("../models/shop.model.js")(sequelize, Sequelize);
db.Category_combination = require("../models/category_combination.model.js")(sequelize, Sequelize);
db.Review               = require("../models/review.model.js")(sequelize, Sequelize);

db.Role.hasMany(db.User, {
  foreignKey: 'role_id',
  onDelete: "SET NULL"
});

db.User.hasMany(db.Shop, {
  foreignKey: "added_by_user_id",
  sourceKey:  "user_id",
  onDelete: "SET NULL"
});
db.User.hasMany(db.Shop, {
  foreignKey: "owned_by_user_id",
  sourceKey:  "user_id",
  onDelete: "SET NULL"
});

db.Shop.hasMany(db.Review, {
  foreignKey: "shop_id",
  onDelete: "SET NULL"
});
db.User.hasMany(db.Review, {
  foreignKey: "user_id",
  onDelete: "SET NULL"
});

categoryDbHandler.syncCategoryTree(db);

db.Role.create({role_id: 0, role_name: 'Admin'})
.catch(err => {
  console.log(err.message)
});
db.Role.create({role_id: 1, role_name: 'Moderator'})
.catch(err => {
  console.log(err.message)
});
db.Role.create({role_id: 2, role_name: 'User'})
.catch(err => {
  console.log(err.message)
});


////////////////////////////////////////////// Old //////////////////////////////////////////////
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.User = require("../models/user.model.js")(sequelize, Sequelize);
// db.Role = require("../models/role.model.js")(sequelize, Sequelize);
// db.SearchHistory = require("../models/search_history.model.js")(sequelize, Sequelize);
// db.SavedList = require("../models/saved_list.model.js")(sequelize, Sequelize);
// db.Preference = require("../models/preference.model.js")(sequelize, Sequelize);
// db.Shop = require("../models/shop.model.js")(sequelize, Sequelize);
// db.Category = require("../models/category.model.js")(sequelize, Sequelize);
// db.SubCategory = require("../models/sub_category.model.js")(sequelize, Sequelize);
// db.Review = require("../models/review.model.js")(sequelize, Sequelize);
// db.ShopCategoryRelationship = require("../models/shop_category_relationship.model.js")(sequelize, Sequelize);

// db.Role.hasMany(db.User, {
//   foreignKey: 'role_id'
// });

// db.User.hasOne(db.SearchHistory, {
//   foreignKey: "user_id"
// });

// db.User.hasMany(db.SavedList, {
//   foreignKey: 'user_id'
// });
// db.Shop.hasMany(db.SavedList, {
//   foreignKey: 'shop_id'
// });

// db.User.hasOne(db.Preference, {
//   foreignKey: "user_id"
// });

// db.User.hasMany(db.Shop, {
//   foreignKey: "added_by_user_id",
//   sourceKey:  "user_id"
// });

// db.User.hasMany(db.Shop, {
//   foreignKey: "owned_by_user_id",
//   sourceKey:  "user_id"
// });

// db.Category.hasMany(db.SubCategory, {
//   foreignKey: "category_id"
// });

// db.Shop.hasMany(db.Review, {
//   foreignKey: "shop_id"
// });
// db.User.hasMany(db.Review, {
//   foreignKey: "user_id"
// });

// db.Shop.hasMany(db.ShopCategoryRelationship, {
//   foreignKey: "shop_id"
// });
// db.Category.hasMany(db.ShopCategoryRelationship, {
//   foreignKey: "category_id"
// });
// db.SubCategory.hasMany(db.ShopCategoryRelationship, {
//   foreignKey: "sub_category_id"
// });

////////////////////////////////////////////// Original //////////////////////////////////////////////
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;