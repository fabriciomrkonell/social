module.exports = function(sequelize, DataTypes) {
  var Data = sequelize.define('Data', {
    text: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    isUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Data.belongsTo(models.User);
      }
    }
  });
  return Data;
};
