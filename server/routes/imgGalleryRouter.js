const Router = require('express');
const router = new Router();
const { ImgGallery } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { galleryId } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const image = await ImgGallery.create({
      img: fileName,
      galleryId,
    });
    return res.json(image);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await ImgGallery.findOne({ where: { id } });
    return res.json(image);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const { galleryId } = req.query;
    let images;
    if (galleryId) {
      images = await ImgGallery.findAll({ where: { galleryId } });
    } else {
      images = await ImgGallery.findAll();
    }
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
