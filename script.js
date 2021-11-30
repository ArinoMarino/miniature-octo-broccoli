var Enc = document.getElementById("encounter");
var hand = document.getElementById('hand');

function RNGNum(min, max) { // min og max inkludert 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var rndInt = RNGNum(1, 6); //tilfeldig tall mellom 1 og 6
console.log(rndInt)

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

var dex = 2

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'CHARACTER CREATOR' ,
        options: [
            {
                text: 'next',
        nextText: 1 + dex
            },
            {
                text: 'Godt valg',
                requiredState: (currentState) => currentState.barb,
                nextText: dex + dex - 1
            },
            {
                text: 'dårlig valg',
                requiredState: (currentState) => currentState.rnger,
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'choose your class',
        options: [
            {
                text: 'BardBarian',
                setState: { barb: true},
                nextText: 1
            },
            {
                text: 'Rnger',
                setState: { rnger: true},
                nextText: 1
            },
            {
                text: 'WizardicianLock',
                setState: { wiz: true},
                nextText: 1
            },
        ]
    } ,
  {
        id: 4,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
]

startGame()
console.log("Why are we still here? Just to suffer")
