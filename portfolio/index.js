import { showSelfTest } from './scripts/self-test.js';
import { initAdaptiveMenu } from './scripts/menu.js';
import { initChangingSeason } from './scripts/portfolio.js';
import { preloadImages } from './scripts/portfolio.js';
import { initTranslation } from './scripts/translation.js';
import { initChangingTheme } from './scripts/theme.js';
import { initButtonsEffects } from './scripts/buttons.js'
import { initVideoPlayer } from './scripts/video-player.js'

showSelfTest();

initAdaptiveMenu();

initChangingSeason();

initTranslation();        

initChangingTheme();

initButtonsEffects();

initVideoPlayer();

document.querySelector('body').style.display = 'flex';

const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(season => preloadImages(season));

const videoControlsIcons = ['fullscreen', 'mute', 'pause', 'play_speed', 'play', 'volume'];

videoControlsIcons.forEach(icon => preloadIcon(icon));

function preloadIcon(iconName) {
  const icon = new Image();
  icon.src = `./assets/svg/${iconName}.svg`;
}