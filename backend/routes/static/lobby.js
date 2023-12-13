const express = require("express");
const Games = require("../../db/games.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;

  const availableGames = await Games.getAvailableGames(user_id);
  const reJoinGames = await Games.getGames(user_id);
  const runningGames = await Games.getRunningGames(user_id);

  response.render("lobby", {
    title: "Grouup - O",
    availableGames: availableGames,
    reJoinGames: reJoinGames,
    runningGames: runningGames,
  });
});

module.exports = router;
