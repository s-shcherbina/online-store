import { makeAutoObservable } from 'mobx';

export default class Store {
  constructor() {
    // this._user = {};
    this._customer = {};
    this._groups = [];
    this._subGroups = [];
    this._flowers = [];
    this._images = [];
    this._galleries = [];
    this._imgGalleries = [];

    this._baskets = [];
    this._basket = [];
    this._basketFlowers = [];
    // this._unProcessedBaskets = []
    // this._processedBaskets = []
    // this._processedBasket = []
    // this._basketBuyer = {}
    // this._unProcessedBasketFlowers = []
    // this._processedBasketFlowers = []
    // this._basketFlower = {}
    this._selectedGroup = {};
    this._selectedSubGroup = {};
    this._selectedFlower = {};
    this._selectedImage = {};

    this._selectedBasketFlower = {};
    this._selectedImgGallery = {};
    this._page = '';
    makeAutoObservable(this);
  }
  setGroups(groups) {
    this._groups = groups;
  }
  setSubGroups(subGroups) {
    this._subGroups = subGroups;
  }
  setFlowers(flowers) {
    this._flowers = flowers;
  }
  setImages(images) {
    this._images = images;
  }
  setBaskets(baskets) {
    this._baskets = baskets;
  }
  setBasket(basket) {
    this._basket = basket;
  }
  setBasketFlowers(basketFlowers) {
    this._basketFlowers = basketFlowers;
  }
  // setUnProcessedBaskets(baskets) {
  //   this._unProcessedBaskets = baskets;
  // }
  // setProcessedBaskets(baskets) {
  //   this._processedBaskets = baskets;
  // }
  // setProcessedBasket(basket) {
  //   this._processedBasket = basket;
  // }
  // setBasketBuyer(basket) {
  //   this._basketBuyer = basket;
  // }
  // setBasketFlowers(flowers) {
  //   this._basketFlowers = flowers;
  // }
  // setUnProcessedBasketFlowers(flowers) {
  //   this._unProcessedBasketFlowers = flowers;
  // }
  // setProcessedBasketFlowers(flowers) {
  //   this._processedBasketFlowers = flowers;
  // }
  // setBasketFlower(flower) {
  //   this._basketFlower = flower;
  // }
  setGalleries(galleries) {
    this._galleries = galleries;
  }
  setImgGalleries(imgGalleries) {
    this._imgGalleries = imgGalleries;
  }
  setSelectedGroup(group) {
    this._selectedGroup = group;
  }
  setSelectedSubGroup(subGroup) {
    this._selectedSubGroup = subGroup;
  }
  setSelectedFlower(flower) {
    this._selectedFlower = flower;
  }
  setSelectedImage(image) {
    this._selectedImage = image;
  }
  setSeletedBasketFlower(selectedBasketFlower) {
    this._selectedBasketFlower = selectedBasketFlower;
  }
  setSelectedGallery(gallery) {
    this._selectedGallery = gallery;
  }
  setSelectedImgGallery(imgGallery) {
    this._selectedImgGallery = imgGallery;
  }
  setPage(page) {
    this._page = page;
  }
  // setUser(user) {
  //   this._user = user;
  // }
  setCustomer(customer) {
    this._customer = customer;
  }
  // setBackgr(photo) {
  //   this._backgr = photo;
  // }
  // get user() {
  //   return this._user;
  // }
  get customer() {
    return this._customer;
  }
  get groups() {
    return this._groups;
  }
  get subGroups() {
    return this._subGroups;
  }
  get flowers() {
    return this._flowers;
  }
  get images() {
    return this._images;
  }
  get baskets() {
    return this._baskets;
  }
  get basket() {
    return this._basket;
  }
  get basketFlowers() {
    return this._basketFlowers;
  }
  get galleries() {
    return this._galleries;
  }
  get imgGalleries() {
    return this._imgGalleries;
  }
  // get basket() {
  //   return this._basket;
  // }
  // get unProcessedBaskets() {
  //   return this._unProcessedBaskets;
  // }
  // get processedBaskets() {
  //   return this._processedBaskets;
  // }
  // get processedBasket() {
  //   return this._processedBasket;
  // }
  // get basketBuyer() {
  //   return this._basketBuyer;
  // }
  // get basketFlowers() {
  //   return this._basketFlowers;
  // }
  // get unProcessedBasketFlowers() {
  //   return this._unProcessedBasketFlowers;
  // }
  // get processedBasketFlowers() {
  //   return this._processedBasketFlowers;
  // }
  // get basketFlower() {
  //   return this._basketFlower;
  // }
  get selectedGroup() {
    return this._selectedGroup;
  }
  get selectedSubGroup() {
    return this._selectedSubGroup;
  }
  get selectedFlower() {
    return this._selectedFlower;
  }
  get selectedImage() {
    return this._selectedImage;
  }
  get selectedBasketFlower() {
    return this._selectedBasketFlower;
  }
  get selectedGallery() {
    return this._selectedGallery;
  }
  get selectedImgGallery() {
    return this._selectedImgGallery;
  }
  get page() {
    return this._page;
  }
}
