import React from 'react'
import classes from "./Seat.module.scss";
import { Droppable } from 'react-beautiful-dnd';

const Seat:React.FC<{id:number, index: number}> = (props) => {


  return (
    <Droppable droppableId={`seat${props.id}`}>
        {
          (provided:any)=>(
            <div className={classes.seat} ref={provided.innerRef}{...provided.droppableProps}>Seat
            {provided.placeholder} 
            </div>
            
          )
           
        }
        

        
    </Droppable>
  )
}

export default Seat

//draggables must always be rendered in a droppable