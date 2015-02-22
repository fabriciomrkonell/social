var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(20),
      defaultValue: ''
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
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    biography: {
      type: DataTypes.STRING(160),
      defaultValue: ''
    },
    location: {
      type: DataTypes.STRING(30),
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING(100),
      defaultValue: ''
    },
    message: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    followers: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    following: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    password: {
      type: DataTypes.TEXT,
      set: function(password) {
        this.setDataValue('password', passwordHash.generate(password));
      }
    },
    avatar: {
      type: DataTypes.BLOB,
      get: function(){
        return new Buffer(this.getDataValue('avatar'), 'base64').toString('ascii');
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Message, { onDelete: 'cascade' });
        User.hasMany(models.Data, { onDelete: 'cascade' });
      }
    }
  });
  return User;
};
