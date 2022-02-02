export function video() {
  const video = document.querySelector('.video');
  const playButtons = document.querySelectorAll('.play-pause-button, .play-button');
  const volumeStatus = document.querySelector('.volume-status');
  const progressBar = document.querySelector('#progress-slider');

  let lastVolume = 1;


  function toggleVideo() {
    let method = (video.paused) ? 'play' : 'pause';
    video[method]();
    playButtons.forEach(button => button.classList.toggle('video-in-progress'));
  }

  video.addEventListener('click', toggleVideo);
  playButtons.forEach(button => button.addEventListener('click', toggleVideo));

  function changeVolume() {
    if (video.volume) {
      video.volume = 0;
      volumeStatus.classList.add('muted');
    } else {
      video.volume = lastVolume;
      volumeStatus.classList.remove('muted');
    }
  }

  volumeStatus.addEventListener('click', changeVolume);

  function updateProgress() {
    progressBar.value = `${Math.round(video.currentTime / video.duration * 100)}`;
    progressBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(video.currentTime / video.duration * 100)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(video.currentTime / video.duration * 100))}%)`;
  }

  video.addEventListener('timeupdate', updateProgress);

  function setProgress(event) {
    if (event.target === progressBar) {
      
      video.removeEventListener('timeupdate', updateProgress);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

      function onMouseMove() {
        video.currentTime =  progressBar.value * video.duration / 100;
        progressBar.style.backgroundImage = `linear-gradient(to right, #bdae82 ${Math.round(progressBar.value)}%, #bdae82 0%, #b3b3bb 0%, #b3b3bb ${100 - (Math.round(progressBar.value))}%)`;
      }

      function onMouseUp() {
        video.currentTime = progressBar.value * video.duration / 100;

        video.addEventListener('timeupdate', updateProgress);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
  }

  document.addEventListener('mousedown', setProgress);
}