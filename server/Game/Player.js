module.exports = class Player { 
    /**
     * Player constructor 
     * @param {int} index         - Index of this player based on when he joined
     * @param {String} name       - Name of this player
     * @param {Boolean} ownership - If this player is owner or not
     */
    constructor(index, name, ownership) {
        this.index = index; 
        this.name = name;
        this.isOwner = ownership;
        this.role;
    }

    //setters
    set setRole(role) {this.role = role}

    //getters
    get getIndex() {return this.index}
    get getName() {return this.name}
    get getIsOwner() {return this.isOwner}
    get getRole() {return this.role}
}