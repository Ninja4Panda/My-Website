/**
 * Build the chat UI
 * @param {Object} socket - Client socket 
 */
export function buildChat(socket) {
    createChat(socket);
    socket.on("New Message", ({name, msg}) => {
        msg = name + ": " +msg
        addMessage(msg, "white");
    });
    socket.on("System Message", ({msg}) => {
        addMessage(msg, "YellowGreen");
    });
}

/**
 * Create the chat area
 * @param {Object} socket 
 */
function createChat(socket) {
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
    chatMessages.id = "chat-messages";
    chatContainer.appendChild(chatMessages);

    //Create the input form 
    const chatFormContainer = document.createElement("div");
    chatFormContainer.className = "chat-form-container";

    const form = document.createElement("form");
    form.id = "chat-form";

    const input = document.createElement("input");
    input.id = "msg";
    input.type = "text";
    input.placeholder = "Enter Message";
    input.autocomplete = "off";
    input.required = "on";

    //Toggle the message on & off
    socket.on("Message On", ()=> {
        input.disabled = false;
    });
    socket.on("Message Off", ()=> {
        input.disabled = true;
    });
    
    //Submit a Client message event to the server when client sends a message
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        socket.emit("Client Message", {msg: event.target.msg.value});
        document.getElementById("msg").value = "";
    });
    form.appendChild(input);
    chatFormContainer.appendChild(form);
    chatContainer.appendChild(chatFormContainer);
    
    //Add the entire chat container in 
    const contents = document.getElementById("contents");
    contents.appendChild(chatContainer);
}

/**
 * Add the message to the chat messasge area
 * @param {String} msg    - Message to be displayed
 * @param {String} colour - Colour to display msg in
 */
function addMessage(msg, colour) {
    const div = document.createElement("div");
    div.className = "message";
    div.innerText = msg;
    div.style.color = colour;
    const messages = document.getElementById('chat-messages');
    messages.appendChild(div);

    //Auto scroll to the bottom
    if(messages.scrollTop+messages.clientHeight >= messages.scrollHeight-30) {
        div.scrollIntoView();
    }
}

