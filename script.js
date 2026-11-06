// ===========================
// AI CLASSIFIER
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("EchoVerse Classifier Loaded");

    const predictButton = document.getElementById("predictBtn");
    const fileInput = document.getElementById("audioFile");
    const resultDiv = document.getElementById("result");

    predictButton.addEventListener("click", async (e) => {

        e.preventDefault();

        console.log("Predict button clicked!");

        if (!fileInput.files.length) {
            resultDiv.innerHTML = "Please select an audio file.";
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        resultDiv.innerHTML = "<h3>Predicting...</h3>";

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/predict",
                {
                    method: "POST",
                    body: formData
                }
            );

            console.log("Response Status:", response.status);

            const data = await response.json();

            console.log("Prediction Data:", data);

            if (!response.ok) {
                throw new Error(data.error || "Prediction failed");
            }

            resultDiv.innerHTML = `
                <h2>Prediction Result</h2>
                <h3>Genre: ${data.genre}</h3>
                <h3>Confidence: ${data.confidence}</h3>
            `;

            resultDiv.style.display = "block";
            resultDiv.style.color = "white";

        } catch (error) {

            console.error("Prediction Error:", error);

            resultDiv.innerHTML = `
                <h3 style="color:red;">
                    ${error.message}
                </h3>
            `;
        }
    });
});


      

// ===========================
// MUSIC PLAYER
// ===========================

const audioPlayer = document.getElementById("audioPlayer");
const coverImage = document.getElementById("coverImage");
const songTitle = document.getElementById("songTitle");
const playBtn = document.getElementById("playBtn");

function playSong(song, title, image) {

    if (!audioPlayer) return;

    audioPlayer.pause();

    audioPlayer.src = song;

    audioPlayer.load();

    coverImage.src = image;

    songTitle.textContent = title;

    audioPlayer.play()

    .then(() => {

        playBtn.textContent = "⏸️";

    })

    .catch((err) => {

        console.error("Audio Error:", err);

        alert("Unable to play this song.");

    });

}

function togglePlay() {

    if (!audioPlayer) return;

    if (audioPlayer.paused) {

        audioPlayer.play();

        playBtn.textContent = "⏸️";

    }

    else {

        audioPlayer.pause();

        playBtn.textContent = "▶️";

    }

}

audioPlayer?.addEventListener("ended", () => {

    playBtn.textContent = "▶️";

});

audioPlayer?.addEventListener("play", () => {

    playBtn.textContent = "⏸️";

});

audioPlayer?.addEventListener("pause", () => {

    playBtn.textContent = "▶️";

});
const resultBox = document.getElementById("result");

if (resultBox) {
    const observer = new MutationObserver(() => {
        console.log("RESULT BOX CHANGED:", resultBox.innerHTML);
    });

    observer.observe(resultBox, {
        childList: true,
        subtree: true,
        characterData: true
    });
}