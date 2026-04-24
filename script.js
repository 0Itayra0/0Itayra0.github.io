const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const overlay = document.getElementById('enter-overlay');

let isPlaying = false;

// Handle Entrance Overlay & Autoplay
overlay.addEventListener('click', () => {
    // Fade out
    overlay.style.opacity = '0';
    
    // Remove from DOM after fade finishes
    setTimeout(() => {
        overlay.remove();
    }, 500);

    // Start music
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// Play / Pause Toggle
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Update Progress Bar as song plays
audio.addEventListener('timeupdate', () => {
    // Prevent errors if duration isn't loaded yet
    if (!audio.duration) return; 

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeEl.innerText = `${currentMin}:${currentSec}`;
});

// Load total time
audio.addEventListener('loadedmetadata', () => {
    let durationMin = Math.floor(audio.duration / 60);
    let durationSec = Math.floor(audio.duration % 60);
    if (durationSec < 10) durationSec = `0${durationSec}`;
    totalTimeEl.innerText = `${durationMin}:${durationSec}`;
});

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// --- SPA Hash Routing Logic ---
function handleRouting() {
    // Get the hash from the URL (e.g., "pricing" from "#pricing"), default to "home"
    const hash = window.location.hash.substring(1) || 'home';
    const sections = document.querySelectorAll('.view-section');

    sections.forEach(sec => {
        if (sec.id === hash) {
            sec.classList.remove('hidden');
        } else {
            sec.classList.add('hidden');
        }
    });
}

// Listen for tab switches
window.addEventListener('hashchange', handleRouting);

// Run once when the page first loads
handleRouting();