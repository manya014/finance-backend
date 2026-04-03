const { User } = require('../../config/db');

exports.getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role', 'isActive'],
  });
  return users;
};

exports.updateUserRole = async (targetId, requesterId, role) => {
  if (targetId === requesterId) {
    const error = new Error('Cannot change your own role');
    error.status = 400;
    throw error;
  }

  const user = await User.findByPk(targetId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  user.role = role;
  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

exports.updateUserStatus = async (targetId, requesterId, isActive) => {
  if (targetId === requesterId) {
    const error = new Error('Cannot change your own status');
    error.status = 400;
    throw error;
  }

  const user = await User.findByPk(targetId);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  user.isActive = isActive;
  await user.save();

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
  };
};