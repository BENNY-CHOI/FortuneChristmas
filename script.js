// 남은 날짜 표시
const remainTime = document.querySelector("#remain-time");
function diffDay() {
  const masTime = new Date("2024-12-25");
  const todayTime = new Date();
  const diff = masTime - todayTime;
  const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
  remainTime.innerText = `크리스마스까지 D- ${diffDay}일`;

  const timeToMidnight = new Date().setHours(24, 0, 0, 0) - Date.now();
  setTimeout(diffDay, timeToMidnight);
}
diffDay();
const showPopupButton = document.getElementById("show-popup");
const closePopupButton = document.getElementById("close-popup");
const closeMessagePopupButton = document.getElementById("close-message-popup");
const christmas = new Date(new Date().getFullYear(), 11, 25); // 12월 25일
const today = new Date();
const popup = document.getElementById("popup"); // 팝업 요소 추가
const messagePopup = document.getElementById("message-popup");

showPopupButton.addEventListener("click", () => {
  // 크리스마스 날짜에만 팝업 열기
  if (
    today.getMonth() === christmas.getMonth() &&
    today.getDate() === christmas.getDate()
  ) {
    clickSound.currentTime = 0;
    clickSound.play();
    popup.style.display = "flex"; // 크리스마스라면 팝업 열기
  } else {
    messagePopup.style.display = "flex"; // 크리스마스가 아니면 메시지 팝업 열기
  }
});

closePopupButton.addEventListener("click", () => {
  popup.style.display = "none"; // 팝업 닫기
});

closeMessagePopupButton.addEventListener("click", () => {
  messagePopup.style.display = "none";
});

// 효과음 기능
const clickSound = document.getElementById("click-sound");

//오픈 API 기능
const keywordsContainer = document.getElementById("keywords");
const submitButton = document.getElementById("submit-keywords");
const loadingMessage = document.getElementById("loading-message");
const resultMessage = document.getElementById("result-message");

// 키워드 리스트
const keywordList = [
  "모험심이 강한",
  "다정한",
  "경계심이 강한",
  "야심만만한",
  "분석적인",
  "고마워할 줄 아는",
  "대범한",
  "침착한",
  "조심성이 많은",
  "중심이 잡힌",
  "매력적인",
  "자신감 있는",
  "협조적인",
  "용기있는",
  "창조적인",
  "결단력 있는",
  "조직적인",
  "객관적인",
  "순종적인",
  "중독에 빠지는",
  "반사회적인",
  "강박적인",
  "거만한",
  "위선적인",
  "부주의한",
  "우유부단한",
  "웅통성이 없는",
  "오만한",
  "사서 걱정하는",
  "움츠러드는",
  "일중독인",
];

// 키워드 동적 생성
keywordList.forEach((keyword) => {
  const button = document.createElement("button");
  button.textContent = keyword;
  button.classList.add("keyword-button");
  button.addEventListener("click", () => {
    button.classList.toggle("selected"); // 키워드 선택/해제
  });
  keywordsContainer.appendChild(button);
});

// 키워드 선택 후 ChatGPT API 호출
submitButton.addEventListener("click", async () => {
  const selectedKeywords = Array.from(
    document.querySelectorAll(".keyword-button.selected")
  ).map((btn) => btn.textContent);

  if (selectedKeywords.length !== 5) {
    alert("5개의 키워드를 선택해주세요!");
    return;
  }

  loadingMessage.style.display = "block"; // 로딩 메시지 표시
  resultMessage.textContent = ""; // 이전 결과 초기화

  try {
    const response = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keywords: selectedKeywords }),
    });

    const data = await response.json();
    loadingMessage.style.display = "none"; // 로딩 메시지 숨기기
    resultMessage.textContent = data.message; // 결과 메시지 표시
  } catch (error) {
    loadingMessage.style.display = "none";
    resultMessage.textContent =
      "메시지를 가져오는 데 실패했습니다. 다시 시도해주세요!";
    console.error(error);
  }
});

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
  audioPlayer.src = tracks[currentTrack].src;
  audioPlayer.play();
});

// 배경 음악 플레이어바 초기화
audioPlayer.src = tracks[currentTrack].src;
playlist.textContent = `🎶: ${tracks[currentTrack].name} by ${tracks[currentTrack].artist}`;
