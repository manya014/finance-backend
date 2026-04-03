const recordService = require('./record.service');

exports.create = async (req, res) => {
  try {
    const data = await recordService.createRecord(req.body, req.user.id);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await recordService.getAllRecords(req.query, req.user.id);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await recordService.getOneRecord(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await recordService.updateRecord(req.params.id, req.user.id, req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await recordService.deleteRecord(req.params.id, req.user.id);
    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};