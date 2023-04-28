import React, { useContext } from "react";
import { MdTableBar, MdTableRestaurant } from "react-icons/md";
import GuestContext from "../store/context-guest";
import GuestItem from "./GuestItem";
import { Droppable } from 'react-beautiful-dnd';

import classes from "./AsideMenu.module.scss";

interface Props {
  openFormHandler: () => void;
  openTableFormHandler: ()=> void;
}

const AsideMenu: React.FC<Props> = ({ openFormHandler, openTableFormHandler}) => {
  const ctx = useContext(GuestContext);

  const addSquareTable = () =>
  {
    openTableFormHandler();
  }

  return (
    
        <aside className={classes.asideMenu}>
          
            
                
                <div className={classes.tables}>
                <h3>Add table</h3>
                <button>
                  <MdTableBar />
                </button>
                <button onClick={addSquareTable}>
                  <MdTableRestaurant />
                </button>
              </div>
              
              <Droppable droppableId="asideMenu">
                {
              (provided:any)=>(
              <div className={classes.guestList}>
                <h3>Guest list</h3>
                <button onClick={openFormHandler}>Add Guest</button>
                
                <ul className={classes.guestListBox} ref={provided.innerRef} {...provided.droppableProps}>
                  {ctx.guests.map((guest, index) => (
                    <React.Fragment key={`${guest.name}${index}`}>
                      <GuestItem guestContent = {guest.name} id={`${guest.name}${index}`} index={index} />
                      {guest.partner && <GuestItem guestContent={guest.partner} id={`${guest.name}${index}`} index={index} />}
                      {guest.children?.map((child, childIndex) => (
                        <GuestItem guestContent={child.name} id={`${guest.name}${childIndex}`} index={childIndex} />
                      ))}
                    </React.Fragment>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
              
              )
            }
         
          </Droppable>
        </aside>
      
    
  );
};

export default AsideMenu;
