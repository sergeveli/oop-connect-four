class Game {
    constructor(playerOne, playerTwo, currentPlayer){
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.currentPlayer = 1
        this.columns = [
            new Column(), 
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
            new Column(),
        ]
    }
    getName(){
        return `${this.playerOne} vs. ${this.playerTwo}`
    }
    

    getTokenAt(rowIndex, columnIndex){
        return this.columns[columnIndex].getTokenAt(rowIndex)
    }

    playInColumn(columnIndex){
        this.columns[columnIndex].add(this.currentPlayer)
            if(this.currentPlayer === 1){
            this.currentPlayer = 2
        } else if (this.currentPlayer === 2){
            this.currentPlayer = 1
        }
        }
    }

    class Column {
        constructor(){
            this.tokens = [null, null, null, null, null, null];
        }

        add(currentPlayer){
            for(let i = 5; i >= 0; i--){
                if(this.tokens[i] === null){
                    this.tokens[i] = currentPlayer
                    break
                }
            } 
        }
        getTokenAt(rowIndex){
            return this.tokens[rowIndex]
        }
    }

    export{Game, Column}