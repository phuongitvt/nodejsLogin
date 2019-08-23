/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Vlif9Users = sequelize.define('Vlif9Users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(400),
      allowNull: false,
      defaultValue: ''
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    block: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    sendEmail: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    registerDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    lastvisitDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    activation: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    params: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lastResetTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    resetCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    otpKey: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    otep: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    requireReset: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'vlif9_users',
    timestamps: false
  });
  Vlif9Users.associate = function(models) {
  };
  return Vlif9Users
};
