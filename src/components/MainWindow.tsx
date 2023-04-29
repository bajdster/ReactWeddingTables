import React, { useState, useContext } from 'react'
import AsideMenu from './AsideMenu';
import Hall from './Hall';
import GuestForm from './GuestForm';
import classes from "./MainWindow.module.scss"
import TableForm from './TableForm';
import GuestContext from '../store/context-guest';
import { DropResult } from 'react-beautiful-dnd';
import {DragDropContext} from "react-beautiful-dnd";



const MainWindow:React.FC = () => {

    const [addGuestForm, setAddGuestForm] = useState<boolean>(false)
    const [addTableForm, setAddTableForm] = useState<boolean>(false)

    const openFormHandler = () =>
    {
        setAddGuestForm(prev=> !prev)
    }
    const openTableFormHandler = () =>
    {
        setAddTableForm(prev=> !prev)
    }



  const ctx = useContext(GuestContext)

  const onDragStart = () =>
  {
    ctx.changeTableDrag(false)
  }
  
  const onDragEnd = (result:any) =>
  {
    ctx.changeTableDrag(true)
    console.log(result)
    const {source, destination, draggableId} = result;

    const idContent = destination.droppableId.split("_")
    const tableId:string = idContent[0]
    const seatIndex:number = idContent[1]
    //now it is neccesary to iterate over tables and find that one by tableId and then from source gets properties and put this into seat which index is equal to index
    console.log(tableId)
    console.log(seatIndex)
  
    if(!destination) return;
    if(!destination.droppableId === source.droppableId && destination.index === source.index) return;
  
    let add, active = ctx.guests, tables = ctx.tables;

    console.log(ctx.tables)

    //kolejny zajebisty problem... cxt.tables nie posiada jeszcze gości bo nie są załadowani przez useEffect w contextAPI...KURWA
    
    if(source.droppableId === "asideMenu")
    {
      console.log('aside fires')
      add = active[source.index]
      active.splice(source.index, 1)

      const updatedTables = tables.map(table=>
        {
          if(table.id === tableId)
          {
            const newSeats = [...table.seats]

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            newSeats[seatIndex] = draggableId;
            table = {...table, seats:newSeats}
            // console.log(table.seats)
            return table
          }

          else
          {
            return table;
          }

          
        })
        ctx.updateTables(updatedTables)

    }
    else
    {
      console.log('table fires')
      const sourceContent = source.droppableId.split("_")
      const tableId:string = sourceContent[0];
      const previousArea = sourceContent[1];

      const destinationContent = destination.droppableId.split("_");
      const nextArea = destinationContent[1];


      const updatedTables = tables.map(table=>
        {
          if(table.id === tableId)
          {
            const newSeats = [...table.seats]

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            newSeats[previousArea] = "";
            newSeats[nextArea] = draggableId;
            table = {...table, seats:newSeats}
            // console.log(table.seats)
      

            //musi byc cos nie tak ze drag nie działa...
            //jakies nowe przypisywanie czy cos
            // zamiana zawartosc source z destination??

            return table
          }

          else
          {
            return table;
          }

          
        })
        ctx.updateTables(updatedTables)

    }

  }
 


    //continue with btf dnd library
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
    <div className={classes.mainWindow}>
        <AsideMenu openFormHandler={openFormHandler} openTableFormHandler={openTableFormHandler}/>
        <Hall/>
        {addGuestForm && <GuestForm openFormHandler={openFormHandler}/>}
        {addTableForm && <TableForm openTableFormHandler={openTableFormHandler}/>}
    </div>
    </DragDropContext>
    
  )
}

export default MainWindow