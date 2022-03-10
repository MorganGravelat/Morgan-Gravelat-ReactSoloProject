const express = require("express");
const asyncHandler = require("express-async-handler");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { Review } = require("../../db/models");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({where: { business_id: `${id}` }}); //might need refactor to get the proper id passed
    return res.json(reviews);
  })
);

router.post(
    "/create",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const newReview = await Review.create(req.body);

        return res.json(newReview)
    })
  );

  router.delete(
    "/delete/:id",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const id = await Review.delete(Review.findByPk(+req.params.id));

        return id;
    })
)

router.put(
    "/edit/:id",
    csrfProtection,
    asyncHandler(async (req, res) => {
        const review = await Review.findByPk(id); //TODO finish puts for reviews and business
    })
)
module.exports = router;
