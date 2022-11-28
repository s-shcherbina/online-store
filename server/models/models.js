const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, defaultValue: 'email@gmail.com' },
  password: { type: DataTypes.STRING, defaultValue: 'customer' },
  role: { type: DataTypes.STRING, defaultValue: 'CUSTOMER' },
});
const CustomerData = sequelize.define('customer_data', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  local: { type: DataTypes.STRING },
  service: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
});
const Flower = sequelize.define('flower', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});
const Group = sequelize.define('group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING, unique: true, allowNull: false },
  // img: { type: DataTypes.STRING, allowNull: false },
});
const SubGroup = sequelize.define('sub_group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING },
  // img: { type: DataTypes.STRING, allowNull: false },
});
const Image = sequelize.define('image', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
});
const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // finished: { type: DataTypes.BOOLEAN, defaultValue: false },
});
const BasketFlower = sequelize.define('basket_flower', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  // price: { type: DataTypes.INTEGER },
});
const Gallery = sequelize.define('gallery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  label: { type: DataTypes.STRING },
});
const ImgGallery = sequelize.define('img_gallery', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
});

// const Review = sequelize.define('review', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   text: { type: DataTypes.TEXT, allowNull: false },
// });
// const Rating = sequelize.define('rating', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   rate: { type: DataTypes.INTEGER, allowNull: false },
// });

User.hasMany(Basket);
Basket.belongsTo(User);

User.hasMany(CustomerData);
CustomerData.belongsTo(User);

Basket.hasMany(BasketFlower);
BasketFlower.belongsTo(Basket);

Group.hasMany(SubGroup);
SubGroup.belongsTo(Group);

Group.hasMany(Flower);
Flower.belongsTo(Group);

Group.hasMany(Image);
Image.belongsTo(Group);

SubGroup.hasMany(Flower);
Flower.belongsTo(SubGroup);

SubGroup.hasMany(Image);
Image.belongsTo(SubGroup);

Flower.hasMany(BasketFlower);
BasketFlower.belongsTo(Flower);

Flower.hasMany(Image);
Image.belongsTo(Flower);

Gallery.hasMany(ImgGallery);
ImgGallery.belongsTo(Gallery);

// User.hasMany(Review);
// Review.belongsTo(User);
// User.hasMany(Rating);
// Rating.belongsTo(User);
// Flower.hasMany(Image);
// Image.belongsTo(Flower);
// Flower.hasMany(Review);
// Review.belongsTo(Flower);
// Flower.hasMany(Rating);
// Rating.belongsTo(Flower);

module.exports = {
  User,
  CustomerData,
  Basket,
  BasketFlower,
  Group,
  SubGroup,
  Flower,
  Image,
  Gallery,
  ImgGallery,
  // Rating,
  // Review,
};
