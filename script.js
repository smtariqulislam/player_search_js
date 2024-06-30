let addCount = 0;

function fetchPlayerData(playerName) {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${playerName}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayPlayerData(data.player);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// all player
function fetchPlayerAll() {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a`)
    .then((response) => response.json())
    .then((data) => {
      displayPlayerData(data.player);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.getElementById("searchButton").addEventListener("click", function () {
  let playerName = document.getElementById("playerName").value;
  if (playerName) {
    fetchPlayerData(playerName);
  } else {
    alert("Please enter a player name.");
  }
});

function displayPlayerData(players) {
  const playerDataDiv = document.getElementById("playerData");
  playerDataDiv.innerHTML = "";

  if (!players) {
    playerDataDiv.innerHTML = "<p>No players found.</p>";
    return;
  }

  // Display all players
  players.forEach((player) => {
    let playerInfo = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${
                      player.strThumb
                    }" class="card-img-top" alt="Player Image">
                    <div class="card-body">
                        <h5 class="card-title">${player.strPlayer}</h5>
                        <p class="card-text"><strong>Team:</strong> ${
                          player.strTeam
                        }</p>
                        <p class="card-text"><strong>Nationality:</strong> ${
                          player.strNationality
                        }</p>
                        <button class="btn btn-primary add-me-btn" data-player="${
                          player.strPlayer
                        }">Add Me</button>
                        <button class="btn btn-secondary details-btn" data-player='${JSON.stringify(
                          player
                        )}' data-bs-toggle="modal" data-bs-target="#playerModal">Details</button>
                    </div>
                </div>
            </div>
        `;
    playerDataDiv.innerHTML += playerInfo;
  });

  document.querySelectorAll(".add-me-btn").forEach((button) => {
    button.addEventListener("click", function () {
      addMe(this.getAttribute("data-player"));
    });
  });

  document.querySelectorAll(".details-btn").forEach((button) => {
    button.addEventListener("click", function () {
      showDetails(JSON.parse(this.getAttribute("data-player")));
    });
  });
}

function addMe() {
  if (addCount < 11) {
    addCount++;
    updateCountDisplay();
  } else {
    alert("Cannot add more than 11 times!");
  }
}

function updateCountDisplay() {
  const countDisplay = document.getElementById("countDisplay");
  countDisplay.textContent = `Count: ${addCount}`;
}

function showDetails(player) {
  const popupDetails = document.getElementById("popupDetails");
  const description = player.strDescriptionEN || "No description available";
  const limitedDescription =
    description.split(" ").slice(0, 10).join(" ") +"...";

  const playerDetails = `
        <h2>${player.strPlayer || "No name available"}</h2>
        <p><strong>Team:</strong> ${player.strTeam || "No team available"}</p>
        <p><strong>Nationality:</strong> ${
          player.strNationality || "No nationality available"
        }</p>
        <p><strong>Birthdate:</strong> ${
          player.dateBorn || "No birthdate available"
        }</p>
        <p><strong>Description:</strong> ${
          limitedDescription || "No description available"
        }</p>
        <div class="social-media-icons">
            ${
              player.strTwitter
                ? `<a href="https://twitter.com/${player.strTwitter}" target="_blank"><i class="fab fa-twitter"></i></a>`
                : ""
            }
            ${
              player.strFacebook
                ? `<a href="https://www.facebook.com/${player.strFacebook}" target="_blank"><i class="fab fa-facebook"></i></a>`
                : ""
            }
            ${
              player.strInstagram
                ? `<a href="https://www.instagram.com/${player.strInstagram}" target="_blank"><i class="fab fa-instagram"></i></a>`
                : ""
            }
        </div>
    `;

  popupDetails.innerHTML = playerDetails;
}

fetchPlayerAll();
