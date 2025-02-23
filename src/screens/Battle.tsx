// screens/Battle.tsx
import { FC, ReactNode, useEffect, useState } from "react";
import {
  SetterOrUpdater,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from "recoil";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { screenState } from "../atoms/battlelv2"; // Add this import

// Components
import Card from "../components/2d/Card";
import Settings from "../components/2d/Settings";
import Text from "../components/2d/TextBox";
import Animation from "../components/3d/Animation";
import Camera from "../components/3d/Camera";
import Scene from "../components/3d/Scene";
import StadiumGenerator from "../components/utils/StadiumGenerator";
import Move from "../components/2d/Move";

// States
import battleState from "../atoms/battle";

// Types
import ScreenType from "../types/props/screen";
import BattleType from "../types/battle";
import PokemonType from "../types/pokemon";
import MoveType from "../types/move";

// Hooks
import useSetBGM from "../hooks/useSetBGM";
import { Button } from "react-bootstrap";

const quizQuestions = [
  {
    question: "What is the color of the sky on a sunny day?",
    answers: ["Blue", "Red", "Green", "Yellow"],
    correct: "Blue",
  },
  { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: ["Lion", "Tiger", "Elephant", "Cheetah"],
    correct: "Lion",
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: "7",
  },
];
const Battle: FC<ScreenType> = (props: ScreenType) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(quizQuestions[currentQuestionIndex]);
  const handleMoveSelection = (selectedMove: string) => {
    console.log("tztztztz", selectedMove);
    if (selectedMove === question.correct) {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setQuestion(quizQuestions[currentQuestionIndex + 1]);
      } else {
        console.log("Quiz Completed!");
      }
    } else {
      console.log("Wrong Answer! Try Again.");
    }
  };

  const RecoilBridge: FC<{ children: ReactNode }> =
    useRecoilBridgeAcrossReactRoots_UNSTABLE();

  // Props
  const { game }: ScreenType = props;

  // States
  const [battle, setBattle]: [BattleType, SetterOrUpdater<BattleType>] =
    useRecoilState<BattleType>(battleState);

  // Hooks
  useSetBGM("Battle");

  useEffect((): void => {
    const newTeam1: PokemonType[] = [
      {
        pokemonName: "Squirtle",
        currentLV: 12,
        currentHP: 5,
        maximumHP: 4,
        attack: 1,
        defense: 1,
        position: [0, 0, 7.5],
        rotation: [0, Math.PI * 1, 0],
        scale: [0.75, 0.75, 0.75],
        currentAnimation: "SquirtleStance",
        moves: [
          { moveName: "Tackle", damages: 15 },
          { moveName: "Tackle", damages: 15 },
          { moveName: "Tackle", damages: 15 },
          { moveName: "Tackle", damages: 15 },
        ],
      },
    ];

    // Initializes a new team for the AI
    const newTeam2: PokemonType[] = [
      {
        pokemonName: "Onix",
        currentLV: 14,
        currentHP: 2,
        maximumHP: 8,
        attack: 1,
        defense: 1,
        position: [0, 0, -7.5],
        rotation: [0, Math.PI * 2, 0],
        scale: [1.5, 1.5, 1.5],
        currentAnimation: "charizar",
        moves: [{ moveName: "Tackle", damages: 15 }],
      },
    ];

    const newTeam = (array: PokemonType[]): PokemonType[] => {
      array.forEach((n: PokemonType): void => {
        n.currentHP = (n.currentLV + Math.floor(n.currentLV + 1)) * 2;
        n.maximumHP = n.currentHP;
        n.attack = n.currentLV + Math.floor(n.currentLV + 1);
        n.defense = n.currentLV + Math.floor(n.currentLV + 1);
      });

      return array;
    };

    // Initializes the battle
    const newBattle: BattleType = {
      textBox: "",
      enableUI: false,
      camera: {
        enableRotate: true,
        position: [0, -1.25, 0],
        rotation: [0, Math.PI * 1.5, 0],
      },
      team1: newTeam(newTeam1),
      team2: newTeam(newTeam2),
    };

    setBattle(newBattle);

    let newTextBox: string = "You are challenged by Gym Leader Brock!";

    setBattle({ ...newBattle, textBox: newTextBox });

    setTimeout((): void => {
      newTextBox = "";

      setBattle({ ...newBattle, textBox: newTextBox });
    }, 2000);

    setTimeout((): void => {
      const audio: HTMLAudioElement = new Audio("sfx/Onix.wav");

      if (game.enableSFX) {
        audio.play();
      }

      setBattle({ ...newBattle, textBox: newTextBox });
    }, 2500);

    setTimeout((): void => {
      newTextBox = "";

      setBattle({ ...newBattle, textBox: newTextBox });
    }, 4500);

    setTimeout((): void => {
      const audio: HTMLAudioElement = new Audio("sfx/Squirtle.wav");

      if (game.enableSFX) {
        audio.play();
      }

      newTextBox = "Go! Squirtle!";

      setBattle({ ...newBattle, textBox: newTextBox });
    }, 5000);

    setTimeout((): void => {
      newTextBox = "";

      setBattle({ ...newBattle, textBox: newTextBox, enableUI: true });
    }, 9500);
  }, [setBattle]);

  return (
    <div className="absolute h-full w-full bg-black">
      <Canvas>
        {/* Initializes UI */}
        <Html as="div" fullscreen className="select-none">
          {/* Checks if the battle state exists then displays the text box with its parameter contained in the battle global state */}
          {battle?.textBox ? (
            <RecoilBridge>
              <Text
                text={battle?.textBox as string}
                battle={battle}
                game={game}
              />
            </RecoilBridge>
          ) : null}
          <RecoilBridge>
            <Settings game={game} />
          </RecoilBridge>
          {/* Checks if the battle state exists then displays the Pokémon cards with their parameters contained in the battle global state */}
          {battle?.enableUI && battle?.team1 && battle?.team2 ? (
            <>
              <div className="flex w-full p-4">
                <Card pokemon={battle?.team1[0] as PokemonType} team={1} />
                <Card pokemon={battle?.team2[0] as PokemonType} team={2} />
              </div>
            </>
          ) : null}
          {/* Checks if the battle state exists then displays the Pokémon moves with their parameters contained in the battle global state */}
          {battle?.enableUI && battle?.team1 ? (
            <>
              <div className="absolute inset-0 flex  items-end justify-center animate-pulse hover:animate-none">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {question.answers.map((answer, i) => (
                    <RecoilBridge key={i}>
                      <Button onClick={() => handleMoveSelection(answer)}>
                        <Move
                          move={{ moveName: answer, damages: 10 }} // Adjust "damages" as needed
                          battle={battle}
                          game={game}
                        />
                      </Button>
                    </RecoilBridge>
                  ))}
                </div>
              </div>
              <div className="absolute  top-10  right-64 p-12 animate-pulse hover:animate-none">
                <div className="bg-gradient-to-r from-cyan-400 to-green-400 shadow-xl shadow-green-400/50 rounded-xl ring-4 ring-cyan-400/50 border-2 border-white md:w-[600px]  w-[600px] p-2 text-sm font-semibold drop-shadow hover:scale-105 duration-100">
                  <p>{question.question}</p>
                </div>
              </div>
            </>
          ) : null}
        </Html>
        {/* Initializes 3d elements */}
        {/* Initializes camera props */}
        {battle?.camera ? (
          <Camera
            enableRotate={battle.camera.enableRotate}
            position={battle.camera.position}
            rotation={battle.camera.rotation}
            minimumDistance={10}
            maximumDistance={10}
            maximumPolarAngle={Math.PI * 0.5}
          >
            {/* Initializes scene props */}
            <Scene
              enablePostProcessing={game.enablePostProcessing}
              enableShadows={game.enableShadows}
              blurMinimumDistance={0.1}
              blurMaximumDistance={10}
            />
            <StadiumGenerator />
            {/* Checks if the battle state exists then displays the Pokémon 3d animations with their parameters contained in the battle global state */}
            {battle?.team1 ? (
              <>
                {/* That is not possible to load an animation just with its file name, you need to display or hide it */}
                {battle?.team1[0].currentAnimation === "SquirtleStance" ? (
                  <Animation
                    title="SquirtleStance"
                    position={battle?.team1[0].position as number[]}
                    rotation={battle?.team1[0].rotation as number[]}
                    scale={battle?.team1[0].scale as number[]}
                  />
                ) : null}
                {battle?.team1[0].currentAnimation === "SquirtleAttack" ? (
                  <Animation
                    title="SquirtleAttack"
                    position={battle?.team1[0].position as number[]}
                    rotation={battle?.team1[0].rotation as number[]}
                    scale={battle?.team1[0].scale as number[]}
                  />
                ) : null}
              </>
            ) : null}
            {/* Checks if the battle state exists then displays the Pokémon 3d animations with their parameters contained in the battle global state */}
            {battle?.team2 ? (
              <>
                {/* That is not possible to load an animation just with its file name, you need to display or hide it */}
                {battle?.team2[0].currentAnimation === "charizar" ? (
                  <Animation
                    title="charizar"
                    position={battle?.team2[0].position as number[]}
                    rotation={battle?.team2[0].rotation as number[]}
                    scale={battle?.team2[0].scale as number[]}
                  />
                ) : null}
                {battle?.team2[0].currentAnimation === "charizar" ? (
                  <Animation
                    title="charizar"
                    position={battle?.team2[0].position as number[]}
                    rotation={battle?.team2[0].rotation as number[]}
                    scale={battle?.team2[0].scale as number[]}
                  />
                ) : null}
              </>
            ) : null}
          </Camera>
        ) : null}
      </Canvas>
    </div>
  );
};

export default Battle;
