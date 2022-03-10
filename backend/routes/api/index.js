// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const businessRouter = require("./businesses.js");
const typesRouter = require("./types.js");
const reviewRouter = require("./reviews.js")

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


router.use("/business", businessRouter);
router.use("/type", typesRouter);
router.use("/review", reviewRouter);

module.exports = router;
