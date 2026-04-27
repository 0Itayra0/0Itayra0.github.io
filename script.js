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
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.remove();
    }, 500);

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

    // Hide all sections, then reveal the one that matches the hash
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

// --- Theme Drawer Logic ---

// Updated to link to the new /themes subfolders
const themes = {
    default: {
        video: 'themes/default/background-loop.mp4',
        audio: 'themes/default/lullaby_of_the_new_moon.mp3',
        cover: 'themes/default/song-cover.webp',
        title: 'Lullaby of the New Moon'
    },
    chill: {
        video: 'themes/chill/chill-bg.mp4',      
        audio: 'themes/chill/chill-song.mp3',    
        cover: 'themes/chill/chill-cover.webp',   
        title: 'Low Cortisol'
    },
    cyberpunk: {
        video: 'themes/placeholder/cyber-bg.mp4',      
        audio: 'themes/placeholder/cyber-song.mp3',    
        cover: 'themes/placeholder/cyber-cover.jpg',   
        title: 'Neon Nights'
    }
};

function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // 1. Swap Background Video
    const videoElement = document.getElementById('bg-video');
    videoElement.src = theme.video;
    videoElement.play(); 

    // 2. Swap Audio
    const wasPlaying = isPlaying; 
    audio.src = theme.audio;
    if (wasPlaying) {
        audio.play(); 
    }

    // 3. Swap UI Details
    document.querySelector('.song-cover').src = theme.cover;
    document.querySelector('.song-title').innerText = theme.title;
    
    // 4. Reset Progress Bar
    progress.style.width = '0%';
    currentTimeEl.innerText = '0:00';
}