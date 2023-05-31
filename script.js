const Player = (sign) => {
  this.sign = sign

  const getSign = () => {
    return sign
  };

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
    resetMessage()
    playGame.reset()

  })

  cells.forEach((cell) => 
  cell.addEventListener('click', (e) => {
    if (cell.textContent == "" && !playGame.getIsOver()){
      playGame.turn() ? cell.textContent = "X" : cell.textContent = "O"
      changeTurn()
      playGame.playRound(parseInt(e.target.dataset.index))
    }
  })
)

  const winMessage = () =>  {
    message.textContent = `Congrats to Player ${playGame.getPlayer()}`
  }

  const changeTurn = () => message.textContent = `Player ${playGame.getPlayer()}'s turn`
  const resetMessage = () => message.textContent = "Player X's turn"

  return {winMessage}
})();

const playGame = (() => {
  const playerX = Player("X")
  let xGrid = []
  const playerO = Player("O")
  let oGrid = []
  let round = 1
  let gameOver = false

  const playRound = (i) => {
    round++
    add(i)
    isOver()
  }

  const add = (i) => turn() ? xGrid.push(i) : oGrid.push(i)

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

    const checkArray = (array) => {
      // Each of the nested arrays in winningArray
      for (const winningCombination of winConditions) {
          // Every number in the winningCombination is also in the provided array 
          if (winningCombination.every(element => array.includes(element))) { 
              return true; 
          } 
      }
  
      // No complete match
      return false; 
  }
  

  let combo
  turn() ? combo = combinations(xGrid.sort()) : combo = combinations(oGrid.sort())

  for (let x = 0; x < combo.length; x++){
    if(checkArray(combo[x])){
      gameOver = true
      console.log("Finally")
      displayController.winMessage()
    }
  }
}

//Creates a nested array with possible combinations of the elements in the form of an array within the array given
  const combinations = (array) => {
    return new Array(1 << array.length).fill().map(
      (e1, i) => array.filter((e2, j) => i & 1 << j)).filter(a => a.length == 3);
  }
  

  const getPlayer = () => round % 2? playerO.getSign() : playerX.getSign()

  const turn = () => round % 2
  
  const getIsOver = () => gameOver

  const reset = () => {
    gameOver = false
    round = 1
    xGrid = []
    oGrid = []
  }

  return {playRound, turn, reset, getIsOver, getPlayer }

})()
