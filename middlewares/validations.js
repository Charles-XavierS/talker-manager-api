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

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return (res.status(400).json({
      message: 'O campo "name" é obrigatório' }));
  }

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

  if (age < 18) {
    return (res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    }));
  }

  next();
};

const isTalkValid = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.length === 0 || talk === undefined) {
    return (res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    }));
  }

  next();
};

const isRateValid = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return (res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    }));
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return (res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }));
  }

  next();
};

const isWatchedAtValid = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (watchedAt === undefined) {
    return (res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    }));
  }

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
  isNameValid,
  isAgeValid,
  isTalkValid,
  isRateValid,
  isWatchedAtValid,
  isTokenValid,
};
