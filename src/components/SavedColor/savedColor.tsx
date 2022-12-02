import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { deleteUsedColor, replaceColor } from '../../store/colorPickerModel'
import './SavedColor.css'
import { replaceCanvasColor } from '../../store/canvasMode'

interface IsavedColor {
    color: string
    setColor: Function
}

const SavedColor: React.FC<IsavedColor> = ({color, setColor}) => {
    const [replacedColor, setReplacedColor] = useState(color)
    const [isOpen, setIsOpen] = useState(false)

    const changeReplaceColor = (newColor: string) => {
        setReplacedColor(newColor)
        replaceColor({oldColor: color, newColor})
        replaceCanvasColor({oldColor: color, newColor})
    }

    return <> 
        {isOpen? <HexColorPicker color={replacedColor} onChange={changeReplaceColor} onMouseLeave={() => {setIsOpen(false)}} className='fff' style={{
            position: 'absolute',
            width: 300,
            height: 300
        }}/> : <></>}
        <div onClick={() => setColor(color)} className={'color'} style={{backgroundColor: color}}>
            <div className={'deleteButton'} onClick={() => {deleteUsedColor(color)}}/>
            <div onClick={() => {setIsOpen(true)}} className={'replaceButton'}/>
        </div>
    </>
}

export default SavedColor