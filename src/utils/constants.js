const ROLES = {
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
};

const ROLE_HIERARCHY = {
  admin: 3,
  analyst: 2,
  viewer: 1,
};

const RECORD_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

module.exports = { ROLES, ROLE_HIERARCHY, RECORD_TYPES };