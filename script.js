// Constants
const title = document.getElementById('title');
const image = document.querySelector('img');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs =[
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Song3',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Song4',
    artist: 'Jacinto Design',
  }
];

// Boolean to check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
// Current Song
let songIndex = 0;

// previous Song
function previousSong(){
songIndex--;
if(songIndex < 0){
  songIndex = songs.length -1;
}
loadSong(songs[songIndex]);
playSong();
}
// Next Song
function nextSong(){
  songIndex++;
  if (songIndex > songs.length -1){
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on Load
loadSong(songs[songIndex]);
// Update ProgressBar & Time

function updateProgressBar(e){
  if(isPlaying){
    const {duration, currentTime} = e.srcElement;
    // Update Progress bar width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`;
    // claculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log('minutes', durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10){
      durationSeconds = `0${durationSeconds}`;
    }
    console.log('seconds', durationSeconds);
    // Delay switching duration element to avoid NaN
    if(durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
      // calculate display for current
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}
// Move progress bar
function setProgressBar(e){
  console.log(e);
  const width = this.clientWidth;
  console.log('width', width);
  const clickX = e.offsetX;
  console.log('clickX', clickX);
  const {duration} = music;
  console.log(clickX / width);
  console.log((clickX / width)*duration);
  music.currentTime = (clickX / width)*duration;
}


// Prev / Next Event Listeners
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);