const Router = require('express');
const router = new Router();
const { Basket } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    const basket = await Basket.create({ userId });
    return res.json(basket);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    let baskets;
    if (userId) {
      baskets = await Basket.findAll({ where: { userId } });
    } else {
      baskets = await Basket.findAll();
    }

    return res.json(baskets);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const basket = await Basket.findOne({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Basket.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

// router.put("/:id", async (req, res) => {
//   const {id} = req.params
// 	const {finished} = req.body
// 	const basket = await Basket.findOne({where: {id}})
// 	await basket.update({finished})
// 	return res.json(basket)
// })

module.exports = router;
