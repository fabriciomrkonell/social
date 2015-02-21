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
    message: {
      type: DataTypes.INTEGER,
    },
    follow: {
      type: DataTypes.INTEGER,
    },
    following: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.TEXT,
      set: function(password) {
        this.setDataValue('password', passwordHash.generate(password));
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Message, { onDelete: 'cascade' });
      }
    }
  });
  return User;
};
