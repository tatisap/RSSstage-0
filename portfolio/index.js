import { showSelfTest } from './scripts/self-test.js';
import { initAdaptiveMenu } from './scripts/menu.js';
import { initChangingSeason } from './scripts/portfolio.js';
import { initTranslation } from './scripts/translation.js';
import { initChangingTheme } from './scripts/theme.js';
import { initButtonsEffects } from './scripts/buttons.js'

showSelfTest();

initAdaptiveMenu();

initChangingSeason();

initTranslation();        

initChangingTheme();

initButtonsEffects();

document.querySelector('body').style.display = 'flex';