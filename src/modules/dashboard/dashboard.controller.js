const dashboardService = require('./dashboard.service');

exports.getSummary = async (req, res) => {
  try {
    const data = await dashboardService.getSummary(req.user, req.query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};