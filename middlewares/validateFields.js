function validateFields(req, res, next) {
    const { talk } = req.body;
  
    if (!talk.watchedAt || talk.watchedAt === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    if (!talk.rate || talk.rate === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
  
    next();
}
  
module.exports = validateFields;
