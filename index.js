var ramMachine = {
  0: 'green',
  1: 'red',
  2: 'yellow',
  3: 'blue',
}

// random number between 0 to 3
var ranNum = Math.round(Math.random() * 3)


const enableClick = () => {
  $('.box').addClass('enable-pointer')
}

const disableClick = () => {
  $('.box').removeClass('enable-pointer')
}

const userInput = () => {
  return new Promise ((resolve) => {
    $('.box').one('click', (e) => {
      console.log(e.target.id)
      resolve(e.target.id)
    })
  })
}

const startGame = async () => {
var gameOver = false
var level = 3
// while (!gameOver) {

  // generate random sequence for each level, convert to curesponding color box, add and remove blink class to them
    var sequence = []
    for (var i = 0; i < level; i++) {
      sequence.push(ramMachine[Math.round(Math.random() * 3)])
    }

    // demonstration section
    sequence.forEach((color, index) => {
      setTimeout(() => {
        $('#' + color).removeClass('blink')
        setTimeout(() => {    
          $('#' + color).addClass('blink')
        }, 50);
      }, 1000 * index)
    })

    // wait for demonstration to finish
    await new Promise((resolve) => setTimeout(resolve, 1000 * level))

    // allow user to type
    enableClick()
    
    // user input section
    var userSequence = []
    for (var i = 0; i < level; i++) {
      const input = await userInput()
      userSequence.push(input)
    }

  // }
}


startGame()