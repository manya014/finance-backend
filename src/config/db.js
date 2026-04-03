const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error.message);
  }
};

// Load models
const UserModel = require('../modules/users/user.model');
const User = UserModel(sequelize);

const RecordModel = require('../modules/records/record.model');
const Record = RecordModel(sequelize);

// Associations
User.hasMany(Record, { foreignKey: 'userId', onDelete: 'CASCADE' });
Record.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, connectDB, User, Record };