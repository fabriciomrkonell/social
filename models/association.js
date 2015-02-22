module.exports = function(sequelize, DataTypes) {
  var Association = sequelize.define('Association', {
    userFollow: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        Association.belongsTo(models.User);
      }
    }
  });
  return Association;
};
