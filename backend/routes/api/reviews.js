const express = require("express");
const asyncHandler = require("express-async-handler");
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { requireAuth } = require("../../utils/auth");
const { Review } = require("../../db/models");

const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const reviews = await Review.findAll({where: { business_id: id }}); //might need refactor to get the proper id passed
    return res.json(reviews);
  })
);

router.post(
    "/create",
    requireAuth,
    asyncHandler(async (req, res) => {
        const newReview = await Review.create(req.body);

        return res.json(newReview)
    })
  );

router.delete(
    "/delete/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        let review_id = id;
        await Review.destroy({where: { id: review_id }});
        return res.json(review_id);
    })
)

// router.delete(
//     "/:id",
//     requireAuth,
//     asyncHandler(async (req, res) => {
//         const id = parseInt(req.params.id);
//         let business_id = id;
//         await Review.destroy({where: {business_id}})
//         await Business.destroy({ where: { id }});

//         return res.json(id);
//     })
// )
// router.put(
//     '/edit/:id',
//     requireAuth,
//     validateReview,
//     asyncHandler(async (req, res) => {
//         const id = parseInt(req.params.id);
//         const review = await Review.findByPk(id);

//         review.set({...req.body});
//         review.dataValues.updatedAt = new Date();
//         await review.save();
//         return res.json(business);
//     })
// )
// router.put(
//     "/edit/:id",
//     csrfProtection,
//     asyncHandler(async (req, res) => {
//         const review = await Review.findByPk(id);
//     })
// )
module.exports = router;
