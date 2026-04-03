const rateLimit = require('express-rate-limit');

// General limiter for all routes
exports.generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for auth routes
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 login/register attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many auth attempts, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});