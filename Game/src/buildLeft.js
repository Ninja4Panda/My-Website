/**
 * Create the left 
 * @param {String} clientname - Name of current client
 * @param {Object} socket     - Current client's socket 
 * @param {string} roomid     - Current Game roomid 
 * @param {int} whoami        - owner=0, players=1, spectator=2
 * @param {Array} curPlayers  - A list of current players' name
 */
export function buildLeft(curPlayers) {
    const main = document.getElementById("lobby");
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid ; grid-template-columns:repeat(4,1fr); align-items: center; flex-grow: 8;";
    lobby.appendChild(left);
    curPlayers.forEach(createAvator);
    
    //Create 
    socket.on
}

function createAvator(clientname) {
    const slot = document.createElement("div");
    slot.style = "text-align: center;";
    const avator = document.createElement("img");
    avator.src = "/assests/q.jpg";
    avator.width = "200";
    avator.height = "300";
    slot.appendChild(avator);

    const name = document.createElement("p");
    name.innerText = clientname;
    name.style.color = "white";
    slot.appendChild(name);
    
    left.appendChild(slot); 
}