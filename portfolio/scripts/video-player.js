export function video() {
  const video = document.querySelector('.video');
  const controls = document.querySelector('.controls');
  const playButtons = document.querySelectorAll('.play-pause-button, .play-button');
  const volumeStatus = document.querySelector('.volume-status');
  const progressBar = document.querySelector('#progress-slider');
  const volumeBar = document.querySelector('#volume-slider');
  const totalMinutes = document.querySelector('.total-time').firstElementChild;
  const totalSeconds = document.querySelector('.total-time').lastElementChild;
  const currentMinutes = document.querySelector('.current-time').firstElementChild;
  const currentSeconds = document.querySelector('.current-time').lastElementChild;

  let lastVolume = 0.5;
  video.volume = lastVolume;

  let isFirstPlaying = true;

  function toggleVideo() {
    (video.paused) ? playVideo() : pauseVideo();
  }

  function playVideo() {
    if (isFirstPlaying) {
      isFirstPlaying = false;
      controls.style.display = 'flex';
      totalMinutes.textContent = (video.duration < 60) ? 0 : Math.floor(video.duration / 60);
      totalSeconds.textContent = (video.duration < 60) ? Math.ceil(video.duration) : Math.ceil(video.duration % 60);
    }
    video.play();
    playButtons.forEach(button => button.classList.add('video-in-progress'));
  }

  function pauseVideo() {
    video.pause();
    playButtons.forEach(button => button.classList.remove('video-in-progress'));
  }

  video.addEventListener('click', toggleVideo);
  playButtons.forEach(button => button.addEventListener('click', toggleVideo));

  video.addEventListener('ended', pauseVideo);

  function toggleMute() {
    if (lastVolume === 0) lastVolume = 0.5;
    if (video.volume) {
      video.volume = 0;
      volumeBar.value = 0;
      volumeBar.style.backgroundImage = `linear-gradient(to right, #bdae82 0%, #bdae82 0%, #b3b3bb 0%, #b3b3bb 100%)`;
      volumeStatus.classList.add('muted');
    } else {
      video.volume = lastVolume;
      volumeBar.value = lastVolume * 100;
      volumeBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(volumeBar.value)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(volumeBar.value))}%)`;
      volumeStatus.classList.remove('muted');
    }
  }

  volumeStatus.addEventListener('click', toggleMute);

  function updateProgress() {
    progressBar.value = `${Math.round(video.currentTime / video.duration * 100)}`;
    progressBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(video.currentTime / video.duration * 100)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(video.currentTime / video.duration * 100))}%)`;
    updateTime(video.currentTime);
  }

  function updateTime(time) {
    currentMinutes.textContent = (time < 60) ? 0 : Math.floor(time / 60);
    currentSeconds.textContent = (time <= 9) ? `0${Math.ceil(time % 60)}` : Math.ceil(time % 60);
  }

  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('canplay', updateProgress);

  function onMouseMove() {
    video.currentTime =  progressBar.value * video.duration / 100;
    progressBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(progressBar.value)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(progressBar.value))}%)`;
    updateTime(video.currentTime);
  }
  progressBar.addEventListener('input', onMouseMove);

  function onMouseDown(event) {
    if (event.target === progressBar) {
      let isPaused = video.paused;
      if(!isPaused) video.pause();

      document.addEventListener('mouseup', onMouseUp);
    
      function onMouseUp() {
        if(!isPaused) playVideo();
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  }

  document.addEventListener('mousedown', onMouseDown);

  function changeVolume() {
    video.volume = volumeBar.value / 100;
    lastVolume = video.volume;
    volumeBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(volumeBar.value)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(volumeBar.value))}%)`;
  }
  function toggleVolumeButton() {
    (volumeBar.value === '0') ? volumeStatus.classList.add('muted') :
    volumeStatus.classList.remove('muted');
  }

  volumeBar.addEventListener('input', changeVolume);
  volumeBar.addEventListener('change', toggleVolumeButton);
}