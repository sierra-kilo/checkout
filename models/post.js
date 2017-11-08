module.exports = function (sequelize, Sequelize) {
  var Post = sequelize.define('post', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    weed_type: {
      type: Sequelize.STRING,
      allowNull: false
    },

    strain: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false
    },

    date_created: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },

    upl: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Post.associate = function (models) {
    Post.belongsTo(models.user, {
    //   foreignKey: 'post',
      allowNull: false
    });
  };
  return Post;
};
