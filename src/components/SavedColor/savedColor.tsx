import css from './SavedColor.module.sass'

interface IsavedColor {
    color: string
    setColor: Function
}

const SavedColor: React.FC<IsavedColor> = ({color, setColor}) => {
    return <div onClick={() => setColor(color)} className={css.color} style={{backgroundColor: color}}>

    </div>
}

export default SavedColor