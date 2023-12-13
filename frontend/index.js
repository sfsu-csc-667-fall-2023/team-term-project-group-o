import io from "socket.io-client";
import { getGameId } from "./util/game-id";
import GAMES from "../constants/events";

const socket = io({
  query: { path: window.location.pathname }
});

const gameID = getGameId(document.location.pathname);

fetch("/authentication/teamx", {
  method: "post",
})
  .then((response) => response.json())
  .then(({ id: userID }) => {
    socket.on(GAMES.GAMES.GAME_STATE_UPDATED(gameID, userID), async (gameState) => {
      console.log({ gameState });
    });

    socket.on(GAMES.CHAT_MESSAGE_RECEIVED(gameID), (data) => {
      const messageContainer = document.querySelector("#messages");
      const chatMessageTemplate = document.querySelector("#chat-message-template");
      const chatMessageElement = chatMessageTemplate.content.cloneNode(true);
      chatMessageElement.querySelector(".username").innerText = data.username + ":";
      chatMessageElement.querySelector(".message").innerText = data.message;
      messageContainer.appendChild(chatMessageElement);
    });
  });

document
  .querySelector("input#chatMessage")
  .addEventListener("keydown", (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    const message = event.target.value;
    event.target.value = "";

    const gameId = getGameId(document.location.pathname);

    fetch(`/chat/${gameId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });
  });
