var wrapper = document.querySelector("#wrapper");

document.addEventListener("DOMContentLoaded", () => {
  createElements();
});

const createElements = () => {
  // Create div tag, class card
  const card = document.createElement("div");
  card.classList.add("card");

  // Create h1 tag
  const h1 = document.createElement("h1");
  h1.textContent = "English Dictionary";

  //   Create input tag
  const input = document.createElement("input");
  input.type = "text";
  input.id = "inputWord";
  input.placeholder = "Search a word....";
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      fetchAPI(input.value);
    }
  });

  // Create p tag
  const p = document.createElement("p");
  p.classList.add("card-typeWord");
  p.textContent = "Type a word and press enter";

  // Create div tag, class card-info
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  // Create div tag, class word
  const word = document.createElement("div");
  word.classList.add("word");

  // Create p tag
  const cardWordTitle = document.createElement("p");
  cardWordTitle.classList.add("card-wordTitle");

  // Create button tag
  const buttonVolume = document.createElement("button");
  buttonVolume.classList.add("btn-volume");

  // Create i tag
  const iconVolume = document.createElement("i");
  iconVolume.classList.add("fas", "fa-volume-up");
  iconVolume.title = "sound";

  buttonVolume.appendChild(iconVolume);
  word.appendChild(cardWordTitle);
  word.appendChild(buttonVolume);

  const details = document.createElement("div");
  details.classList.add("details");

  const p1 = document.createElement("p");
  p1.classList.add("partOfSpeech");

  const p2 = document.createElement("p");
  p2.classList.add("phonetic-text");

  details.appendChild(p1);
  details.appendChild(p2);

  const wordMeaning = document.createElement("p");
  wordMeaning.classList.add("word-meaning");

  const wordExample = document.createElement("p");
  wordExample.classList.add("word-example");

  cardInfo.appendChild(word);
  cardInfo.appendChild(details);
  cardInfo.appendChild(wordMeaning);
  cardInfo.appendChild(wordExample);

  wrapper.appendChild(card);
  card.appendChild(h1);
  card.appendChild(input);
  card.appendChild(p);
  card.appendChild(cardInfo);
};

const fetchAPI = async (keyWord) => {
  const infoTextEl = document.querySelector(".card-typeWord");

  const entries = "entries";
  const source_lang = "en";

  const url = `https://api.dictionaryapi.dev/api/v2/${entries}/${source_lang}/${keyWord}`;
  const results = await fetch(url).then((res) => res.json());

  try {
    infoTextEl.textContent = `Searching the meaning of "${keyWord}"`;
    displayElement(results, keyWord);
  } catch (error) {
    infoTextEl.textContent = "an error happened, try again later";
  }
};

const displayElement = (result, keyWord) => {
  const infoTextEl = document.querySelector(".card-typeWord");
  const cardInfo = document.querySelector(".card-info");
  const titleEl = document.querySelector(".card-wordTitle");
  const partOfSpeechEl = document.querySelector(".partOfSpeech");
  const phoneticTextEl = document.querySelector(".phonetic-text");
  const wordMeaning = document.querySelector(".word-meaning");
  const wordExample = document.querySelector(".word-example");
  const buttonVolume = document.querySelector(".btn-volume");

  infoTextEl.style.display = "block";
  cardInfo.style.display = "none";

  if (result.title) {
    cardInfo.style.display = "block";
    infoTextEl.style.display = "none";
    titleEl.textContent = keyWord;
    partOfSpeechEl.textContent = "";
    wordMeaning.textContent = "N/A";
    wordExample.textContent = "N/A";
    wordExample.textContent = "N/A";
  } else {
    infoTextEl.style.display = "none";
    cardInfo.style.display = "block";
    titleEl.textContent = result[0].word;
    partOfSpeechEl.textContent = result[0].meanings[0].partOfSpeech;
    phoneticTextEl.textContent = result[0].phonetic || `/undefined/`;
    wordMeaning.textContent = result[0].meanings[0].definitions[0].definition;
    wordExample.textContent = result[0].meanings[0].definitions[0].example;

    buttonVolume.onclick = () => {
      const audioSrc = getAudioSrc(result[0].phonetics);
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play();
      }
    };
  }
};

const getAudioSrc = (phonetics) => {
  for (let phonetic of phonetics) {
    if (phonetic.audio !== "") {
      return phonetic.audio;
    }
  }
  return null;
};
