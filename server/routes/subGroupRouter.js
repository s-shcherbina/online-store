const Router = require('express');
const router = new Router();
const { SubGroup, Flower, Image } = require('../models/models');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { label, groupId } = req.body;
    const subGroup = await SubGroup.create({ label, groupId });
    return res.json(subGroup);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    let subGroups;
    const { groupId } = req.query;
    if (groupId) {
      subGroups = await SubGroup.findAll({ where: { groupId } });
    } else {
      subGroups = await SubGroup.findAll();
    }
    return res.json(subGroups);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const subGroup = await SubGroup.findOne({ where: { id } });
    return res.json(subGroup);
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const subGroup = await SubGroup.findOne({ where: { id } });
    await subGroup.update({ label });
    return res.json(subGroup);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const images = await Image.findAll({ where: { subGroupId: id } });
    images &&
      images.forEach(
        (image) =>
          fs.existsSync(path.resolve(__dirname, '..', 'static', image.img)) &&
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', image.img))
      );

    await Image.destroy({ where: { subGroupId: id } });
    await Flower.destroy({ where: { subGroupId: id } });
    await SubGroup.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
