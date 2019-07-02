window.addEventListener('load', () => {
  const sounds = document.querySelectorAll('.sound')
  const pads = document.querySelectorAll('.pads div')
  
  // Let's get going with the sound here
  pads.forEach((pad, index) => {
    pad.addEventListener('click', function() {
      sounds[index].currentTime = 0
      sounds[index].play()
      createBubbles(index)
    })
  })
})

// Create a function that makes bubbles
function createBubbles(index) {
  const visual = document.querySelector('.visual')
  const bubble = document.createElement('div');
  const colors = [
    '#60d394',
    '#d36060',
    '#c060d3',
    '#d3d160',
    '#6860d3',
    '#60b2d3'
  ]

  visual.appendChild(bubble)
  bubble.style.backgroundColor = colors[index]
  bubble.style.animation = 'jump 1s ease'
  bubble.addEventListener('animationend', function() {
    visual.removeChild(this)
  })
}
