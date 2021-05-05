import Game from './game.js'

let game = undefined
 function updateUI(){
     let gameBoard = document.getElementById('board-holder')
     let gameName = document.getElementById('game-name')
     if(game === undefined){
         
         gameBoard.classList.add = 'is-invisible'
     } else {
         gameBoard.classList.remove = 'is-invisible'
         
         gameName.innerHTML = getName()
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
   
})











// class Game {
//     constructor(playerOne, playerTwo, gameName){

//     }
// }