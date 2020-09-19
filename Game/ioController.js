/**
 * Update game based on different event
 * @param {Object} socket     - Client socket object
 * @param {Function} callback - The function to call when data is returned
 */
export function updateGame(socket, callback) {
    socket.on("A New Player Joined", (data) => {
        callback(0, socket, data);
    });
    
    socket.on("Show Role", (data) => {
        callback(1, socket, data);
    });

    socket.on("A Client Disconnected", (data) => {
        callback(2, socket, data);
    });

    socket.on("Please Vote", (data) => {
        callback(3, socket, data);
    })

    socket.on("Revive Potion", (data) => {
        callback(4, socket, data)
    })
}