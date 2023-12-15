const db = require("./connection.js");

const create = (message, sender_id, game_id, created_at) =>
  db.one(
    "INSERT INTO chat (sender_id, message, game_id, created_at) VALUES ($1, $2, $3, $4) RETURNING created_at",
    [sender_id, message, game_id, created_at]
  );


module.exports = {
  create,
};
