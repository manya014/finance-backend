const { ROLE_HIERARCHY } = require('../utils/constants');

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!userRole)
      return res.status(403).json({ success: false, message: 'No role found' });

    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = Math.min(...allowedRoles.map(r => ROLE_HIERARCHY[r] || 0));

    if (userLevel < requiredLevel)
      return res.status(403).json({ success: false, message: 'Access denied' });

    next();
  };
};