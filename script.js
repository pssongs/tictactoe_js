const Player = (sign) => {
  const getSign = () => sign;

  return {getSign}
}

const displayController = (() => {
  const message = document.getElementById("turn")
  const cells = document.querySelectorAll(".cell")
  const reset = document.querySelector("#restart")

  reset.addEventListener('click', () => {
    cells.forEach((cell) => {
      cell.textContent = ""
    })
    playGame.reset
  })

  cells.forEach((cell) => 
  cell.addEventListener('click', (e) => {
    if (cell.textContent == "" && !playGame.gameOver){
      playGame.turn() ? cell.textContent = "X" : cell.textContent = "O"
      playGame.playRound(e.target.dataset.index)
    }
  })
)

})();

const GameBoard = (() => {
  const grid = ["","","","","","","","",""]


})()

const playGame = (() => {
  const playerX = Player("X")
  const playerO = Player("O")
  let round = 1
  let gameOver = false

  const playRound = (i) => {
    
    round++
    isOver()

  }

  const isOver = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }


  const turn = () => {
    return round % 2
  }

  const reset = () => {
    gameOver = false
    round = 1
    playerX.position.reset
    playerO.position.reset
  }

  return {playRound, turn, reset, gameOver}

})()