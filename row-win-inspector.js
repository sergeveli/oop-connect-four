class RowWinInspector{
    constructor(columns){
        this.columns = columns
    }

    inspect(){
        for(let rowIndex = 0; rowIndex < 6; rowIndex++){
            const token1 = this.columns[0].getTokenAt(rowIndex)
            const token2 = this.columns[1].getTokenAt(rowIndex)
            const token3 = this.columns[2].getTokenAt(rowIndex)
            const token4 = this.columns[3].getTokenAt(rowIndex)

            if(token1 === token2 && token2 === token3 && token3 === token4 && token1 !== null){
                return token1
            }
        }
        return 0
    }
}

export {RowWinInspector}