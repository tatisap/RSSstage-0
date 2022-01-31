import { showSelfTest } from './scripts/self-test.js';
import { initAdaptiveMenu } from './scripts/menu.js';
import { initChangingSeason } from './scripts/portfolio.js';
import { preloadImages } from './scripts/portfolio.js';
import { initTranslation } from './scripts/translation.js';
import { initChangingTheme } from './scripts/theme.js';
import { initButtonsEffects } from './scripts/buttons.js'
import { video } from './scripts/video-player.js'

showSelfTest();

initAdaptiveMenu();

initChangingSeason();

initTranslation();        

initChangingTheme();

initButtonsEffects();

video();

document.querySelector('body').style.display = 'flex';

const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(season => preloadImages(season));