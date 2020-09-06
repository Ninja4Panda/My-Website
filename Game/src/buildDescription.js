/**
 * Build the description for player
 * @param {Object} socket - Client socket 
 */
export function buildDescription(socket) {
    socket.on("Role Description", ({playerRole}) => {
        const role = document.createElement("p");
        role.id = "Role";
        role.style.color = "white";
        role.className = "font-weight-bold";
        role.innerText = "Role: ";
        
        const role_text = document.createElement("p");
        role_text.style.color = "white";
        
        const winCon = document.createElement("p");
        winCon.id = "winCon";
        winCon.style.color = "white";
        winCon.className = "font-weight-bold";
        winCon.innerText = "Winning Condition: ";
        
        const winCon_text = document.createElement("p");
        
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
                winCon_text.style.color = "GreenYellow"; 
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
        const right = document.getElementById("contents");
        right.appendChild(role);
        right.appendChild(role_text);
        right.appendChild(winCon);
        right.appendChild(winCon_text);
    });
}