const express = require('express');

const router = express.Router();

const db = require('../models/index');
const User = db.sequelize.models.User;
const Vlif9Users = db.sequelize.models.Vlif9Users;
const bcrypt = require('bcrypt');


const asyncMiddleware = require('../middleware/asyncMiddleware');

router.get('/status', (req, res, next) => {
  return User.findAll({
    raw: true,
    limit: 3
  })
    .then(function (result) {
      res.send(result);
    })
});
router.post('/signup', asyncMiddleware(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  await User.create({ email: email, password: password, firstName: firstName, lastName: lastName, role });
  res.status(200).json({ 'status': 'ok' });
}));

router.post('/login', asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  await User.findOne({ where: {email: email} }).then(function (result){
    user = result;
  });

  if (!user) {
    res.status(401).json({ 'message': 'unauthenticated' });
    return;
  }
  
  const validate = await bcrypt.compareSync(password, user.password);

  if (!validate) {
    res.status(401).json({ 'message': 'unauthenticated' });
    return;
  }
  res.status(200).json({ 'status': 'ok' });
}));

router.post('/logout', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});

router.post('/token', (req, res, next) => {
  res.status(200);
  res.json({ 'status': 'ok' });
});



module.exports = router;