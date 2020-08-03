module.exports = class Player { 
    constructor(name, ownership) {
        // this.socket = socket;
        this.name = name;
        this.alive = true;
        this.role;
        this.isOwner = ownership;
    }

    //setters
    set setRole(role) {this.role = role;}
    set setAlive(status) {this.alive = status;}

    //getters
    get getName() {return this.name;}
    get getAlive() {return this.alive;}
    get getIsOwner() {return this.isOwner};
}