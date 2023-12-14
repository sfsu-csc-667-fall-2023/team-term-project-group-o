import io from "socket.io-client";
import { getGameId } from "../util/game-id";
import GAMES from "../../constants/events";

const socket = io({ query: { path: window.location.pathname } });
const userTemplate = document.querySelector("#user-template");
const usersContainer = document.querySelector("#users");
const gameID = getGameId(document.location.pathname);

socket.on(GAMES.GAMES.PLAYER_JOINED(gameID), ({ username }) => {
  const userElement = userTemplate.content.cloneNode(true);
  userElement.querySelector("span.username").innerText = username;
  usersContainer.appendChild(userElement);
});

socket.on(GAMES.GAME_STARTING, (data) => {
  console.log(GAMES.GAME_STARTING, { data });
});

fetch("/authentication/group-o", {
  method: "post",
})
  .then((response) => response.json())
  .then(({ id: userID }) => {
    socket.on(GAMES.GAMES.GAME_STATE_UPDATED(gameID, userID), async (gameState) => {
      console.log({ gameState });
    });

    socket.on(GAMES.GAME_UPDATED(gameID, userID), (gameUpdated) => {
      const cardTemplate = document.querySelector("#card-template");
      const cardsContainer = document.querySelector("#game-card-rows");
      cardsContainer.innerHTML = "";

      const playerTemplate = document.querySelector("#players-template");
      const playersContainer = document.querySelector("#players");
      playersContainer.innerHTML = "";

      gameUpdated.forEach((gameElement) => {
        const playerEntry = playerTemplate.content.cloneNode(true);
        playerEntry.querySelector(".username").innerText = gameElement.userinfo.username;
        playerEntry.querySelector(".count").innerText = gameElement.userinfo.count;
        playersContainer.appendChild(playerEntry);

        document.getElementById("current-player-turn").textContent = "Current Player: " + gameElement.current_game.user_id;

        const topCardImgTemplate = document.querySelector('#topcard-template-img');
        const topCardImgContainer = document.querySelector("#topcardimg");
        topCardImgContainer.innerHTML = "";

        const topCardImg = topCardImgTemplate.content.cloneNode(true);
        topcardColor = gameElement.current_game.current_color;
        topcardNumber = gameElement.current_game.current_number;
        topcardSpecial = gameElement.current_game.specialcard;
        const topCardImageURL = `/img/${topcardColor}_${topcardNumber}_${topcardSpecial}.png`;
        topCardImg.querySelector(".topcard-img").src = topCardImageURL;
        topCardImgContainer.appendChild(topCardImg);

        document.getElementById("userid-head").innerText = "UserID: " + userID;

        if (gameElement.gamecards.length > 0) {
          gameElement.gamecards.forEach((card) => {
            const cardEntry = cardTemplate.content.cloneNode(true);
            const imageURL = `/img/${card.color}_${card.value}_${card.specialcard}.png`;
            const image = cardEntry.querySelector(".cardimage");
            image.src = imageURL;

            image.addEventListener("click", function () {
              const url = "/games/play/" + card.gameid;
              fetch(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(card),
              });
            });

            cardsContainer.appendChild(cardEntry);
          });
        }
      });
    });
  });
