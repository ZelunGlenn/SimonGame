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
      // when click event happened the animation for that element occurs
      $('#' + e.target.id).removeClass('bright')
      setTimeout(() => {
        $('#' + e.target.id).addClass('bright')
        resolve(e.target.id)
      }, 50);

    })
  })
}

const startGame = async () => {
var gameOver = false
var level = 1

while (!gameOver) {
    $('h1').text('Level:' + level)

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

    console.log(sequence)

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


    // wait all animation to finish then remove all animations
    await new Promise((resolve) => setTimeout(resolve, 1000 * level))
    $('.box').removeClass('bright')

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

    await new Promise((resolve) => setTimeout(resolve, 2000))

  }
  $('h1').text('Game Over')
}

$(document).on('keypress', (e) => {
  console.log(e.key)
  if (e.key === 'a') {
    startGame()
  }
})