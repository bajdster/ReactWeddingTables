import React, { useRef, useState, useEffect, useContext} from "react";
import { createPortal } from "react-dom";
import classes from "./SquareTable.module.scss";
import Table from "../models/Table";
import {BiRefresh} from "react-icons/bi"
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import Seat from "./Seat";
import GuestContext from "../store/context-guest";
import {v4 as uuidv4} from 'uuid';
import {AiOutlineCloseSquare} from "react-icons/ai"

import ChangeTableNameForm from "./ChangeTableNameForm"


const SquareTable: React.FC<{ table: Table, hall:React.RefObject<HTMLDivElement>, id:string}> = (props) => {

  const ctx = useContext(GuestContext)
  const [isTableNameFormOpen, setIsTableNameFormOpen] = useState<boolean>(false)
  const [newTableName, setNewTableName] = useState<string | number>(props.table.name)
  const [newGuestAmount, setNewGuestAmount] = useState<string | number>(props.table.seats.length)
  let tables = ctx.tables, guests = ctx.guests

  const seats = props.table.seats;

  const tableRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);
  const [sendCoords, isSendCoords] = useState<boolean>(false)

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({startX: props.table.startX ?? 0,
    startY: props.table.startY ?? 0, lastX: props.table.lastX ?? 0, lastY: props.table.lastY ?? 0})


  const [rotation, setRotation] = useState<number>(props.table.rotation);



  const rotateTableHandler = () => {
    setRotation((prevRotation) => prevRotation + 90);
    const table = tableRef.current;
    if (table && table.style.top && parseInt(table.style.top) < 100) {
      table.style.top = "10px";
    }
    if (table && table.style.left && parseInt(table.style.left) < 0) {
      table.style.left = "10px";
    }
  };

  useEffect(()=>
  {
    const table = tableRef.current;
    if(table)
    {

      table.style.top = `${props.table.y}px`;
      table.style.left = `${props.table.x}px`;
    }   

  }, [])

  //send rotation of table to DB
  useEffect(()=>
  { 

    const tableId = props.table.id;
    const updatedTables = tables.map(table=>
      {
        if(table.id === tableId)
        {
          return {...table, rotation: rotation}
        }
        else return table
      })

      console.log(updatedTables)

      ctx.updateTables(updatedTables)
  }, [rotation])

  //send table position to DB
  //seems to work but performence issues
  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      const tableId = props.table.id;
      const nextY = parseInt(table.style.top);
      const nextX = parseInt(table.style.left);
      
      const updatedTables = tables.map((table) => {
        if (table.id === tableId) {
          return {
            ...table,
            x: nextX,
            y: nextY,
            startX: coords.current.startX,
            startY: coords.current.startY,
            lastX: coords.current.lastX,
            lastY: coords.current.lastY,
            rotation: rotation
          };
        } else {
          return table;
        }
      });
  
      console.log(updatedTables);
      ctx.updateTables(updatedTables);
    }
  }, [sendCoords]);


  useEffect(()=>
  {
    if(ctx.canTableDrag)
    {
      if(!tableRef.current || !props.hall.current) return;

      const table = tableRef.current;
      const hall = props.hall.current; 
      

      const onMouseDown = (e: MouseEvent) =>
      {
        e.preventDefault()
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;

      }
      const onMouseUp = (e: MouseEvent) =>
      {
        e.preventDefault()
        isClicked.current = false;
        coords.current.lastX = table.offsetLeft;
        coords.current.lastY = table.offsetTop;

        isSendCoords((prev)=>
        {
          return !prev
        })
        

      }
      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        if (isClicked.current) 
        {
          if (!props.hall.current || !tableRef.current) return;
      
          if (!hall.contains(e.target as Node) || !table.contains(e.target as Node)) return;
      
          const nextX = e.clientX - coords.current.startX + coords.current.lastX;
          const nextY = e.clientY - coords.current.startY + coords.current.lastY;

          
      
          table.style.top = `${nextY}px`;
          table.style.left = `${nextX}px`;

        }


      };

      const onMouseLeave = (e: MouseEvent) =>
      {
        e.preventDefault()
        isClicked.current = false;
      }

      
      table.addEventListener('mousedown', onMouseDown)
      table.addEventListener('mouseup', onMouseUp)
      table.addEventListener('mousemove', onMouseMove)
      table.addEventListener('mouseleave', onMouseLeave);
      // table.addEventListener('mouseover', onMouseUp)

      const cleanup = () =>
      {
        table.removeEventListener('mousedown', onMouseDown)
        table.removeEventListener('mouseup', onMouseUp)
        table.removeEventListener('mousemove', onMouseMove)
        table.removeEventListener('mouseleave', onMouseLeave)
        // table.addEventListener('mouseover', onMouseUp)
      }
      

      return cleanup;
    }
      
      
    }, [ctx.canTableDrag])

    //finally its help that after drop on Seat table doesnt follow cursor
    //still problem when you drop on hall, table still walking
    const onSeatMouseUp = (e: MouseEvent) =>
    {
      // console.log("tu onmouseup ")
      e.preventDefault()
      isClicked.current = false;
    }

    const deleteTableHandler = ()=>
    {
      let confirm = window.confirm("Do you really want to delete this table?")
      if(confirm)
      {
        const searchedTable = tables.filter(table=>
          {
            return table.id === props.id
          })
  
  
          const tableGuests = searchedTable[0].seats.filter(seat=>
            {
              return seat.name!==''
            })
  
          const guestToLobby = tableGuests.map(guest=>
            {
              return {name:guest.name, id: uuidv4(), group: guest.group}
            })
  
            guests = [...guests, ...guestToLobby] 
  
            const filteredTables = tables.filter(table=>
              {
                return table.id !== props.id
              })
            ctx.updateGuests(guests)
            ctx.updateTables(filteredTables)
      }
      
    }

    const openEditTableNameForm = () =>
    {
      setIsTableNameFormOpen((prev)=>
      {
        return !prev;
      })
    }

    const changeNewTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTableName(e.target.value);
    };
    
    const changeNewGuestAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewGuestAmount(e.target.value);
    };

    const changeTable = (e: React.FormEvent) => {
      e.preventDefault();
      // console.log(newTableName);

      const updatedTables = tables.map(table=>
        {
          if(table.id === props.id)
          {
            table.name = newTableName;
            const actualAmount = table.seats.length;
            const newSeats = [...table.seats]

            if(actualAmount > Number(newGuestAmount))
            {
              //decrease (two arrays)
              const decreased = newSeats.slice(0, Number(newGuestAmount))
              const toLobby = newSeats.slice(Number(newGuestAmount))

              table = {...table, seats: decreased}
              
              toLobby.forEach(guest=>
                {
                  guests.push(guest);
                })
              
            }
            else if (actualAmount < Number(newGuestAmount)) 
            {
              //increase (add to array)
              const diff = Number(newGuestAmount) - actualAmount

              for(let i = 0; i<diff; i++)
              {
                newSeats.push({name:"", id: uuidv4(), group: ""})
              }
              table = {...table, seats: newSeats}
            }
            
            return table
          }
          else return table

        })

        //there you can edit your table guests amount

        

        ctx.updateTables(updatedTables)
        openEditTableNameForm()
    };

    //didnt work turn on input and edit name
    return (
      <>
      {isTableNameFormOpen && (
                <div className={classes.tableNameFormModal}>  
               
                  <form className={classes.tableNameForm} onSubmit={changeTable} style={{top:`${coords.current.lastY}px`}}>

                  <div className={classes.closeButton}>
                    <AiOutlineCloseSquare onClick = {openEditTableNameForm}/>
                  </div>
                    <input type="text" defaultValue={newTableName} onChange={changeNewTableName} />
                   
                    <label htmlFor="guestAmount">Guest Amount</label>
                    <input type="number" id="guestAmount" min="2" max="100" step="2" defaultValue={newGuestAmount} onChange={changeNewGuestAmount}></input>

                    <button>Change table</button>
                  </form>
                </div>)}

        <div
          className={classes.tableBox}
          style={{
            width: seats.length / 2 * 60,
            transform: `rotate(${rotation}deg)`
          }}
          ref={tableRef}
        >
          
            <div className={classes.table}>
              <span style={{transform: String(props.table.name).length < 2 ? `rotate(${-rotation}deg)`: "none"}}>
              {props.table && props.table.name ? props.table.name : ''}
              </span>
            
              {seats.map((seat, index) => {
              if (!seat) {
                return; // lub obsłuż ten przypadek w inny sposób
              }
              
              return (
                <Seat
                  id={index}
                  key={index}
                  name={seat.name}
                  tableId={props.id}
                  onGuestSeatHandle={onSeatMouseUp}
                  group={seat.group}
                  style={{ transform: `rotate(${-rotation}deg)` }}
                />
              );
            })}
            </div>


          <div className={classes.options}>
            <button onClick={rotateTableHandler} style={{transform: `rotate(${rotation}deg)`}}><BiRefresh/></button>
            <button style={{transform: `rotate(${-rotation}deg)`}} onClick={deleteTableHandler}><AiFillDelete/></button>
            <button style={{transform: `rotate(${-rotation}deg)`}} onClick ={openEditTableNameForm}><AiFillEdit/></button>
          </div>
        </div>
      </>
    );
};

export default SquareTable;