import React, {useContext} from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import classes from "./GuestItem.module.scss"
import { Draggable } from 'react-beautiful-dnd'
import GuestContext from '../store/context-guest'

const GuestItem:React.FC<{guestContent:string, id:string, index:number}> = (props) => {

  const ctx = useContext(GuestContext)

//whole secret was using key as draggableId in draggable
   return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided:any) => (
        <li
          className={classes.circle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <BsPersonCircle />
          <div className={classes.description}>{props.guestContent}</div>
        </li>
      )}
    </Draggable>
  )
}

export default GuestItem