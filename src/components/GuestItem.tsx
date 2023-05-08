import React, {useContext, useState} from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import classes from "./GuestItem.module.scss"
import { Draggable } from 'react-beautiful-dnd'
import GuestContext from '../store/context-guest'

const GuestItem:React.FC<{guestContent:string, id:string, index:number, onGuestSeatHandler?: (e:MouseEvent)=> void}> = (props) => {

  const ctx = useContext(GuestContext)
  const [visible, setVisible] = useState<{}>()
  

  const dragFunction = (e: MouseEvent) => {
    console.log('drag is rolling');
    if (props.onGuestSeatHandler) {
      props.onGuestSeatHandler(e);
    }
    // setVisible({visibility: 'hidden'})
  };



//whole secret was using key as draggableId in draggable
   return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided:any) => (
        <li
          className={classes.circle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseDown={dragFunction}
          style = {{...provided.draggableProps.style, ...visible}}
        >
          <BsPersonCircle />
          <div className={classes.description}>{props.guestContent}</div>
        </li>
      )}
    </Draggable>
  )
}

export default GuestItem

//problem z umiejscowieniem GuestItem przt drag ma zwiazek z przesuwaniem table