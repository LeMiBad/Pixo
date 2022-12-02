import { createEvent, createStore } from "effector"



export const setColor = createEvent<string>()

export const $color = createStore('#ffffff')
    .on(setColor, (_, color) => color)

export const addUsedColor = createEvent<string>()
export const deleteUsedColor = createEvent<string>()
export const replaceColor = createEvent<{oldColor: string, newColor: string}>()
export const $usedColors = createStore(['#000000', '#ffffff'])
    .on(addUsedColor, (state, color) => [...state, color])
    .on(deleteUsedColor, (state, color) => {
        state.splice(state.indexOf(color), 1)
        return state
    })
    .on(replaceColor, (state, {oldColor, newColor}) => {
        state[state.indexOf(oldColor)] = newColor
        return state
    })