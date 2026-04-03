const router = require('express').Router();
const auth = require('../../middleware/auth.middleware');
const roleGuard = require('../../middleware/roleGuard');
const ctrl = require('./dashboard.controller');
const validate = require('../../middleware/validate');
const { summaryQuerySchema } = require('./dashboard.validation');
const { ROLES } = require('../../utils/constants');

// viewer, analyst, admin can all access dashboard
router.get('/summary', auth, roleGuard(ROLES.VIEWER), validate(summaryQuerySchema, 'query'), ctrl.getSummary);

module.exports = router;