import {Game} from './game.js'
import{Column} from './game.js'

class ColumnWinInspector{
    constructor(column){
        this.column = column
    }

    inspect(){
        for(let i = 0; i <= 2; i++){
            const token1 = this.column.getTokenAt(i);
            const token2 = this.column.getTokenAt(i+1);
            const token3 = this.column.getTokenAt(i+2);
            const token4 = this.column.getTokenAt(i+3);
            if(token1 === token2 && token2 === token3 && token3 === token4 && token1 !== null){
                return token1
            }
        }
        
        return 0
    }
}


export {ColumnWinInspector} 