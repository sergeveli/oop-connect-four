export default class Game {
    constructor(playerOne, playerTwo){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
    getName(){
        return `${playerOne} vs. ${playerTwo}`
    }
}