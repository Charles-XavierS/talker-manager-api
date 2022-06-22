const express = require('express');
const bodyParser = require('body-parser');

const readerFile = require('./helpers/readerFile');
const writerFile = require('./helpers/writerFile');

const {
  isEmailValid,
  isPasswordValid,
  randomToken,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isRateValid,
  isWatchedAtValid,
  isTokenValid,
} = require('./middlewares/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readerFile();
  
  return (res.status(HTTP_OK_STATUS).json(talkers));
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readerFile();
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === parseInt(id, 10));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post(
  '/login',
  isEmailValid,
  isPasswordValid,
  (_req, res) => res.status(HTTP_OK_STATUS).json({ token: randomToken() }),
);

app.post(
  '/talker',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isRateValid,
  isWatchedAtValid,
  async (req, res) => {
    const talkers = await readerFile();
    const newTalker = { ...req.body, id: talkers.length + 1 };
    talkers.push(newTalker);

    writerFile(talkers);

    res.status(201).json(newTalker);
  },
);

app.put(
  '/talker/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isRateValid,
  isWatchedAtValid,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readerFile();

    const idIndex = talkers.findIndex((talker) => talker.id === +id);
    talkers[idIndex] = {
      id: +id,
      ...req.body,
    };

    await writerFile(talkers);

    res.status(HTTP_OK_STATUS).json(talkers[idIndex]);
  },
);
