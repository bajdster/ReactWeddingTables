import React from 'react'
import classes from "./Seat.module.scss";
import { Droppable } from 'react-beautiful-dnd';
import GuestItem from './GuestItem';

const Seat:React.FC<{id:number, name: string, group:string, tableId:string, onGuestSeatHandle:(e:MouseEvent)=> void, style:{}}> = (props) => {

  return (
    <Droppable droppableId={`${props.tableId}_${props.id}`}>
        {
          
          (provided:any, snapshot:any)=>(
            <div className={`${classes.seat} ${snapshot.isDraggingOver?classes.dragActive: ''}`} ref={provided.innerRef}{...provided.droppableProps}
            style={props.style}>
            {props.name && <GuestItem guestContent={props.name} id={props.name} index={props.id} onGuestSeatHandler = {props.onGuestSeatHandle} group={props.group}/>}
              
            {provided.placeholder} 
            </div>
            
          )
           
        }
        
        

        
    </Droppable>
  )
}

export default Seat

//check on movie how is coded destination div and its parameters