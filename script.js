const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const overlay = document.getElementById('enter-overlay');

let isPlaying = false;

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.remove();
    }, 500);

    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
});

// Playing / Pause Toggle
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

// Song progress bar
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return; 

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeEl.innerText = `${currentMin}:${currentSec}`;
});

audio.addEventListener('loadedmetadata', () => {
    let durationMin = Math.floor(audio.duration / 60);
    let durationSec = Math.floor(audio.duration % 60);
    if (durationSec < 10) durationSec = `0${durationSec}`;
    totalTimeEl.innerText = `${durationMin}:${durationSec}`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// spa
function handleRouting() {
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


window.addEventListener('hashchange', handleRouting);
handleRouting();

// themes drawing

// added /themes folder, should be more organized now
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

// Swapping stuff
function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const videoElement = document.getElementById('bg-video');
    videoElement.src = theme.video;
    videoElement.play(); 

    const wasPlaying = isPlaying; 
    audio.src = theme.audio;
    if (wasPlaying) {
        audio.play(); 
    }

    document.querySelector('.song-cover').src = theme.cover;
    document.querySelector('.song-title').innerText = theme.title;
    
    progress.style.width = '0%';
    currentTimeEl.innerText = '0:00';
}