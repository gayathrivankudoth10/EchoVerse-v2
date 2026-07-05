// ===========================
// AI CLASSIFIER
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Script Loaded Successfully");

    const predictButton = document.getElementById("predictBtn");
    const fileInput = document.getElementById("audioFile");
    const resultDiv = document.getElementById("result");

    if (predictButton && fileInput && resultDiv) {

        predictButton.addEventListener("click", async (e) => {

            e.preventDefault();

            if (fileInput.files.length === 0) {

                resultDiv.innerHTML =
                    "<p style='color:red;'>Please choose an MP3 or WAV file.</p>";
                return;
            }

            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            resultDiv.innerHTML = "<p>Predicting...</p>";

            try {

                const response = await fetch("http://127.0.0.1:5000/predict", {

                    method: "POST",
                    body: formData

                });

                if (!response.ok) {
                    throw new Error("Server Error");
                }

                const data = await response.json();

                resultDiv.innerHTML = `
                    <h3>Prediction Result</h3>
                    <p><strong>Genre:</strong> ${data.genre}</p>
                    <p><strong>Confidence:</strong> ${data.confidence}</p>
                `;

            }

            catch (error) {

                console.error(error);

                resultDiv.innerHTML = `
                    <p style="color:red;">
                        Server Error. Try Again.
                    </p>
                `;
            }

        });

    }

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