import classNames from "classnames"
import { useState } from "react"
import { IArts } from "../store/canvasMode"
import css from './../components/LevelSelect/LevelSelect.module.sass'


export const useShowProjects = (projects: IArts, openFunc: Function) => {
    const [selectedProject, setSelectedProject] = useState(0)

    
    if(!selectedProject) {
        return [
            {name: '', id: -1, classes: '', func: () => {}}, 
            {...projects[selectedProject], classes: classNames(css.project, css.midlle), func: () => (openFunc(selectedProject))}, 
            {...projects[selectedProject+1], classes: classNames(css.project, css.right), func: () => (setSelectedProject(selectedProject+1))}
        ]
    }
    else if (selectedProject === projects.length-1) return [
        {name: '', id: -1, classes: '', func: () => {}},
        {...projects[selectedProject], classes: classNames(css.project, css.midlle), func: () => (openFunc(selectedProject))}, 
        {...projects[selectedProject-1], classes: classNames(css.project, css.left), func: () => (setSelectedProject(selectedProject-1))}, 
    ]
    else return [
        {...projects[selectedProject-1], classes: classNames(css.project, css.left), func: () => (setSelectedProject(selectedProject-1))}, 
        {...projects[selectedProject], classes: classNames(css.project, css.midlle), func: () => (openFunc(selectedProject))}, 
        {...projects[selectedProject+1], classes: classNames(css.project, css.right), func: () => (setSelectedProject(selectedProject+1))}
    ]
}