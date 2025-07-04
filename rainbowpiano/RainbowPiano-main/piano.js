const rainbowColors = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'
];

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    // Rainbow effect
    const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
    key.style.background = color;
    key.style.color = '#fff';
    key.classList.add('active');

    // Play sound
    const note = key.getAttribute('data-note');
    if (note) {
      const audio = new Audio(`sounds/${note}.m4a`);
      audio.currentTime = 0;
      audio.play();
    }

    setTimeout(() => {
      key.classList.remove('active');
      key.style.background = '';
      key.style.color = '';
    }, 150);
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;
  const key = document.querySelector(`.key[data-key="${e.key.toLowerCase()}"]`);
  if (key) key.click();
});

const audioCache = {};
function playNote(note) {
  if (!audioCache[note]) {
    audioCache[note] = new Audio(`sounds/${note}.mp3`);
  }
  audioCache[note].currentTime = 0;
  audioCache[note].play();
}
function playSong(song, tempo = 300) {
  let i = 0;
  function playNext() {
    if (i >= song.length) return;
    const note = song[i];
    if (note && note !== '-') {
      playNote(note);
      const keyElem = document.querySelector(`.key[data-note="${note}"]`);
      if (keyElem) {
        keyElem.classList.add('active');
        setTimeout(() => keyElem.classList.remove('active'), tempo * 0.8);
      }
    }
    i++;
    setTimeout(playNext, tempo);
  }
  playNext();
}

// Example song: "Mary Had a Little Lamb"
const mary = [
  'e', 'd', 'c', 'd', 'e', 'e', 'e', '-', 
  'd', 'd', 'd', '-', 
  'e', 'g', 'g', '-', 
  'e', 'd', 'c', 'd', 'e', 'e', 'e', 'e', 
  'd', 'd', 'e', 'd', 'c'
];

// Add this to trigger song playback with a button
document.getElementById('play-song').addEventListener('click', () => {
  playSong(mary, 350);
});