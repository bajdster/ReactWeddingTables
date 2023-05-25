import React, { useState } from 'react';
import classes from './Seat.module.scss';
import { Droppable } from 'react-beautiful-dnd';
import GuestItem from './GuestItem';
import { ImCross } from 'react-icons/im';

const Seat: React.FC<{
  id: number;
  name: string;
  group: string;
  tableId: string;
  onGuestSeatHandle: (e: MouseEvent) => void;
  style: {};
}> = (props) => {
  const [disabledSeat, setDisabledSeat] = useState<boolean>(false);

  const disableSeat = () => {
    if(props.name) return 
    setDisabledSeat((prev) => {
      return !prev;
    });
  };

  return (
    <div>
      {disabledSeat ? (
        <div className={classes.inactiveSeat} onDoubleClick={disableSeat}><ImCross/></div>
      ) : (
        <Droppable droppableId={`${props.tableId}_${props.id}`}>
          {(provided: any, snapshot: any) => (
            <div
              className={`${classes.seat} ${snapshot.isDraggingOver ? classes.dragActive : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={props.style}
              onDoubleClick={disableSeat}
            >
              {props.name && (
                <GuestItem
                  guestContent={props.name}
                  id={props.name}
                  index={props.id}
                  onGuestSeatHandler={props.onGuestSeatHandle}
                  group={props.group}
                />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default Seat;
