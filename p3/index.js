// images files
const images = {
  1: './images/1.png',
  2: './images/2.png',
  3: './images/3.png',
  4: './images/4.png',
  5: './images/5.png',
  6: './images/6.png',
  7: './images/7.png',
  8: './images/8.png',
  9: './images/9.png'
}

// number of cards
const N = 16
let correct = 0

let previouslySelected = -1
let justStarted = true

// mapping equal values
const sameValues = [1, 4, 2, 4, 3, 6, 1, 8, 5, 7, 6, 2, 8, 3, 7, 5]
let answered = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
const allCards = document.getElementsByClassName('card')
// console.log(allCards)
// console.log(allCards[0].firstElementChild.childNodes[3].firstElementChild.src)

if (justStarted) {
  for (let index = 0; index < allCards.length; index++) {
    // console.log(index, allCards[index])
    allCards[index].firstElementChild.childNodes[3].firstElementChild.src = `./images/${sameValues[index]}.png`
  }
  justStarted = false
}

function cardClicked (id) {
  const cardId = id
  // console.log(previouslySelected, cardId)
  if (answered[id - 1] === -1) {
    if (previouslySelected === -1) {
      if (previouslySelected !== cardId) {
        flipCardFront(cardId)
        previouslySelected = cardId
      }
    } else {
      if (previouslySelected !== cardId) {
        flipCardFront(cardId)
        delay(1000).then(() => {
          if (sameValues[previouslySelected - 1] === sameValues[cardId - 1]) {
            answered[previouslySelected - 1] = cardId
            answered[cardId - 1] = cardId

            correct += 1
            if (correct === N / 2) {
              alert('You Won the Game')
              reset()
            }
          } else {
            flipCardBack(cardId)
            flipCardBack(previouslySelected)
          }
          previouslySelected = -1
        })
      }
    }
  }
}

function flipCardFront (id) {
  const contentElement = allCards[id - 1].firstElementChild
  contentElement.style.transform = 'rotateY(180deg)'
  contentElement.style.transition = 'transform 0.5s'
}

function flipCardBack (id) {
  const contentElement = allCards[id - 1].firstElementChild
  contentElement.style.transform = ''
  contentElement.style.transition = ''
}

function delay (time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function reset () {
  answered = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  justStarted = true
  const posOne = Math.floor(Math.random() * 10)
  const posTwo = Math.floor(Math.random() * 10)
  const temp = sameValues[posOne]
  sameValues[posOne] = sameValues[posTwo]
  sameValues[posTwo] = temp

  for (let index = 0; index < allCards.length; index++) {
    // console.log(index, allCards[index])
    flipCardBack(index + 1)
    allCards[index].firstElementChild.childNodes[3].firstElementChild.src = `./images/${sameValues[index]}.png`
  }
}
