module.exports = class Player { 
    /**
     * Player constructor 
     * @param {int} uid           - Uid of this player based on when he joined
     * @param {String} name       - Name of this player
     */
    constructor(uid, name) {
        this.uid = uid; 
        this.name = name;
        this.role;
    }

    //setters
    set setRole(role) {this.role = role}

    //getters
    get getUid() {return this.uid}
    get getName() {return this.name}
    get getRole() {return this.role}
}