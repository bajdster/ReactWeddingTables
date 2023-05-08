import React from 'react'
import classes from "./Seat.module.scss";
import { Droppable } from 'react-beautiful-dnd';
import GuestItem from './GuestItem';

const Seat:React.FC<{id:number, name: string, tableId:string, onGuestSeatHandle:(e:MouseEvent)=> void}> = (props) => {

  return (
    <Droppable droppableId={`${props.tableId}_${props.id}`}>
        {
          
          (provided:any)=>(
            <div className={classes.seat} ref={provided.innerRef}{...provided.droppableProps}
            >
            {props.name && <GuestItem guestContent={props.name} id={props.name} index={props.id} onGuestSeatHandler = {props.onGuestSeatHandle}/>}
              
            {provided.placeholder} 
            </div>
            
          )
           
        }
        
        

        
    </Droppable>
  )
}

export default Seat

//check on movie how is coded destination div and its parameters