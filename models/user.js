var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60)
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      set: function(password) {
        this.setDataValue('password', passwordHash.generate(password));
      }
    }
  });
  return User;
};
