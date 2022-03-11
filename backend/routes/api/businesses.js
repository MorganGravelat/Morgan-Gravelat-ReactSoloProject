const express = require("express");
const asyncHandler = require("express-async-handler");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { Business, Review } = require("../../db/models");
const { validateBusiness, validateBusinessEdit } = require("../../utils/validation");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const businesses = await Business.findAll();
    return res.json(businesses);
  })
);

router.get(
    "/:id",
    asyncHandler( async function (req, res) {
        const id = +req.params.id;
        const business = await Business.findByPk(id);
        return res.json(business);
    })
);

router.post(
    "/create",
    requireAuth,
    validateBusiness,
    asyncHandler(async (req, res) => {
        const newBusiness = await Business.create(req.body);

        return res.json(newBusiness)
    })
  ); //TODO finish puts for reviews and business

//   router.put("/:id",
//     asyncHandler(async (req, res) => {
//         const id = req.body.id
//         delete req.body.id;
//         await Business.update(req.body, {
//             where: {id},
//             returning: true,
//             plain: true
//         })

//         const business = await Business.findByPk(id);

//         return res.json(business);

//     })
//   )

  router.put(
      '/edit/:id',
      requireAuth,
      validateBusinessEdit,
      asyncHandler(async (req, res) => {
          const id = parseInt(req.params.id);
          const business = await Business.findByPk(id);

          business.set({...req.body});
          business.dataValues.updatedAt = new Date();
          await business.save();
          return res.json(business);
      })
  )

  router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let business_id = id;
        await Review.destroy({where: {business_id}})
        await Business.destroy({ where: { id }});

        return res.json(id);
    })
)
module.exports = router;
