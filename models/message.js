module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User);
      }
    }
  });
  return Message;
};
