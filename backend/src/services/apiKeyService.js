const { v4: uuidv4 } = require('uuid');

function generateApiKey() {
  return uuidv4().replace(/-/g, '');
}

module.exports = { generateApiKey };