module.exports = (sequelize, Sequelize) => {
    const Category_combination = sequelize.define("category_combination", {
      category1_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      category2_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      category3_name: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      combination_id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true
      },
      click_count: {
        type: Sequelize.INTEGER,
        default: 0
      }
    });
  
    return Category_combination;
  };
