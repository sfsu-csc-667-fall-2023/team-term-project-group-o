const http = require("http");
const { Server } = require("socket.io");

const initSockets = (app, sessionMiddleware) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {

    let game_id = socket.handshake.query.path?.substring(1);
    const user_id = socket.request.session?.user?.id;

    if (user_id == undefined || game_id == undefined) {
       return;
     }

     if (game_id === "lobby") {
       game_id = 0;
     } else {
       game_id = parseInt(game_id?.substring(game_id.lastIndexOf("/") + 1));
     }
  });

  app.set("io", io);

  return server;
};

module.exports = initSockets;
