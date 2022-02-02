export function video() {
  const video = document.querySelector('.video');
  const playButtons = document.querySelectorAll('.play-pause-button, .play-button');
  const volumeStatus = document.querySelector('.volume-status');
  const progressBar = document.querySelector('#progress-slider');

  let lastVolume = 1;


  function playVideo() {
    let method = (video.paused) ? 'play' : 'pause';
    video[method]();
    playButtons.forEach(button => button.classList.toggle('video-in-progress'));
  }

  playButtons.forEach(button => button.addEventListener('click', playVideo));

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
}