module.exports = class Player { 
    constructor(name, ownership) {
        this.name = name;
        this.isOwner = ownership;
        this.role;
    }

    //setters
    set setRole(role) {this.role = role;}

    //getters
    get getName() {return this.name;}
    get getIsOwner() {return this.isOwner;}
    get getRole() {return this.role;}
}