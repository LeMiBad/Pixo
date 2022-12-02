import { useStore } from 'effector-react'
import { HexColorPicker } from "react-colorful";
import React, { useEffect, useRef, useState } from 'react'
import { $canvas, $canvasSize, paint, setCanvas, setNewCanvas } from '../../store/canvasMode'
import css from './Area.module.sass'
import { $color, $usedColors, addUsedColor, setColor } from '../../store/colorPickerModel';
import ArtModal from '../ArtModal/ArtModal';
import SavedColor from '../SavedColor/SavedColor';

interface IArea {
    oldCanvas?: {
        color: string
        size: number
    }[][]
}

const Area: React.FC<IArea> = ({oldCanvas}) => {
    const [nameInput, setNameInput] = useState('Первый рисунок')
    const color = useStore($color)
    const usedColors = useStore($usedColors)
    const canvasSize = useStore($canvasSize)
    const [mouseDown, setMouseDown] = useState(false)
    const [isModal, setIsModal] = useState(false)


    const modalHandler = () => {
        if(isModal) setIsModal(false)
        else setIsModal(true)
    }

    
    const canvasRef = useRef() as React.MutableRefObject<HTMLDivElement>

    
    const {canvas} = useStore($canvas)
    
    
    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.currentTarget.value)
    
    const colorHandler = (e: any) => {
        if(!usedColors.includes(color)) {
            addUsedColor(e.currentTarget.children[0].children[0].children[0].children[0].style.backgroundColor)
        }
    }

    const painter = (x: number, y: number, cur: string) => {
        if (cur !== color) {
            if(mouseDown) paint({color, cords: [x, y]})
        }
    }


    useEffect(() => {
        if(oldCanvas) setCanvas(oldCanvas)
        else setNewCanvas([canvasSize, canvasRef.current.clientWidth])
    }, [canvasSize, oldCanvas])


    useEffect(() => {
        const enable = () => setMouseDown(true)
        window.addEventListener('mousedown', enable, {once: true})
        return () => window.removeEventListener('mousedown', enable)
    })
    useEffect(() => {
        const disable = () => setMouseDown(false)
        window.addEventListener('mouseup', disable, {once: true})
        return () => window.removeEventListener('mousedown', disable)
    })

    return <>
        {isModal? <ArtModal func={modalHandler}/> : <></>}
        <div className={css.closeBackground}></div>
        <div className={css.wrapper}>
            <div ref={canvasRef} className={css.canvas}>
                {canvas.map((row, i) => {
                    return <div key={i} className={css.row}>
                        {row.map((cell, j) => <div className={css.cell} 
                        onMouseMove={() => {painter(i, j, cell.color)}}
                        onMouseDown={() => {paint({color, cords: [i, j]})}}
                        key={j} 
                        style={{backgroundColor: cell.color, width: cell.size, height: cell.size}}></div>)}
                    </div>
                })}
            </div>
            <div className={css.toolsWrapper}>
                <div className={css.tools}>
                    <input onChange={nameHandler} value={nameInput} className={css.nameInput}/>
                    <div className={css.colorPalette}>
                        {usedColors.map((color, i) => {
                            return <SavedColor
                            key={i}
                            color={color}
                            setColor={setColor}/>
                        })}
                    </div>
                    <HexColorPicker color={color} onChange={setColor} onMouseUp={colorHandler}/>
                </div>
                <div onClick={modalHandler} className={css.preview}>
                {canvas.map((row, i) => {
                    return <div key={i} className={css.row}>
                        {row.map((cell, j) => <div className={css.cell}
                        key={j} 
                        style={{backgroundColor: cell.color, width: '10px', height: '10px'}}></div>)}
                    </div>
                })}
                </div>
            </div>
        </div>
    </>
}

export default Area