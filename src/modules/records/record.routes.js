const router = require('express').Router();
const auth = require('../../middleware/auth.middleware');
const roleGuard = require('../../middleware/roleGuard');
const ctrl = require('./record.controller');
const validate = require('../../middleware/validate');
const { createRecordSchema, updateRecordSchema } = require('./record.validation');
const { getAllQuerySchema } = require('./record.query.validation');
const { ROLES } = require('../../utils/constants');

// viewer can see list, analyst and above can see individual records
router.get('/', auth, roleGuard(ROLES.VIEWER), validate(getAllQuerySchema, 'query'), ctrl.getAll);
router.get('/:id', auth, roleGuard(ROLES.ANALYST), ctrl.getOne);

// only admin can create, update, delete
router.post('/', auth, roleGuard(ROLES.ADMIN), validate(createRecordSchema), ctrl.create);
router.put('/:id', auth, roleGuard(ROLES.ADMIN), validate(updateRecordSchema), ctrl.update);
router.delete('/:id', auth, roleGuard(ROLES.ADMIN), ctrl.remove);

module.exports = router;