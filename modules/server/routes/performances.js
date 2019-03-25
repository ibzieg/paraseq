const expressWs = require("express-ws");
const express = require("express");
const router = express.Router();

router.post(
  "/:perfId/scenes/:sceneId/tracks/:trackId/sequences/:seqId/data",
  (req, res) => {
    process.send({
      type: "createNote",
      ...req.params,
      ...req.body
    });
    res.status(200).send();
  }
);

module.exports = router;
