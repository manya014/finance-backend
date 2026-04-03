const userService = require('./user.service');

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const data = await userService.updateUserRole(
      req.params.id,
      req.user.id,
      req.body.role
    );
    res.json({ success: true, message: 'Role updated', data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const data = await userService.updateUserStatus(
      req.params.id,
      req.user.id,
      req.body.isActive
    );
    res.json({ success: true, message: 'Status updated', data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};