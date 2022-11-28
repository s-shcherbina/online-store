const Router = require('express');
const router = new Router();
const { BasketFlower } = require('../models/models');

router.post('/', async (req, res) => {
  try {
    const { number, basketId, flowerId } = req.body;
    const basketFlower = await BasketFlower.create({
      number,
      basketId,
      flowerId,
    });
    return res.json(basketFlower);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    let basketFlowers;
    const { basketId, flowerId } = req.query;
    if ((!basketId, !flowerId)) {
      basketFlowers = await BasketFlower.findAll();
    }
    if ((basketId, !flowerId)) {
      basketFlowers = await BasketFlower.findAll({ where: { basketId } });
    }
    if ((!basketId, flowerId)) {
      basketFlowers = await BasketFlower.findAll({ where: { flowerId } });
    }
    if ((basketId, flowerId)) {
      basketFlower = await BasketFlower.findAll({
        where: { flowerId, basketId },
      });
    }
    return res.json(basketFlowers);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    const basketFlower = await BasketFlower.findOne({ where: { id } });
    return res.json(basketFlower);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.params;
    await BasketFlower.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});
