const Router = require('express');
const router = new Router();
const { Gallery, ImgGallery } = require('../models/models');

router.post('/', async (req, res) => {
  try {
    const { label } = req.body;
    const gallery = await SubGroup.create({ label, groupId });
    return res.json(gallery);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    return res.json(galleries);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findOne({ where: { id } });
    return res.json(gallery);
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const gallery = await Gallery.findOne({ where: { id } });
    await Gallery.update({ label });
    return res.json(gallery);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const images = await ImgGallery.findAll({ where: { subGroupId: id } });
    images &&
      images.forEach(
        (image) =>
          fs.existsSync(path.resolve(__dirlabel, '..', 'static', image.img)) &&
          fs.unlinkSync(path.resolve(__dirlabel, '..', 'static', image.img))
      );

    await ImgGallery.destroy({ where: { galleryId: id } });
    await Gallery.destroy({ where: { id } });
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
