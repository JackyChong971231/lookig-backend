
const axios = require("axios");
const db = require("../models");
const { QueryTypes } = require('sequelize');
const config = require("../config/auth.config");
const Shop = db.Shop;
const Sequelize = require("sequelize");
const { getLinkPreview, getPreviewFromContent } = require('link-preview-js')

async function queryCategoryArray(req, res) {
  const categoryPathArray = await db.Category_combination.findAll({attributes: ['category1_name', 'category2_name', 'category3_name', 'combination_id'], raw: true});
  res.status(200).send(categoryPathArray);
}

exports.addNewShopToTableShop = (req, res) => {
  Shop.create({
    shop_name: req.body.newShopInfo.shop_name,
    added_by_user_id: req.body.newShopInfo.added_by_user_id,
    owned_by_user_id: req.body.newShopInfo.owned_by_user_id,
    category_combination_ids: req.body.newShopInfo.category_combination_ids,
    is_active: req.body.newShopInfo.is_active,
    has_physical_store: req.body.newShopInfo.has_physical_store
  })
    .then(result => {res.status(200).send({status: "Successful"})})
    .catch(err => {res.status(500).send({status: err.message})})
}

async function queryByCategoryId(req, res) {
  // console.log(req.body);
  const resultArray = await db.Shop.findAll({
    where: Sequelize.fn('JSON_CONTAINS', Sequelize.col('category_combination_ids'), String(req.body.category_id)),
    raw: true
  })
  for (var eachShop of resultArray) {
    const currentShopReview = await db.sequelize.query(
      `SELECT review.review_id, review.user_id, review.rating, review.comment, review.updatedAt, user.user_name FROM review
      INNER JOIN user ON user.user_id = review.user_id
      WHERE shop_id = ${eachShop.shop_id}`, 
      { type: db.Sequelize.QueryTypes.SELECT }
    );
    // const currentShopReview = await db.Review.findAll({
    //   where: {
    //     shop_id: eachShop.shop_id
    //   },
    //   raw: true
    // })
    eachShop.review = currentShopReview
  }
  res.status(200).send(resultArray);
}

exports.queryByShopName = (req, res) => {
  db.Shop.findAll({
    where: {
      shop_name: {
        [Sequelize.Op.like]: `%${req.body.searchString}%`
      }
    },
    raw: true
  })
    .then(resultArray => {
      res.status(200).send(resultArray);
    })
}

async function getShopInfoByShopID(req, res) {
  const likedShopsArrayString = JSON.stringify(req.body.likedShopsArray).slice(1, -1);
  const likedShopsInfoArray = await db.sequelize.query(
    `SELECT * FROM shop
    WHERE shop_id IN (${likedShopsArrayString})`,
    { type: db.Sequelize.QueryTypes.SELECT }
  );
  res.status(200).send(likedShopsInfoArray);
}

exports.getPendingShops = (req,res) => {
  db.Shop.findAll({
    where: {
      is_approved: null
    },
    raw: true
  })
    .then(response => {
      res.status(200).send(response)
    })
}

exports.getLinkPreview = (req, res) => {
  console.log(req.body.url);
  getLinkPreview(req.body.url)
    .then(response => {
      // console.debug(data);
      res.status(200).send(response);
    })
}

exports.getIGProfileInfo = (req, res) => {
  axios({
    method: 'get',
    url: `https://www.instagram.com/wwhitetale/?__a=1`
  })
    .then(response => {
      const a = response;
      res.status(200).send(response.data);
    })
}

exports.queryCategoryArray = queryCategoryArray
exports.queryByCategoryId = queryByCategoryId
