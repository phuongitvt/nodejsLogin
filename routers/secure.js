const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const db = require('../models/index');
const UserModel = db.sequelize.models.User;
 
const router = express.Router();
 
router.post('/submit-score', asyncMiddleware(async (req, res, next) => {
  const { email, score } = req.body;
  
  await UserModel.update({
    highScore: score,
  }, {
    where: {
      email: {
        [Op.eq]: email
      }
    }
  });

  res.status(200).json({ status: 'ok' });
}));
 
router.get('/scores', asyncMiddleware(async (req, res, next) => {
  const users = await UserModel.findAll({
    limit: 10,
    order:[
      ['highScore', 'DESC']
    ]
  });

  res.status(200).json(users);
}));
 
module.exports = router;