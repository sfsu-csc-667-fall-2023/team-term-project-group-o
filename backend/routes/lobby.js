const express = require('express');

const router = express.Router();

router.get("/", (_request,response) => {
    response.render("lobby.ejs");
});

module.exports = router;