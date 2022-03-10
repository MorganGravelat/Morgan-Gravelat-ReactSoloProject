const express = require("express");
const asyncHandler = require("express-async-handler");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { Business } = require("../../db/models");

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
    csrfProtection,
    asyncHandler(async (req, res) => {
        const newBusiness = await Business.create(req.body);

        return res.json(newBusiness)
    })
  ); //TODO finish puts for reviews and business

  router.delete(
    "/:id",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const id = await Business.delete(Business.findByPk(+req.params.id));

        return id;
    })
)
module.exports = router;
