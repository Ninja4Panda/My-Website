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
    //Create a Container to hold all messages component
    const chatContainer = document.createElement("div");
    chatContainer.className = "chat-container";
    
    //Create header for the chat
    const header = document.createElement("div");
    header.className = "chat-header";
    header.innerText = "Chat Room"
    chatContainer.appendChild(header);

    //Create the messages div to store messages as it go
    const chatMessages = document.createElement("div");
    chatMessages.className = "chat-messages";
    chatContainer.appendChild(chatMessages);

    //Create the input form 
    const chatFormContainer = document.createElement("div");
    chatFormContainer.className = "chat-form-container";

    const form = document.createElement("form");
    form.id = "chat-form";

    const input = document.createElement("input");
    input.id = "msg";
    input.placeholder = "Enter Message";

    form.appendChild(input);
    chatFormContainer.appendChild(form);
    chatContainer.appendChild(chatFormContainer);
    
    //Add the entire chat container in 
    const contents = document.getElementById("contents");
    contents.appendChild(chatContainer);
}

function outputMessage(text) {
    const div = document.createElement("div");
    div.className = "message";
    
}

