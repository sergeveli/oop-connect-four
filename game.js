import {ColumnWinInspector} from './column-win-inspector.js'
import {RowWinInspector} from './row-win-inspector.js'

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

    export{Game, Column}