/**
 * Update game based on different event
 * @param {Object} socket     - Client socket object
 * @param {Function} callback - The function to call when data is returned
 */
export function updateGame(socket, callback) {
    socket.on("A New Player Joined", (data) => {
        callback(0, data);
    });
    
    socket.on("Show Role", (data) => {
        callback(1, data);
    });

    socket.on("A Client Disconnected", (data) => {
        callback(2, data);
    });
    
    socket.on("Forced Disconnect", (data) => {
        callback(3, data);
    });
}

/**
 * Start game
 * @param {Object} socket     - Client socket object 
 * @param {String} roomid     - Roomid that the client is trying to start 
 * @param {Function} callback - The function to call when data is returned
 */
export function startGame(socket, callback) {
    socket.emit("Start Game");
    socket.on("Start Game Status", (data) => {
        callback(data);
    });
}