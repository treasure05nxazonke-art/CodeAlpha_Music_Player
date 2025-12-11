const songs = [
    { title: "Duncan Laurence - Arcade", artist: "Duncan Laurence", src: "songs/Duncan Laurence - Arcade (Lyrics) ft. FLETCHER.mp3" },
    { title: "Egzod & Maestro Chives - Royalty", artist: "Egzod, Maestro Chives", src: "songs/Egzod & Maestro Chives - Royalty (Lyrics) ft. Neoni.mp3" },
    { title: "EMIN feat. JONY - КАМИН", artist: "EMIN, JONY", src: "songs/EMIN feat. JONY - КАМИН.mp3" },
    { title: "Indila - Tourner dans le vide", artist: "Indila", src: "songs/Indila - Tourner dans le vide (Lyrics).mp3" },
    { title: "In The Dark - Swae Lee", artist: "Swae Lee", src: "songs/In The Dark - Swae Lee feat. Jhené Aiko (Official Music Video).mp3" },
    { title: "Kendrick Lamar, SZA - All The Stars", artist: "Kendrick Lamar, SZA", src: "songs/Kendrick Lamar, SZA - All The Stars (Lyrics).mp3" },
    { title: "Liam Payne, Rita Ora - For You", artist: "Liam Payne, Rita Ora", src: "songs/Liam Payne, Rita Ora - For You (Fifty Shades Freed).mp3" },
    { title: "Iloyiso - Madoda Sabelani", artist: "Iloyiso", src: "songs/lloyiso - Madoda Sabelani (Official Audio).mp3" },
    { title: "Madonna x Sickick - Frozen Remix", artist: "Madonna, Sickick", src: "songs/Madonna x Sickick - Frozen (Lyrics).mp3" },
    { title: "Noah Cyrus - Again", artist: "Noah Cyrus", src: "songs/Noah Cyrus - Again (Lyrics) Ft. XXXTENTACION.mp3" },
    { title: "OMI - Cheerleader", artist: "OMI", src: "songs/OMI - Cheerleader (Felix Jaehn Remix) (Lyrics).mp3" },
    { title: "Rihanna - We Found Love", artist: "Rihanna", src: "songs/Rihanna - We Found Love (slowed+reverb+lyrics) ft. Calvin Harris.mp3" },
    { title: "Rihanna - Where Have You Been", artist: "Rihanna", src: "songs/Rihanna - Where Have You Been (Lyrics).mp3" },
    { title: "Shekhinah - Please Mr", artist: "Shekhinah", src: "songs/Shekhinah - Please Mr.mp3" },
    { title: "Shekhinah - Suited", artist: "Shekhinah", src: "songs/Shekhinah - Suited.mp3" },
    { title: "Stephen Sanchez - Until I Found You", artist: "Stephen Sanchez", src: "songs/Stephen Sanchez - Until I Found You (Lyrics).mp3" },
    { title: "The Weeknd - Try Me", artist: "The Weeknd", src: "songs/The Weeknd - Try Me (Official Audio).mp3" },
    { title: "The Weeknd - Wasted Times", artist: "The Weeknd", src: "songs/The Weeknd - Wasted Times (Official Audio).mp3" },
    { title: "Tory Lanez - LUV", artist: "Tory Lanez", src: "songs/Tory Lanez - LUV.mp3" },
    { title: "Gata Only", artist: "FloyyMenor and Cris MJ", src: "songs/Lyrics).mp3" }

];


let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(i) {
    const s = songs[i];
    audio.src = s.src;
    title.textContent = s.title;
    artist.textContent = s.artist;
    highlightSong();
}

function highlightSong() {
    const cards = document.querySelectorAll(".song-card");
    cards.forEach((card, i) => {
        card.classList.toggle("active-song", i === index);
    });
}

async function togglePlay() {
    if (audio.paused) {
        await audio.play().catch(e => console.log("Play blocked:", e));
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

playBtn.addEventListener("click", togglePlay);

nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

// Populate playlist
songs.forEach((song, i) => {
    const card = document.createElement("div");
    card.classList.add("song-card");
    card.innerHTML = `
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
    `;
    card.addEventListener("click", () => {
        index = i;
        loadSong(index);
        audio.play();
        playBtn.textContent = "⏸";
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    playlist.appendChild(card);
});

// Progress bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", () => { audio.volume = volumeSlider.value; });

// Auto next song
audio.addEventListener("ended", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
});

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" + sec : sec}`;
}

const shuffleBtn = document.getElementById("shuffle");

shuffleBtn.addEventListener("click", () => {
    // Pick a random index different from current
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while(randomIndex === index);
    
    index = randomIndex;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

