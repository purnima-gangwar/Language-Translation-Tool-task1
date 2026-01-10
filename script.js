async function translateText() {
  const text = document.getElementById("inputText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (text.trim() === "") {
    alert("Please enter text");
    return;
  }

  try {
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) +
      "&langpair=" +
      source +
      "|" +
      target;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("outputText").value = data.responseData.translatedText;


  } catch (error) {
    alert("Translation failed"); 
    console.error(error);
  }
}

function copyText() {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
  alert("Copied!");
}

function speakText() {
  const text = document.getElementById("outputText").value;
  if (text === "") {
    alert("No text to speak!");
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = document.getElementById("targetLang").value;
  window.speechSynthesis.speak(speech);
}

