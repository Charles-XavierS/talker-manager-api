const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const randomToken = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    result += characters[Math.floor(Math.random() 
    * characters.length)];
  }

  return result;
};

const nameRequired = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return (res.status(400).json({
      message: 'O campo "name" é obrigatório' }));
  }

  next();
};

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (name && name.length < 3) {
    return (res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres' }));
  }

  next();
};

const isAgeValid = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === undefined) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório' });
    }

  next();
};

const agePlus18 = (req, res, next) => {
  const { age } = req.body;

  if (age < 18) {
    return (res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }));
  }

  next();
};

const talkRequired = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.length === 0 || talk === undefined) {
    return (res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    }));
  }

  next();
};

const rateRequired = (req, res, next) => {
  if (req.body.talk.rate === undefined) {
    return (res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    }));
  }

  next();
};

const isRateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return (res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
  }

  next();
};

const watchedAtRequired = (req, res, next) => {
  if (req.body.talk === undefined || req.body.talk.watchedAt === undefined) {
    return (res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    }));
  }

  next();
};

const watchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!watchedAt.match(date)) {
    return (res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    }));
  }

  next();
};

const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) { return (res.status(401).json({ message: 'Token não encontrado' })); }

  if (token.length !== 16) { return (res.status(401).json({ message: 'Token inválido' })); }

  next();
};

module.exports = {
  isEmailValid,
  isPasswordValid,
  randomToken,
  nameRequired,
  isNameValid,
  isAgeValid,
  agePlus18,
  talkRequired,
  rateRequired,
  isRateValid,
  watchedAtRequired,
  watchedAtValid,
  isTokenValid,
};
