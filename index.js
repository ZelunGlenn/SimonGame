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
      resolve(e.target.id)
    })
  })
}

const startGame = async () => {
var gameOver = false
var level = 1
while (!gameOver) {

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
    // remove all animations
    $('.box').removeClass('blink')

    // allow user to type
    enableClick()
    
    // user input section
    var userSequence = []
    for (var i = 0; i < level; i++) {
      const input = await userInput()
      userSequence.push(input)
    }

    // Once user input is full, disable click
    disableClick()

    // Check result is right or wrong
    var isSame = userSequence.every((element, index) => {
      return element === sequence[index]
    })

    if (isSame) {
      console.log('Correct')
      level++
    } else {
      console.log('Wrong')
      gameOver = true
    }

  }
  console.log('Game Over')
}


startGame()