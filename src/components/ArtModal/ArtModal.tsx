import { useStore } from 'effector-react'
import { useState } from 'react'
import { $canvas } from '../../store/canvasMode'
import css from './ArtModal.module.sass'



const ArtModal: React.FC<{func: () => void}> = ({func}) => {

    const {canvas} = useStore($canvas)
    const [anim, setAnim] = useState('')

    const animate = (e: any) => {
        let cursTop = e.clientY / (e.currentTarget.offsetHeight / 90),
            cursLeft = e.clientX / (e.currentTarget.offsetWidth / 90)
        const topDeg = (160/100 * cursTop)
        const leftDeg = (180/100 * cursLeft)
        const minSide = (e.currentTarget.offsetHeight < e.currentTarget.offsetWidth)? e.currentTarget.offsetHeight : e.currentTarget.offsetWidth
        const scale = (minSide / 100 * 70) / e.currentTarget.children[0].offsetHeight
        setAnim(`rotateX(${(topDeg <= 90)? 360-(80 - topDeg) : 360-(90 - topDeg)}deg) rotateY(${(leftDeg <= 90)? 360-(80 - leftDeg) : 360-(90 - leftDeg)}deg) scale(${scale})`)
    }

    return <>
        <div onClick={func} onMouseMove={animate} className={css.background}>
            <div style={{transform: anim}} className={css.preview}>
                {canvas.map((row, i) => {
                    return <div key={i} className={css.row}>
                        {row.map((cell, j) => <div className={css.cell}
                        key={j} 
                        style={{backgroundColor: cell.color, width: '20px', height: '20px'}}></div>)}
                    </div>
                })}
            </div>
        </div>
    </>
}

export default ArtModal