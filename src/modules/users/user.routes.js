const router = require('express').Router();
const auth = require('../../middleware/auth.middleware');
const roleGuard = require('../../middleware/roleGuard');
const ctrl = require('./user.controller');
const validate = require('../../middleware/validate');
const { updateRoleSchema, updateStatusSchema } = require('./user.validation');
const { ROLES } = require('../../utils/constants');

// only admin can manage users
router.get('/', auth, roleGuard(ROLES.ADMIN), ctrl.getAllUsers);
router.patch('/:id/role', auth, roleGuard(ROLES.ADMIN), validate(updateRoleSchema), ctrl.updateRole);
router.patch('/:id/status', auth, roleGuard(ROLES.ADMIN), validate(updateStatusSchema), ctrl.updateStatus);

module.exports = router;