import React, {useContext, useRef} from 'react'
import classes from "./Hall.module.scss"
import GuestContext from '../store/context-guest';
import SquareTable from './SquareTable';
import backgroundImage from "../images/floor6.png"

const Hall = () => {
  const ctx = useContext(GuestContext);
  const hallRef = useRef<HTMLDivElement>(null);


  return (
    <div className={classes.container} >
      <div className={classes.main} ref={hallRef} style={ctx.darkMode ? { backgroundImage: `url(${backgroundImage})` } : {}}>
        {ctx.tables.map((table, index) => {
          return (
            <SquareTable table={table} hall={hallRef} id={table.id} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Hall