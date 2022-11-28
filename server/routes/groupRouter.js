const Router = require('express');
const router = new Router();
const { Group, SubGroup, Flower, Image } = require('../models/models');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { label } = req.body;
    const group = await Group.create({ label });
    return res.json(group);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const groups = await Group.findAll();
    return res.json(groups);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findOne({ where: { id } });
    return res.json(group);
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const group = await Group.findOne({ where: { id } });
    await group.update({ label });
    return res.json(group);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const images = await Image.findAll({ where: { groupId: id } });
    images &&
      images.forEach(
        (image) =>
          fs.existsSync(path.resolve(__dirname, '..', 'static', image.img)) &&
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', image.img))
      );

    await Image.destroy({ where: { groupId: id } });
    await Flower.destroy({ where: { groupId: id } });
    await SubGroup.destroy({ where: { groupId: id } });
    await Group.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
