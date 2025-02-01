const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

btn.addEventListener("click", () => {
    document.getElementById('loading-indicator').style.display = 'block';

    let word = inpWord.value;
    fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${word}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
            document.getElementById('loading-indicator').style.display = 'none';
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            document.getElementById('loading-indicator').style.display = 'none'; 
        });
});

inpWord.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
});

function playSound() {
    sound.play();
}