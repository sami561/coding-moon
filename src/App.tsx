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
import Login from './screens/Login'
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
    <>
    {
      game.bgm && game.bgm.length > 0
        ?
          game.bgm.map((b: BGMType, index: number) => <BGM key={index} {...b} />)
        :
          null
    }
    {
      (
        game && game.currentScreen === 'Battle'
      ) ? (
        <Battle game={game}/>
      ) : (
        null
      )
    }
    {
      (
        game && game.currentScreen === 'Title'
      ) ? (
        <Title game={game} />
      ) : (
        null
      )
    }
      {game.currentScreen === "BattleLV2" && <BattleLV2 game={game} />}
      {game.currentScreen === "BattleLV3" && <BattleLV3 game={game} />}
      {game.currentScreen === "shop" && <ShopPage  game={game}/>}

  </>

  );
};

export default App;
