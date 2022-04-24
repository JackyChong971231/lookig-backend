module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define("shop", {
      shop_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      shop_name: {
        type: Sequelize.STRING,
        unique: true
      },
      added_by_user_id: {
        type: Sequelize.INTEGER
      },
      owned_by_user_id: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      category_combination_ids: {
        type: Sequelize.JSON,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      has_physical_store: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    });
  
    return Shop;
  };
