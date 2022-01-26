import { showSelfTest } from './scripts/self-test.js';
import { initMenu } from './scripts/menu.js';
import { changeSeason } from './scripts/portfolio.js';
import { translate } from './scripts/translation.js';
import { theme } from './scripts/theme.js';
import { initButtonsEffect } from './scripts/buttons.js'

showSelfTest();

initMenu();

changeSeason();

translate();

theme();

initButtonsEffect();

document.querySelector('body').style.display = 'flex';