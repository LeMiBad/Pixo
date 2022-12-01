import { createEvent, createStore } from "effector"



export const setColor = createEvent<string>()

export const $color = createStore<string>('#ffffff')
    .on(setColor, (_, color) => color)