module.exports = (schema, type = 'body') => (req, res, next) => {
  const data = type === 'query' ? req.query : req.body;

  const { error } = schema.validate(data);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};