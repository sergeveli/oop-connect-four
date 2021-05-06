import {ColumnWinInspector} from './column-win-inspector.js'
import {RowWinInspector} from './row-win-inspector.js'
import {DiagonalWinInspector} from './diagonal-win-inspector.js'

class Game {
    constructor(playerOne, playerTwo, currentPlayer, winnerNumber){
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
        ];
        this.winnerNumber = 0;
    }
    getName(){
        if(this.winnerNumber === 1){
            return `${this.playerOne} wins!`
        }
        if(this.winnerNumber === 2){
            return `${this.playerTwo} wins!`
        }
        if(this.winnerNumber === 0){
        return `${this.playerOne} vs. ${this.playerTwo}`
        } else if (this.winnerNumber === 3){
            return `${this.playerOne} ties with ${this.playerTwo}`
        }
    }
    

    getTokenAt(rowIndex, columnIndex){
        return this.columns[columnIndex].getTokenAt(rowIndex)
    }


    isColumnFull(columnIndex){
        if(this.winnerNumber === 1 || this.winnerNumber === 2){
            return true
        }
        return this.columns[columnIndex].isFull()
    }

    playInColumn(columnIndex){
        this.columns[columnIndex].add(this.currentPlayer)
        this.checkForTie()
        this.checkForColumnWin()
        this.checkForRowWin()
        this.checkForDiagonalWin()
            if(this.currentPlayer === 1){
            this.currentPlayer = 2
        } else if (this.currentPlayer === 2){
            this.currentPlayer = 1
        }
        
        }

        checkForTie(){
            const tie = this.columns.every(column => {
                    return column.isFull()
                })
                console.log(tie)
            if(tie){
                this.winnerNumber = 3 
                this.getName()
            }
        }

        checkForColumnWin(){
            if(this.winnerNumber !== 0) return
            for(let columnIndex = 0; columnIndex < this.columns.length; columnIndex++){
                const column = this.columns[columnIndex]
                const inspector = new ColumnWinInspector(column)
                const winnerNumber = inspector.inspect()
                if(winnerNumber === 1 || winnerNumber === 2){
                    this.winnerNumber = winnerNumber
                    break
                }
            }
        }

        checkForRowWin(){
            if(this.winnerNumber !== 0) return
            for(let columnIndex = 0; columnIndex < 4; columnIndex++){
                const columns = this.columns.slice(columnIndex, columnIndex + 4)
                const inspector = new RowWinInspector(columns);
                const winnerNumber = inspector.inspect()
                if(winnerNumber === 1 || winnerNumber === 2){
                    this.winnerNumber = winnerNumber
                    break
                }
            }
        }

        checkForDiagonalWin(){
            if(this.winnerNumber !== 0) return
            for(let columnIndex = 0; columnIndex < 4; columnIndex++){
                const columns = this.columns.slice(columnIndex, columnIndex + 4)
                const inspector = new DiagonalWinInspector(columns);
                const winnerNumber = inspector.inspect()
                if(winnerNumber === 1 || winnerNumber === 2){
                    this.winnerNumber = winnerNumber
                    break
                }
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

        isFull(){
           return this.tokens[0] !== null
            }
        }


class GameJsonSerializer{
    constructor(game){
        this.game = game;
    }

    serialize(){
        const data = {
            playerOne: this.game.playerOne,
            playerTwo: this.game.playerTwo,
            tokens: [[], [], [], [], [], []],
        }
        for(let rowIndex = 0; rowIndex < 6; rowIndex++){
            for(let columnIndex = 0; columnIndex < 7; columnIndex++){
                let tokenValue = this.game.getTokenAt(rowIndex, columnIndex);
                data.tokens[rowIndex][columnIndex] = tokenValue;
            }
        }

        return JSON.stringify(data)
    }
}

class GameJsonDeserializer{
    constructor(json){
        this.json = json
    }

    deserialize(){
        const data = JSON.parse(this.json)
        const game = new Game(data.playerOne, data.playerTwo)
        const columnIndices = [5, 5, 5, 5, 5, 5, 5]
        let playerTurn = 1

        while(columnIndices.some(x => x !== -1)) {
            for(let columnIndex = 0; columnIndex < 7; columnIndex++){
                const rowIndex = columnIndices[columnIndex];
                if(rowIndex === -1) continue
                const tokenValue = data.tokens[rowIndex][columnIndex];
                if(tokenValue === null){
                    columnIndices[columnIndex] = -1
                }
                if(tokenValue === playerTurn){
                    game.playInColumn(columnIndex)
                    columnIndices[columnIndex] -= 1
                    if(playerTurn === 1){
                        playerTurn = 2
                    } else {
                        playerTurn = 1
                    }
                }
            }

        }

        return game
    }
}

    export{Game, Column, GameJsonDeserializer, GameJsonSerializer}