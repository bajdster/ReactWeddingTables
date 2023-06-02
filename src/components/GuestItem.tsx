import React, { useContext, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import classes from './GuestItem.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import GuestContext from '../store/context-guest';

const GuestItem: React.FC<{
  guestContent: string;
  id: string;
  index: number;
  onGuestSeatHandler?: (e: MouseEvent) => void;
  group?: string;
}> = (props) => {
  const ctx = useContext(GuestContext);
  const [isDeleteButtonOpen, setIsDeleteButtonOpen] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const dragStartHandler = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setMouseOffset({ x: offsetX, y: offsetY });

    if (props.onGuestSeatHandler) {
      props.onGuestSeatHandler(e.nativeEvent);
    }

    if(props.group) ctx.getGroup(props.group)
  };

  const showDeleteButton = () =>
  {
    setIsDeleteButtonOpen((prev)=> !prev);
  }

  const removeGuest = () =>
  {
    ctx.deleteGuest(props.id)
  }

  return (
    <Draggable draggableId={props.id} index={props.index} key={props.id}>
      {(provided: any) => (
        <li
          className={classes.circle}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // group={props.group}
          onMouseDown={dragStartHandler}
          
          style={{
            ...provided.draggableProps.style,
            // position: 'fixed',
            top: provided.draggableProps.style.y - mouseOffset.y,
            left: provided.draggableProps.style.x - mouseOffset.x,
           backgroundColor: props.group === "Bride" ? "rgb(187, 56, 56)" : props.group === "Groom"? "rgb(70, 70, 173)" : "rgb(182, 150, 60)"
          }}
        >
          <BsPersonCircle />
          <div className={classes.description} onDoubleClick={showDeleteButton} style={{fontSize: props.guestContent.length > 20 ? '10px' : '13px',  backgroundColor: ctx.darkMode ?"black": "", color: ctx.darkMode ? "white": ""}}>
            {props.guestContent}
          </div>
          {isDeleteButtonOpen && <div className={classes.deleteGuestButton} onClick={removeGuest}>
            <TiDelete/>
          </div>}
        </li>
      )}
    </Draggable>
  );
};

export default GuestItem;