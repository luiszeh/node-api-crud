function validateEmail(req, res, next) {
    const { email } = req.body;

    const expValidateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i;

    if (!email || email === '') {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!expValidateEmail.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
}
  
module.exports = validateEmail;

// referencia RegExp.test(): https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
// regex de validação do email: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
