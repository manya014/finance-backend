const { Record } = require('../../config/db');
const { Op } = require('sequelize');

exports.createRecord = async (data, userId) => {
  const record = await Record.create({ ...data, userId });
  return record;
};

exports.getAllRecords = async (query, userId) => {
  const { type, category, startDate, endDate, search, page = 1, limit = 10 } = query;

  const where = { userId };

  if (type) where.type = type;
  if (category) where.category = category;

  if (search) {
    where[Op.or] = [
      { notes: { [Op.iLike]: `%${search}%` } },
      { category: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (startDate || endDate) {
    where.date = {
      ...(startDate && { [Op.gte]: startDate }),
      ...(endDate && { [Op.lte]: endDate }),
    };
  }

  const { count, rows } = await Record.findAndCountAll({
    where,
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [['date', 'DESC']],
  });

  return {
    data: rows,
    meta: {
      total: count,
      page: +page,
      limit: +limit,
    },
  };
};

exports.getOneRecord = async (id, userId) => {
  const record = await Record.findOne({ where: { id, userId } });

  if (!record) {
    const error = new Error('Record not found');
    error.status = 404;
    throw error;
  }

  return record;
};

exports.updateRecord = async (id, userId, data) => {
  const record = await Record.findOne({ where: { id, userId } });

  if (!record) {
    const error = new Error('Record not found');
    error.status = 404;
    throw error;
  }

  await record.update(data);
  return record;
};

exports.deleteRecord = async (id, userId) => {
  const record = await Record.findOne({ where: { id, userId } });

  if (!record) {
    const error = new Error('Record not found');
    error.status = 404;
    throw error;
  }

  await record.destroy();
};