import classNames from 'classnames'
import { useEffect, useState } from 'react'
import Area from '../Area/Area'
import CanvasSettings from '../CanvasSettings/CanvasSettings'
import css from './App.module.sass'

const App = () => {
    const [buttonStyle, setButtonStyle] = useState(css.start)
    const [isOpen, setIsopen] = useState(false)
    const [promt, setPromt] = useState(<></>)

    useEffect(() => {
        setTimeout(() => {
            setPromt(<div className={css.promt}>Чего ты ждёшь? Нажимай!</div>)
        }, 3000)
    }, [])

    const buttonHandler = () => {
        setButtonStyle(classNames(css.start, css.open))
        setTimeout(() => {
            setIsopen(true)
        }, 400)
    }


    return <>
        {!isOpen? <button onClick={buttonHandler} type='button' className={buttonStyle}>{promt}</button> 
        :
        <CanvasSettings/>}
    </>
}

export default App