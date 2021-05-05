import {Game} from './game.js'
import {Column} from './game.js'

let game = undefined
 function updateUI(){
     let targets = document.getElementById('click-targets')
     let gameBoard = document.getElementById('board-holder')
     let gameName = document.getElementById('game-name')
     if(game === undefined){

         gameBoard.classList.add('is-invisible')
     } else {
         gameBoard.classList.remove('is-invisible')
         gameName.innerHTML = game.getName()


         for(let rowIndex = 0; rowIndex <= 5; rowIndex++){
             for(let columnIndex = 0; columnIndex <= 6; columnIndex++){
                 const square = document.getElementById(`square-${rowIndex}-${columnIndex}`)
                 square.innerHTML = ''
                 const playerNumber = game.getTokenAt(rowIndex, columnIndex)
                 if(playerNumber === 1){
                     const token = document.createElement('div')
                     token.classList.add('token')
                     token.classList.add('black')
                     square.appendChild(token)
                 } else if(playerNumber === 2){
                 const token = document.createElement('div')
                     token.classList.add('token')
                     token.classList.add('red')
                     square.appendChild(token)
                 }
                 } 
                }
                
         if(game.currentPlayer === 1){
             
             targets.classList.remove('red')
         targets.classList.add('black')
         } else if(game.currentPlayer === 2){
             targets.classList.remove('black')
             targets.classList.add('red')
         }
         gameName.innerHTML = game.getName()
     }
    }
window.addEventListener('DOMContentLoaded', event => {
    const playerOne = document.getElementById('player-1-name')
    const playerTwo = document.getElementById('player-2-name')
    const newGame = document.getElementById('new-game')

    playerOne.addEventListener('keyup', event =>{
    
        if (playerOne.value && playerTwo.value){
            newGame.disabled = false
        } else { 
             newGame.disabled = true
        }
    })
    playerTwo.addEventListener('keyup', event =>{
    
        if (playerOne.value && playerTwo.value){
            newGame.disabled = false
        } else { 
             newGame.disabled = true
        }
    })

    newGame.addEventListener('click', event =>{
        game = new Game(playerOne, playerTwo)
        playerOne.innerHTML = ''
        playerTwo.innerHTML = ''
        newGame.disabled = true
        updateUI()
    })
    let targets = document.getElementById('click-targets')
    targets.addEventListener('click', event =>{
        const targetID = event.target.id
        if(!targetID.startsWith('column-')) return 
        const columnIndex = Number.parseInt(targetID[targetID.length - 1])
        game.playInColumn(columnIndex)
        console.log(game.currentPlayer)
        updateUI()
    })

})











// class Game {
//     constructor(playerOne, playerTwo, gameName){

//     }
// }