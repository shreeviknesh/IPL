let playerNameInputField = document.getElementById("player-name");
let playerTypeInputField = document.getElementById("player-type");
let responseField = document.getElementById("response-values");
let baseServerPath = "http://localhost:5000";

playerNameInputField.addEventListener("input", async () => {
    responseField.innerHTML = "";
    if (playerNameInputField.value.length < 3) {
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let players = await getPlayers(this.responseText);
            responseField.innerHTML = "";
            responseField.appendChild(players);
        }
    };

    let path = `${baseServerPath}/find/${playerTypeInputField.value}/${playerNameInputField.value}`;
    xhttp.open("GET", path, true);
    xhttp.send();
});

async function getPlayers(players) {
    let responseDiv = document.createDocumentFragment();
    let index = 0;
    while (players[index] != undefined) {
        let player = players[index];
        let div = document.createElement("div");
        div.classList.add("player-card");
        let name = document.createElement("span");
        let foreigner = document.createElement("span");

        name.innerHTML = player["Name"];
        if (player["Foreigner"] == true) {
            foreigner.innerHTML = "Foreigner";
        } else {
            foreigner.innerHTML = "Indian";
        }

        div.appendChild(name);
        div.appendChild(foreigner);
        responseDiv.appendChild(div);
        index++;
    }
    return responseDiv;
}
