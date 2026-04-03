const { Sequelize } = require('sequelize');
require('dotenv').config();
console.log(" DATABASE_URL:", process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
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