import { createMachine } from "xstate";

const playerMachine = createMachine({
  id: "player",
  initial: "idle",
  states: {
    idle: {
      on: { PLAY: "playing" },
    },
    playing: {
      on: {
        PAUSE: "paused",
        STOP: "idle",
        TOGGLE_MINIMIZE: "minimizedPlaying", // Переключение в мини-режим с сохранением воспроизведения
      },
    },
    paused: {
      on: {
        PLAY: "playing",
        STOP: "idle",
        TOGGLE_MINIMIZE: "minimizedPaused", // Переключение в мини-режим с сохранением паузы
      },
    },
    minimizedPlaying: {
      on: {
        PAUSE: "minimizedPaused", // Пауза внутри мини-режима
        TOGGLE_MAXIMIZE: "playing", // Возврат к развернутому режиму с воспроизведением
        STOP: "idle",
      },
    },
    minimizedPaused: {
      on: {
        PLAY: "minimizedPlaying", // Воспроизведение внутри мини-режима
        TOGGLE_MAXIMIZE: "paused", // Возврат к развернутому режиму с паузой
        STOP: "idle",
      },
    },
  },
} as const);

export default playerMachine;
