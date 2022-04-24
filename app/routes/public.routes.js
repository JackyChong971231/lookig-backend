const { authJwt } = require("../middleware");
const controller = require("../controllers/public.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/test/categoryTree/getAll",
    controller.queryCategoryArray
  );

  app.post(
    "/api/test/add/submit",
    controller.addNewShopToTableShop
  );

  app.post(
    "/api/test/search/byCategoryId",
    controller.queryByCategoryId
  );

  app.post(
    "/api/test/search/byShopName",
    controller.queryByShopName
  );

  app.post(
    "/api/test/profile/getPendingShops",
    controller.getPendingShops
  );

  app.post(
    "/api/test/home/getIGProfileInfo",
    controller.getIGProfileInfo
  )
};
