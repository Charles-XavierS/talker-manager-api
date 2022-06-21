const express = require('express');

const router = express.Router();

const fs = require('fs').promises;

const {
  isEmailValid,
  isPasswordValid,
  randomToken,
  isTokenValid,
  nameRequired,
  isNameValid,
  isAgeValid,
  agePlus18,
  rateRequired,
  isRateValid,
  talkRequired,
  watchedAtRequired,
  watchedAtValid,
} = require('../middlewares/validations');

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

router.post(
  '/login',
  isEmailValid,
  isPasswordValid,
  (_req, res) => res.status(200).json({ token: randomToken() }),
);

router.post(
  '/talker',
  nameRequired,
  isNameValid,
  isAgeValid,
  agePlus18,
  rateRequired,
  isRateValid,
  talkRequired,
  watchedAtRequired,
  watchedAtValid,
  isTokenValid,
  async (req, res) => {
    const talkers = JSON.parse(await fs.readFile('./talker.json', 'utf-8'));

    const { name, age, talk } = req.body;

    const newTalkers = { id: talkers.length + 1, name, age, talk };

    talkers.push(newTalkers);

    await fs.writeFile('./talker.json', JSON.stringify(talkers), 'utf-8');

    res.status(201).json(newTalkers);  
  },
);

module.exports = router;
