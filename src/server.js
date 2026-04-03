const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { sequelize, connectDB } = require('./config/db');
const { generalLimiter, authLimiter } = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Apply general rate limiter to all routes
app.use(generalLimiter);

// Routes
app.use('/api/auth', authLimiter, require('./modules/auth/auth.routes'));
app.use('/api/records', require('./modules/records/record.routes'));
app.use('/api/dashboard', require('./modules/dashboard/dashboard.routes'));
app.use('/api/users', require('./modules/users/user.routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Finance API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log('✅ Tables synced');

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();