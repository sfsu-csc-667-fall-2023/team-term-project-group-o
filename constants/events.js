const PLAYER_JOINED = (game_id) => `game:${game_id}:player-joined`;

const GAME_STATE_UPDATED = (game_id, user_id) => `game:${game_id}:${user_id}:updated`;

const CHAT_MESSAGE_RECEIVED = (game_id) => `chat${game_id}:message`;

const LEADERBOARD_UPDATED = (game_id,user_id) => `game:${game_id}:updated:${user_id}:to-leaderboard`;

const MAX_PLAYERS = 10;
const GAME_CREATED = "game:created";
const GAME_STARTING = "game:starting";

const GAME_UPDATED = (game_id, user_id) => `game${game_id}:${user_id}updated`;

module.exports = {
  GAMES: {
    PLAYER_JOINED,
    GAME_STATE_UPDATED,
  },
  GAME_CREATED,
  MAX_PLAYERS,
  GAME_STARTING,
  GAME_UPDATED,
  CHAT_MESSAGE_RECEIVED,
  LEADERBOARD_UPDATED,
};
