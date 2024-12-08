// 팝업창 기능
const showPopup = document.getElementById("show-popup");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

// 효과음 기능
const clickSound = document.getElementById("click-sound");

showPopup.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// 배경음악 재생 기능
const audioPlayer = document.getElementById("audio-player");
const playlist = document.getElementById("playlist");

const tracks = [
  // 노래1: We Wish You A Merry Christmas - DJ Williams
  // 노래2: Silent Night - The Soundlings
  // 노래3: Jingle Bells - Kevin MacLeod
  {
    src: "asset/song1.mp3",
    name: "We Wish You A Merry Christmas",
    artist: "DJ Williams",
  },
  {
    src: "asset/song2.mp3",
    name: "Silent Night",
    artist: "The Soundlings",
  },
  { src: "asset/song3.mp3", name: "ingle Bells", artist: "Kevin MacLeod" },
];

let currentTrack = 0;

audioPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
});

// 배경 음악 플레이어바 초기화
audioPlayer.src = tracks[currentTrack].src;
playlist.textContent = `🎶: ${tracks[currentTrack].name} by ${tracks[currentTrack].artist}`;
