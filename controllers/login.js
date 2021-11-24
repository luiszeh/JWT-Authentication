const Joi = require('joi');
// importando a biblioteca que gera o token
const jwt = require('jsonwebtoken');
// aqui eu chamo a variavel JWT_SECRET do arquivo das minha variáveis globais
const { JWT_SECRET } = process.env;

const validateBody = (body) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

 module.exports = async (req, res, next) => {
   const { error } = validateBody(req.body);
   /* Caso ocorra erro na validação do Joi, passamos esse */
   /* erro para o express, que chamará nosso middleware de erro */
   if (error) return next(error);
// aqui é nossa configuração do payload, onde ficam os dados do usuário e no caso uma autorização, se ele é admin ou não
  const payload = {
    username: req.body.username,
    admin: false,
  };
// aqui criamos nosso token a partir da lib jsonwebtoken com a função sign, que recebe o payload, meu token secreto e expiresIn que é um parametro da lib, que dita quanto tempo expira a section
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};
