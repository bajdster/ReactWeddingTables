import React, {useContext, useRef} from 'react'
import classes from "./Hall.module.scss"
import GuestContext from '../store/context-guest';
import SquareTable from './SquareTable';

const Hall = () => {

  const ctx = useContext(GuestContext)
  const hallRef = useRef<HTMLDivElement>(null)

  return (
    <main className={classes.main} ref={hallRef}>
        {ctx.tables.map(table=>
          {
            return <SquareTable table ={table} hall={hallRef} id={table.id}/> 
          })}
    </main>
  )
}

export default Hall