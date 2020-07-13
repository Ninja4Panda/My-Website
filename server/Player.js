module.exports = class Player { 
    constructor(name) {
        this.name = name;
        this.alive = true;
        this.role;
    }

    //setters
    set setRole(role) {this.role = role;}
    set setName(name) {this.name = name;}
    set setAlive(status) {this.alive = status;}

    //getters
    get getName() {return this.name;}
    get getAlive() {return this.alive;}
}