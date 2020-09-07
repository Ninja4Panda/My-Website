/**
 * Build the description for player
 * @param {Object} socket - Client socket 
 */
export function buildDescription(socket) {
    const description = document.createElement("div");
    description.style = "display: grid; grid-template-columns:repeat(2,1fr);"

    //Add all the divs in
    const role = document.createElement("p");
    role.id = "Role";
    role.style = "color: white; text-align: center;";
    role.className = "font-weight-bold";
    role.innerText = "Role:";
    
    const winCon = document.createElement("p");
    winCon.id = "winCon";
    winCon.style = "color: white; text-align: center;";
    winCon.className = "font-weight-bold";
    winCon.innerText = "Winning Condition:";
    
    const role_text = document.createElement("p");
    const winCon_text = document.createElement("p");

    const right = document.getElementById("contents");
    description.appendChild(role);
    description.appendChild(role_text);
    description.appendChild(winCon);
    description.appendChild(winCon_text);
    right.appendChild(description)

    //Receive role from server
    socket.on("Role Description", ({playerRole}) => {
        //Change colour of text based on their role
        switch (playerRole) {
            case 0:
                role_text.innerText = "Innocent";
                role_text.style.color = "GreenYellow";
                winCon_text.innerText = "Vote all mafia out";
                winCon_text.style.color = "GreenYellow";
                break;
            case 1:
                role_text.innerText = "Mafia";
                role_text.style.color = "pink";
                winCon_text.innerText = "Kill all special roles or innocents";
                winCon_text.style.color = "pink";
                break;
            case 2:
                role_text.innerText = "Detective";
                role_text.style.color = "GreenYellow";
                winCon_text.innerText = "Vote all mafia out";
                winCon_text.style.color ="GreenYellow";
                break;
            case 3:
                role_text.innerText = "Doctor";
                role_text.style.color = "GreenYellow";
                winCon_text.innerText = "Vote all mafia out";
                winCon_text.style.color = "GreenYellow";
                break;
            default:
                break;
        }
    });
}