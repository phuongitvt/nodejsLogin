'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING(),
      set: async function (val) {   
        const hash = await bcrypt.hashSync(val, 10);
        this.setDataValue('password', hash);
      },
    },
    role: DataTypes.INTEGER,
    highScore: DataTypes.INTEGER
  },
    {
      tableName: 'users',
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};