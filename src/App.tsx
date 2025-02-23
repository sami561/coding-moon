// Packages
import { FC, useEffect } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
// Components
import BGM from './components/sound/BGM';

// Screens
import Battle from './screens/Battle';
import Title from './screens/Title';
import BattleLV2 from "./screens/BattleLV2"
import BattleLV3 from "./screens/BattleLV3"
// States
import gameState from './atoms/game';

// Types
import BGMType from './types/props/sound/bgm';
import GameType from './types/game';
import ShopPage from './screens/Shop';
import LoginForm from './screens/Login';

const App: FC = () => {
  // States
  const [game, setGame]: [GameType, SetterOrUpdater<GameType>] = useRecoilState<GameType>(gameState);

  useEffect((): void => {
    setGame({
      currentScreen: 'Title',
      enableBGM: false,
      enableSFX: false,
      enablePostProcessing: true,
      enableShadows: true,
      bgm: [],
    });
  }, [setGame]);

  return (
    <Router> <>
    {
      game.bgm && game.bgm.length > 0
        ?
          game.bgm.map((b: BGMType, index: number) => <BGM key={index} {...b} />)
        :
          null
    }


      {game.currentScreen === "BattleLV2" && <BattleLV2 game={game} />}
      {game.currentScreen === "BattleLV3" && <BattleLV3 game={game} />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/shop" element={<ShopPage game={game} />} />
        <Route path="/battle" element={<Battle game={game} /> } />
        <Route path="/" element={<Title game={game} />} />
      </Routes>
  </></Router>

  );
};

export default App;
