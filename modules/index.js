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

  // Create p1 tag
  const pTitle = document.createElement("p");
  pTitle.textContent = "Word Title: ";

  // Create span1 tag
  const cardWordTitle = document.createElement("span");
  cardWordTitle.classList.add("card-wordTitle");
  cardWordTitle.textContent = "____";

  cardInfo.appendChild(pTitle);
  pTitle.appendChild(cardWordTitle);

  // Create p2 tag
  const pMean = document.createElement("p");
  pMean.textContent = "Meaning: ";

  // Create span2 tag
  const cardWordMean = document.createElement("span");
  cardWordMean.classList.add("card-wordMean");
  cardWordMean.textContent = "____";

  cardInfo.appendChild(pMean);
  pMean.appendChild(cardWordMean);

  // Create audio tag
  const audio = document.createElement("audio");
  audio.id = "audio";
  audio.controls = true;

  cardInfo.appendChild(audio);

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
  const cardWordMean = document.querySelector(".card-wordMean");
  const audioEl = document.querySelector("audio");

  infoTextEl.style.display = "block";
  cardInfo.style.display = "none";
  
  if (result.title) {
    cardInfo.style.display = "block";
    infoTextEl.style.display = "none";
    titleEl.textContent = keyWord;
    cardWordMean.textContent = "N/A";
    audioEl.style.display = "none";
  } else {
    infoTextEl.style.display = "none";
    cardInfo.style.display = "block";
    audioEl.style.display = "inline-flex";
    titleEl.textContent = result[0].word;
    cardWordMean.textContent = result[0].meanings[0].definitions[0].definition;

    const audioSrc = getAudioSrc(result[0].phonetics);
    if (audioSrc) {
      audioEl.src = audioSrc;
    } else {
      audioEl.style.display = "none";
    }
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
