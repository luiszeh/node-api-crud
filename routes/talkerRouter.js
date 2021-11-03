const express = require('express');
const fs = require('fs');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateFields = require('../middlewares/validateFields');
const validateTalkObject = require('../middlewares/validateTalkObj');
const validateRate = require('../middlewares/validateRate');

const talkerFile = './talker.json';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    const talkers = fs.readFileSync(talkerFile, 'utf8');
    res.status(200).json(JSON.parse(talkers));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/search', validateToken, (req, res) => {
  const { q } = req.query;
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    if (!q || q === '') return res.status(200).json(JSON.stringify(talkers));
    const talker = talkers.filter((person) => person.name.includes(q));
    return talker.length > 0
      ? res.status(200).json(talkers)
      : res.status(200).json([]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).end();
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    const talker = talkers.find((person) => Number(person.id) === Number(id));
    return talker 
      ? res.status(200).json(talker)
      : res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/',
  validateToken,
  validateName, 
  validateAge,
  validateTalk,
  validateFields,
  validateTalkObject,
  (req, res) => {
    const { name, age, talk } = req.body;

    try {
      const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
      const lastTalker = talkers[talkers.length - 1];
      const newTalker = { name, age, talk, id: Number(lastTalker.id) + 1 };
      talkers.push(newTalker);

      fs.writeFileSync(talkerFile, JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

router.put('/:id',
  validateToken,
  validateName, 
  validateAge,
  validateTalk,
  validateRate,
  validateFields,
  validateTalkObject, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    const editedTalker = { name, age, talk, id: Number(id) };
    const newList = talkers.map((talker) => {
      if (Number(talker.id) === Number(id)) {
        return editedTalker;
      }
      return talker;
    });

    fs.writeFileSync(talkerFile, JSON.stringify(newList));
    res.status(200).json(editedTalker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', validateToken, (req, res) => {
  const { id } = req.params;

  try {
    const talkers = JSON.parse(fs.readFileSync(talkerFile, 'utf8'));
    const newList = talkers.filter((talker) => Number(talker.id) !== Number(id));

    fs.writeFileSync(talkerFile, JSON.stringify(newList));
    res.status(200).json({
      message: 'Pessoa palestrante deletada com sucesso',
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

// referencia metodo readFileSync: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
// referencia json.parse: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
