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

router.post(
  "/create",
  csrfProtection,
  asyncHandler(async (req, res) => {
      const bodyInfo = req.body;

    // console.log("THIS IS WHAT I WNAT TO SEE OH OMY GOD", Gameshelves);
    // let data = Gameshelves.split("-");
    // let gameShelfId = data[0];
    // let gameId = data[1];
    // const user = res.locals.user;
    // const gameJoin = await db.Gamejoin.create({
    //   gameShelfId,
    //   gameId,
    //});

    //res.redirect(`/games`);
    // const gameShelf = await db.Gameshelf.create({
    //   name: gameShelfName,
    //   userId: user.id,
    // });
    // res.redirect("/games");
  })
);
module.exports = router;
