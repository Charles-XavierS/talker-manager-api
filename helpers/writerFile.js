const fs = require('fs').promises;

const writerFile = async (data) => {
  const writeFile = await fs.writeFile('./talker.json', JSON.stringify(data), 'utf8');
  return writeFile;
};

module.exports = writerFile;
