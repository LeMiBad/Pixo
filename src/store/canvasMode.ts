import { createEvent, createStore } from "effector"


export type IArts = {
                id: number
                name: string
                art?: {
                    canvasSize: number
                    canvas: {
                        color: string;
                        size: number;
                    }[][]
                }
            }[]

const initialArts: IArts = [
    {
        id: 0,
        name: 'Тестовый',
        art: {
            canvasSize: 3,
            canvas: [
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#000000",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ],
                [
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    },
                    {
                        "color": "#ffffff",
                        "size": 124.42857142857143
                    }
                ]
            ]
        }
    }
]

export const $atrs = createStore(initialArts)

const canvasRender = (size: number, canvasSize: number) => {
    const cells = []
    
    const cellSize = canvasSize / size

    for(let i = 0; i < size; i++) {
        const row = []
        for(let j = 0; j < size; j++) {
            row.push({color: '#ffffff', size: cellSize})
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
export const setCanvas = createEvent<{color: string, size: number}[][]>()
export const paint = createEvent<{color:string, cords: number[]}>()
export const replaceCanvasColor = createEvent<{oldColor:string, newColor: string}>()

export const $canvas = createStore(initialState)
    .on(setNewCanvas, (state, [size, canvasSize]) => {
        const newState = {...state}
        newState.size = size
        newState.size = canvasSize
        newState.canvas = canvasRender(size, canvasSize)
        return newState
    })
    .on(setCanvas, (state, canvas) => {
        const newState = {...state}
        newState.canvas = canvas
        return newState
    })
    .on(paint, (state, {color, cords}) => {
        const newState = {...state}
        const newCanvas = newState.canvas
        newCanvas[cords[0]][cords[1]].color = color
        newState.canvas = newCanvas
        return newState
    })
    .on(replaceCanvasColor, (state, {oldColor, newColor}) => {
        const newStateCanvas = state.canvas.map(row => {
            return row.map(color => {
                if(color.color === oldColor) return {color: newColor, size: color.size}
                return color
            })
        })
        state.canvas = newStateCanvas
        return state
    })
    
export const setCanvasSize = createEvent<number>()
export const $canvasSize = createStore(3)
    .on(setCanvasSize, (_, size) => size)