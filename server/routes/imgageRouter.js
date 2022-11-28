const Router = require('express');
const router = new Router();
const { Image } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { flowerId, subGroupId, groupId } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const image = await Image.create({
      img: fileName,
      flowerId,
      subGroupId,
      groupId,
    });
    return res.json(image);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findOne({ where: { id } });
    return res.json(image);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  console.log(req.query);
  try {
    const { groupId, subGroupId, flowerId } = req.query;
    let images;
    if ((groupId, !subGroupId, !flowerId)) {
      images = await Image.findAll({ where: { groupId } });
    }
    if ((0, 0, 0)) {
      images = await Image.findAll();
    }
    if ((groupId, subGroupId, 0)) {
      images = await Image.findAll({ where: { groupId, subGroupId } });
    }
    if ((groupId, subGroupId, flowerId)) {
      images = await Image.findAll({
        where: { groupId, subGroupId, flowerId },
      });
    }
    // if ((0, 0, groupId)) {
    //   images = await Image.findAll({ where: { groupId } });
    // }
    // if ((flowerId, subGroupId)) {
    //   images = await Image.findAll({
    //     where: { flowerId, subGroupId, groupId },
    //   });
    // }
    // if ((!flowerId, subGroupId, groupId)) {
    //   images = await Image.findAll({ where: { subGroupId, groupId } });
    // }
    // if ((flowerId, !subGroupId, groupId)) {
    //   images = await Image.findAll({ where: { flowerId, groupId } });
    // }
    // if ((flowerId, subGroupId, !groupId)) {
    //   images = await Image.findAll({ where: { flowerId, subGroupId } });
    // }
    return res.json(images);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findOne({ where: { id } });
    if (fs.existsSync(path.resolve(__dirname, '..', 'static', image.img))) {
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', image.img));
    }
    await Image.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
