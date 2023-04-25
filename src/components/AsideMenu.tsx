import React, { useContext } from "react";
import { MdTableBar, MdTableRestaurant } from "react-icons/md";
import GuestContext from "../store/context-guest";
import GuestItem from "./GuestItem";

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
      <div className={classes.guestList}>
        <h3>Guest list</h3>
        <button onClick={openFormHandler}>Add Guest</button>
        <ul className={classes.guestListBox}>
          {ctx.guests.map((guest) => (
            <>
              <GuestItem guestContent = {guest.name}/>
              
              {guest.partner && <GuestItem guestContent={guest.partner}/>}
              {guest.children?.map((child) => (
                <GuestItem guestContent={child.name}/>
              ))}
            </>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AsideMenu;
