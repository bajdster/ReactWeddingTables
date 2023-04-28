import React from 'react'
import classes from "./Seat.module.scss";
import { Droppable } from 'react-beautiful-dnd';

const Seat:React.FC<{id:number, index: number}> = (props) => {

  return (
    <Droppable droppableId={`seat${props.id}`} index={props.index}>
        {
          
          (provided:any)=>(
            <div className={classes.seat} ref={provided.innerRef}{...provided.droppableProps}>
              {props.index}
            {provided.placeholder} 
            </div>
            
          )
           
        }
        
        

        
    </Droppable>
  )
}

export default Seat

//check on movie how is coded destination div and its parameters