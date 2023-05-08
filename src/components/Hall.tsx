import React, {useContext, useRef} from 'react'
import classes from "./Hall.module.scss"
import GuestContext from '../store/context-guest';
import SquareTable from './SquareTable';

const Hall = () => {

  const ctx = useContext(GuestContext)
  const hallRef = useRef<HTMLDivElement>(null)

  console.log(ctx.tables)

  return (
    <main className={classes.main} ref={hallRef}>
        {ctx.tables.map((table, index)=>
          {
            return <SquareTable table ={table} hall={hallRef} id={table.id} key={index}/> 
          })}
    </main>
  )
}

export default Hall