/**
 * Build the chat UI
 * @param {Object} socket - Client socket 
 */
export function buildChat(socket) {
    createChat();
    socket.on("System Message", ({msg}) => {

    });
}


function createChat() {
    const chatWindow = document.createElement();
    const contents = document.getElementById("contents");

}

function outputMessage(text) {
    const div = document.createElement("div");
    div.className = "message";
    
}

