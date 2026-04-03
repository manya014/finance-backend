const { Record } = require('../../config/db');
const { fn, col, literal, Op } = require('sequelize');
const { ROLES, RECORD_TYPES } = require('../../utils/constants');

exports.getSummary = async (user, query) => {
  const { startDate, endDate } = query;

  // admin sees all, others see own data
  const baseWhere = user.role === ROLES.ADMIN ? {} : { userId: user.id };

  // optional date filter
  if (startDate || endDate) {
    baseWhere.date = {
      ...(startDate && { [Op.gte]: startDate }),
      ...(endDate && { [Op.lte]: endDate }),
    };
  }

  const [income, expense] = await Promise.all([
    Record.sum('amount', { where: { ...baseWhere, type: RECORD_TYPES.INCOME } }),
    Record.sum('amount', { where: { ...baseWhere, type: RECORD_TYPES.EXPENSE } }),
  ]);

  const byCategory = await Record.findAll({
    where: baseWhere,
    attributes: [
      'category',
      'type',
      [fn('SUM', col('amount')), 'total'],
    ],
    group: ['category', 'type'],
    raw: true,
  });

  const recent = await Record.findAll({
    where: baseWhere,
    order: [['createdAt', 'DESC']],
    limit: 5,
  });

  const monthly = await Record.findAll({
    where: baseWhere,
    attributes: [
      [fn('TO_CHAR', col('date'), 'YYYY-MM'), 'month'],
      'type',
      [fn('SUM', col('amount')), 'total'],
    ],
    group: [literal("TO_CHAR(date, 'YYYY-MM')"), 'type'],
    order: [[literal("TO_CHAR(date, 'YYYY-MM')"), 'ASC']],
    raw: true,
  });

  return {
    totalIncome: income || 0,
    totalExpense: expense || 0,
    netBalance: (income || 0) - (expense || 0),
    byCategory,
    recentActivity: recent,
    monthlyTrends: monthly,
  };
};