const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

router.get('/talker', async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  
  return (res.status(200).json(JSON.parse(talkers)));
});

router.get('/talker/:id', async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const { id } = req.params;
  const talkerId = JSON.parse(talkers).find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkerId);
});

module.exports = router;
