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
  let tables = ctx.tables, guests = ctx.guests

  const seats = props.table.seats;

  const tableRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({startX:0, startY: 0, lastX: 0, lastY:0})


  const [rotation, setRotation] = useState<number>(0);




  const rotateTableHandler = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

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
      }
      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        if (isClicked.current) {
          if (!props.hall.current || !tableRef.current) return;
      
          const hall = props.hall.current;
          const table = tableRef.current;
      
          if (!hall.contains(e.target as Node) || !table.contains(e.target as Node)) return;
      
          const nextX = e.clientX - coords.current.startX + coords.current.lastX;
          const nextY = e.clientY - coords.current.startY + coords.current.lastY;
      
          table.style.top = `${nextY}px`;
          table.style.left = `${nextX}px`;
        }
      };

      
      table.addEventListener('mousedown', onMouseDown)
      table.addEventListener('mouseup', onMouseUp)
      table.addEventListener('mousemove', onMouseMove)
      table.addEventListener('mouseleave', onMouseUp);
      // table.addEventListener('mouseover', onMouseUp)

      const cleanup = () =>
      {
        table.removeEventListener('mousedown', onMouseDown)
        table.removeEventListener('mouseup', onMouseUp)
        table.removeEventListener('mousemove', onMouseMove)
        table.removeEventListener('mouseleave', onMouseUp)
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
              return seat!==''
            })
  
          const guestToLobby = tableGuests.map(guest=>
            {
              return {name:guest, id: uuidv4()}
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
    
    const changeTableName = (e: React.FormEvent) => {
      e.preventDefault();
      // console.log(newTableName);

      const updatedTables = tables.map(table=>
        {
          if(table.id === props.id)
          {
            table.name = newTableName;
            return table
          }
          else return table
        })

        ctx.updateTables(updatedTables)
        openEditTableNameForm()
    };

    //didnt work turn on input and edit name
    return (
      <>
      {isTableNameFormOpen && (
                <div className={classes.tableNameFormModal}>  
               
                  <form className={classes.tableNameForm} onSubmit={changeTableName} style={{top:`${coords.current.lastY}px`}}>

                  <div className={classes.closeButton}>
                    <AiOutlineCloseSquare onClick = {openEditTableNameForm}/>
                  </div>
                    <input type="text" defaultValue={newTableName} onChange={changeNewTableName} />
                    <button>Change name</button>
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
              <span style={{transform: `rotate(${-rotation}deg)`}}>
              {props.table.name}
              </span>
              {/* {isTableNameFormOpen && 
                (<ChangeTableNameForm
                  changeTableName={changeTableName}
                  changeNewTableName={changeNewTableName}
                  newTableName={newTableName}
                />)
              } */}
              {/* {
                <ChangeTableNameForm
                changeTableName={changeTableName}
                changeNewTableName={changeNewTableName}
                newTableName={newTableName}
                isTableNameFormOpen = {isTableNameFormOpen}
              />
              } */}
              {seats.map((seat, index)=>
                {
                  return <Seat id={index} key = {index} name={seat} tableId ={props.id} onGuestSeatHandle={onSeatMouseUp} style={{transform: `rotate(${-rotation}deg)`}}/>
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
