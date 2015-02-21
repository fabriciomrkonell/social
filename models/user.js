var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true
    },
    username: {
      type: DataTypes.STRING(25),
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    biography: {
      type: DataTypes.STRING(160)
    },
    location: {
      type: DataTypes.STRING(30)
    },
    website: {
      type: DataTypes.STRING(100)
    },
    message: {
      type: DataTypes.INTEGER,
    },
    followers: {
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
