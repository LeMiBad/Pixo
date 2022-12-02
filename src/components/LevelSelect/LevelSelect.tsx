import css from './LevelSelect.module.sass'
import {ReactElement, useState} from "react"
import { useShowProjects } from '../../hooks/useShowProjects'
import { useStore } from 'effector-react'
import { $atrs } from '../../store/canvasMode'
import CanvasSettings from '../CanvasSettings/CanvasSettings'
import Area from '../Area/Area'

function LevelSelect() {
	const [name, setName] = useState('')
	const projects = useStore($atrs)
	const [isNew, setIsNew] = useState<null | ReactElement>(null)
	
	const openProject = (id: number) => {
		if(id === projects.length) {
			setIsNew(<CanvasSettings/>)
		}
		else {
			setIsNew(<Area oldCanvas={projects[id].art?.canvas}/>)
		}
	}
	
	
	const showProjects = useShowProjects([...projects, {name: 'Новый', id: -2}], openProject)
	
	
	return (
		<>
			{!isNew? <>
				<div className={css.background}/>
				<input className={css.nameInput} value={name} onChange={(e) => setName(e.currentTarget.value)}/>
				{showProjects.map(({name, id, classes, func}) => {
					return 	(id !== -1)? <div onClick={func} key={id} className={classes}>
								<h1>{name}</h1>
							</div>
							:
							null
				})}
			</> 
			: 
			isNew}
		</>
	);
}

export default LevelSelect