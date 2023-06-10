// atoms.js 파일

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userIdState = atom({
  key: "userIdState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// atoms.js 파일

export const bookmarkState = atom({
  key: "bookmarkState",
  default: [],
});
