function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ success: true, ...data });
}

function failure(res, message = 'Request failed', statusCode = 400) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { success, failure };