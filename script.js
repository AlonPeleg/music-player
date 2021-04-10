const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const progressTime = document.querySelector(".progress-time");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ["Metallica - Am I Savage", "Metallica - Atlas, Rise!"];

// Keep track of songs
let songIndex = 1;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function fastForward() {
  audio.currentTime += 10;
}
function rewind() {
  audio.currentTime -= 10;
}

// Conver song times into mm:ss
function getTime(time) {
  var minutes = "0" + Math.floor(time / 60);
  var seconds = "0" + Math.floor(time - minutes * 60);
  var dur = minutes.substr(-2) + ":" + seconds.substr(-2);
  return dur;
}
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  var cur = getTime(currentTime);
  var dur = getTime(duration);

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  progressTime.innerText = `${cur}/${dur}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgress);

// Play/Pause/Skip/FF/Rewind button functions
document.body.onkeyup = function (e) {
  if (e.keyCode == 32 || e.key === "Spacebar") {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }
  if (e.keyCode === 37) prevSong();
  if (e.keyCode === 39) nextSong();
  if (e.keyCode === 38) fastForward();
  if (e.keyCode === 40) rewind();
};
