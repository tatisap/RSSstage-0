export function video() {
  const video = document.querySelector('.video');
  const playButtons = document.querySelectorAll('.play-pause-button, .play-button');
  const volumeStatus = document.querySelector('.volume-status');

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
}