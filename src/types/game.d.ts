// Types
import BGM from './props/sound/bgm';
import SFX from './props/sound/sfx';

interface Game {
  currentScreen: string;
  enableBGM: boolean;
  enableSFX: boolean;
  enablePostProcessing: boolean;
  enableShadows: boolean;
  bgm: BGM[];
}

export default Game;
