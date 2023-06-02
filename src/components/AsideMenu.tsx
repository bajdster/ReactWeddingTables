import React, { useContext, useState } from "react";
import { MdTableBar, MdTableRestaurant, MdOutlineMenuOpen } from "react-icons/md";
import GuestContext from "../store/context-guest";
import GuestItem from "./GuestItem";
import { Droppable } from 'react-beautiful-dnd';

import classes from "./AsideMenu.module.scss";

interface Props {
  openFormHandler: () => void;
  openTableFormHandler: ()=> void;
  openGuestImport: ()=> void;
}

const AsideMenu: React.FC<Props> = ({ openFormHandler, openTableFormHandler, openGuestImport}) => {
  const ctx = useContext(GuestContext);
  const [isMenuClosed, setIsMenuClosed] = useState<boolean>(false)

  const addSquareTable = () =>
  {
    openTableFormHandler();
  }

  const menuCloseHandler = () =>
  {
    setIsMenuClosed((prev)=>
    {
      return !prev;
    })
  }


  //its time to add implementation of CSV parsing from file
  return (
    
        <aside className={`${classes.asideMenu} ${isMenuClosed? classes.menuClosed : ""}`}  style={ { backgroundColor: ctx.darkMode ? "rgb(35,38,38)": "", color: ctx.darkMode ? "grey" : "" }} >
          
            <div className={classes.showMenu} onClick={menuCloseHandler} style={isMenuClosed ? {transform: `rotate(180deg)`, transition:'all .5s ease'}: {}}>
              <MdOutlineMenuOpen/>
            </div>
            
                
                <div className={classes.tables}>
                <h3>Add table</h3>
                <button onClick = {()=>{window.alert("Option temporarily unavailable")}}>
                  <MdTableBar />
                </button>
                <button onClick={addSquareTable}>
                  <MdTableRestaurant />
                </button>
              </div>
              
              <Droppable droppableId="asideMenu">
                {
              (provided:any, snapshot:any)=>(
              <div className={classes.guestList}>
                <div className={classes.guestAdd}>
                  <h3>Guest list</h3>
                  <p>Guests: {ctx.guests.length}</p>
                  <div className={classes.addGuestButtons}>
                    <button onClick={openFormHandler}>Add Guest</button>

                    <button onClick={openGuestImport}>
                      Import Guests
                    </button>
                  </div>
                  
                </div>
                
                <ul className={`${classes.guestListBox} ${snapshot.isDraggingOver?classes.dragActive: ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                  {ctx.guests.map((guest, index) => (
                    <React.Fragment key={`${guest.name}${index}`}>
                      {guest.name && <GuestItem guestContent = {guest.name} id={guest.name} index={index} group={guest.group} />}

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