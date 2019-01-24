const container = document.querySelectorAll('.container')[0]
const cards = []
let listOfColor = [
  'white',
  'red',
  'yellow',
  'pink',
  'green',
  'orange',
  'white',
  'red',
  'yellow',
  'pink',
  'green',
  'orange'
]

for (let i = 0; i < 12; i++) {
  let random = Math.floor(Math.random() * listOfColor.length)
  cards[i] = document.createElement('div')

  cards[i].className = 'memory-card'

  const frontCard = document.createElement('div')
  frontCard.className = 'front-card gray'
  const backCard = document.createElement('div')
  backCard.className = `back-card ${listOfColor[random]}`
  cards[i].appendChild(backCard)
  cards[i].appendChild(frontCard)
  listOfColor.splice(random, 1)
  container.appendChild(cards[i])
}
var timer=0;
var firstClick=false;
var checkClick = 'fozy';
var prevTarget;
var currentTarget;
var rightChecked = 0;
var clickCounter = 0;
var timerP= document.getElementById('timer');
timerP.innerHTML="your time is "+timer;
var start;

 document.getElementsByClassName('container')[0].addEventListener ('click', function (e) {
    
    if(!firstClick){
      firstClick=true;
       start = setInterval(( ) => {
        timer++
        timerP.innerHTML="your time is "+timer;
      }, 1000); 
      
    }

    clickCounter++
    let counter = document.getElementById('clicks');
    counter.innerText = 'you clicked ' + clickCounter + ' times'
    console.log(typeof(e.target.innerHTML));

    if (e.target.className === 'memory-card') {
      e.target.classList.add('clicked')
    }
    if (checkClick === 'fozy') {
      checkClick = e.target.innerHTML
      prevTarget = e.target
    } else if (checkClick !== e.target.innerHTML) {
      // timer removes class clicked and sets sameer to fozy
      currentTarget = e.target
      setTimeout(function () {
        prevTarget.classList.remove('clicked')
        currentTarget.classList.remove('clicked')

        checkClick = 'fozy'
      }, 500)
    } else {
      rightChecked++
      if (rightChecked === cards.length / 2) {
        let winDiv = document.getElementById('winner')
        winDiv.innerText = 'you win it';
        clearInterval(start);
      }
      checkClick = 'fozy'
    }
  },false)

