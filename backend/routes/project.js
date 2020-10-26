const express = require("express");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", function(req, res){
    res.send({ok: true, user: req.userId});
});

module.exports = router