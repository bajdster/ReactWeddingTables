import React, {useContext} from 'react'
import classes from "./Hall.module.scss"
import GuestContext from '../store/context-guest';
import SquareTable from './SquareTable';

const Hall = () => {

  const ctx = useContext(GuestContext)

  return (
    <main className={classes.main}>
        {ctx.tables.map(table=>
          {
            return <SquareTable table ={table}/> 

            // <>
            // <div>{table.name}</div>
            // {table.seats}
            // </>;
          })}
    </main>
  )
}

export default Hall