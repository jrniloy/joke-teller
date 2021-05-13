const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to voiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "4fa7ee3f5a1d4b6091a9e48d55737528",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//  Get joke from joke API
async function getJokes() {
  const apiURL =
    "https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,racist";
  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    const joke = data.setup
      ? `${data.setup} ... ${data.delivery}`
      : `${data.joke}`;

    // Text-to-Speech
    tellMe(joke);

    // Disable button
    toggleButton();
  } catch (error) {
    console.log("whoops", error);
  }
}

//  Event listners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
