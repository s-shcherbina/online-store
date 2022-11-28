const Router = require('express');
const router = new Router();
const { Flower, Image } = require('../models/models');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { label, price, text, groupId, subGroupId } = req.body;
    const flower = await Flower.create({
      label,
      price,
      text,
      groupId,
      subGroupId,
    });
    return res.json(flower);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    let flowers;
    const { groupId, subGroupId } = req.query;
    if ((!groupId, !subGroupId)) {
      flowers = await Flower.findAll();
    }
    if ((groupId, !subGroupId)) {
      flowers = await Flower.findAll({ where: { groupId } });
    }
    if ((!groupId, subGroupId === 0)) {
      flowers = await Flower.findAll({ where: { subGroupId } });
    }
    if ((groupId, subGroupId)) {
      flowers = await Flower.findAll({ where: { groupId, subGroupId } });
    }
    return res.json(flowers);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flower = await Flower.findOne({ where: { id } });
    return res.json(flower);
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label, price, text } = req.body;
    const flower = await Flower.findOne({ where: { id } });
    await flower.update({ label, price, text });
    return res.json(flower);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const images = await Image.findAll({ where: { flowerId: id } });
    images &&
      images.forEach(
        (image) =>
          fs.existsSync(path.resolve(__dirname, '..', 'static', image.img)) &&
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', image.img))
      );

    await Image.destroy({ where: { flowerId: id } });
    await Flower.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
