import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import classes from "./GuestItem.module.scss"
import { Draggable } from 'react-beautiful-dnd'

const GuestItem:React.FC<{guestContent:string, id:string, index:number}> = (props) => {

    // let circleColor;

    // if(props.content === "gues")

   return (
    <Draggable draggableId={props.id} index={props.index}>
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