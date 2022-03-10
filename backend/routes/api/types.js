const express = require("express");
const asyncHandler = require("express-async-handler");

const { Type } = require("../../db/models");

const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
      const types = await Type.findAll();
      return res.json(types);
    })
  );
  module.exports = router;
