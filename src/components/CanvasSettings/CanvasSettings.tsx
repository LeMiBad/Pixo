import { useState } from 'react'
import { setCanvasSize } from '../../store/canvasMode'
import Area from '../Area/Area'
import css from './CanvasSettings.module.sass'

const CanvasSettings = () => {
    const [sizeInput, setSizeInput] = useState(3)
    const [isEnd, setIsEnd] = useState(false)
    

    const sizeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSizeInput(+e.currentTarget.value)

    const acceptSizeInput = () => {
        setCanvasSize(sizeInput)
        setIsEnd(true)
    }

    return <>
        {!isEnd? <>
            <div className={css.background}>
            </div>
            <div className={css.rangeWrapper}>
                <h1>Размер поля будет: {sizeInput} на {sizeInput} pixels</h1>
                <input className={css.range} value={sizeInput} onChange={sizeInputHandler} min={3} max={64} type={'range'}/>
                <button onClick={acceptSizeInput} type='button'>Далее</button>
            </div>
        </> 
        : 
        <Area/>}
    </>
}

export default CanvasSettings