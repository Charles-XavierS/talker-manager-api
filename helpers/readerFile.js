const fs = require('fs').promises;

const readerFile = async () => {
  const readFile = await fs.readFile('./talker.json', 'utf8');
  return readFile;
};

module.exports = readerFile;
