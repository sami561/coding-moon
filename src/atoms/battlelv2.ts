import { atom } from "recoil";

export const screenState = atom<string>({
  key: "screenState",
  default: "Battle",
});
