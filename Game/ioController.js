/**
 * Request server to create a game 
 * 
 * @param {Object} socket     - Client socket object
 * @param {String} name       - Name of client
 * @param {Function} callback - The function to call when data is returned
 */
export function createGame(socket, name, callback) {
    socket.emit("Create Game", {name:name});
    socket.on("Create Game Status", (data) => {
        console.log(data);
        callback(data);
    });
}

/**
 * Request server to join a game
 * 
 * @param {Object} socket     - Client socket object
 * @param {String} name       - Name of client
 * @param {String} roomid     - Roomid that the client is trying to join
 * @param {Function} callback - The function to call when data is returned
 */
export function joinGame(socket, name, roomid, callback) {
    socket.emit("Join Game", {
        name:name,
        roomid:roomid
    }); 
    socket.on("Join Game Status", (data) => {
        callback(data);
    });
}

/**
 * Update game when new client joins a game
 * 
 * @param {Object} socket     - Client socket object
 * @param {Function} callback - The function to call when data is returned
 */
export function updateGame(socket, callback) {
    socket.on("A New player joined", (data) => {
        callback(0, data);
    });
    
    socket.on("Flip", (data) => {
        callback(1, data);
    });
}

/**
 * Start game
 * 
 * @param {Object} socket     - Client socket object 
 * @param {String} roomid     - Roomid that the client is trying to start 
 * @param {Function} callback - The function to call when data is returned
 */
export function startGame(socket, roomid, callback) {
    socket.emit("Start Game", {roomid:roomid});
    socket.on("Start Game Status", (data) => {
        callback(data);
    });
}