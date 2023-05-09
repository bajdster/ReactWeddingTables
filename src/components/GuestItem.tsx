import React, { useContext, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import classes from './GuestItem.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import GuestContext from '../store/context-guest';

const GuestItem: React.FC<{
  guestContent: string;
  id: string;
  index: number;
  onGuestSeatHandler?: (e: MouseEvent) => void;
}> = (props) => {
  const ctx = useContext(GuestContext);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const dragStartHandler = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setMouseOffset({ x: offsetX, y: offsetY });

    if (props.onGuestSeatHandler) {
      props.onGuestSeatHandler(e.nativeEvent);
    }
  };

  return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided: any) => (
        <li
          className={classes.circle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseDown={dragStartHandler}
          style={{
            ...provided.draggableProps.style,
            // position: 'fixed',
            top: provided.draggableProps.style.y - mouseOffset.y,
            left: provided.draggableProps.style.x - mouseOffset.x,
          }}
        >
          <BsPersonCircle />
          <div className={classes.description}>{props.guestContent}</div>
        </li>
      )}
    </Draggable>
  );
};

export default GuestItem;
