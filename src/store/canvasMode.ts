import { createEvent, createStore } from "effector"


const canvasRender = (size: number, canvasSize: number) => {
    const cells = []
    
    const cellSize = canvasSize / size

    for(let i = 0; i < size; i++) {
        const row = []
        for(let j = 0; j < size; j++) {
            row.push({color: 'white', size: cellSize})
        }
        cells.push(row)
    }

    return cells
}

const initialState = {
    size: 4, 
    canvasSize: 4, 
    canvas: canvasRender(4, 10)
}



export const setNewCanvas = createEvent<number[]>()
export const paint = createEvent<{color:string, cords: number[]}>()

export const $canvas = createStore(initialState)
    .on(setNewCanvas, (state, [size, canvasSize]) => {
        const newState = {...state}
        newState.size = size
        newState.size = canvasSize
        newState.canvas = canvasRender(size, canvasSize)
        return newState
    })
    .on(paint, (state, {color, cords}) => {
        const newState = {...state}
        const newCanvas = newState.canvas
        newCanvas[cords[0]][cords[1]].color = color
        newState.canvas = newCanvas
        return newState
    })