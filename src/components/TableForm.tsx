import React, {useRef, useState, useContext, useEffect} from 'react'
import classes from "./TableForm.module.scss"
import {AiOutlineCloseSquare} from "react-icons/ai"
import GuestContext from '../store/context-guest'

const TableForm:React.FC<{openTableFormHandler:()=> void}> = (props) => {

    const tableName = useRef<HTMLInputElement>(null)
    const tableGuestAmount = useRef<HTMLInputElement>(null)
    const ctx = useContext(GuestContext)

    const [seats, setSeats] =  useState<JSX.Element[]>([]);

    const handleButtonClick = (e:React.FormEvent) => {
        e.preventDefault();
        const seatsValue = Number(tableGuestAmount.current?.value);
        // const table = String(tableName.current?.value);

        const newSeats:JSX.Element[] = Array.from({ length: seatsValue }, (_, i) => <div key={i}>Div {i+1}</div>);
        console.log(newSeats)
        console.log(tableName)
        setSeats(newSeats);

        // ctx.addTable({name: table, seats: seats})
      }

      useEffect(()=>
      {
        if(seats.length === 0)
        {
            return;
        }
        const table = String(tableName.current?.value);
        ctx.addTable({name: table, seats: seats})

      },[seats])


  return (
    <div className={classes.tableForm}>
        <form onSubmit={handleButtonClick}>
            <h2>Add table</h2>
            <div className={classes.inputBox}>
                <div className={classes.inputField}>
                        <label htmlFor="tableName">Table name</label>
                        <input type="text" id="tableName" ref={tableName}></input>
                </div>
            </div>
            <div className={classes.inputBox}>
                <div className={classes.inputField}>
                    <label htmlFor="guestAmount">Guest Amount</label>
                    <input type="number" id="guestAmount" min="1" max="100" ref={tableGuestAmount}></input>
                </div>
            </div>

            <button>Add</button>

            <div className={classes.closeWindow}>
                <AiOutlineCloseSquare className={classes.closeButton} onClick={props.openTableFormHandler}/>
            </div>
            
        </form>

    </div>
  )
}

export default TableForm