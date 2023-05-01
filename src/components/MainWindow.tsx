import React, { useState, useContext } from 'react'
import AsideMenu from './AsideMenu';
import Hall from './Hall';
import GuestForm from './GuestForm';
import classes from "./MainWindow.module.scss"
import TableForm from './TableForm';
import GuestContext from '../store/context-guest';
import {DragDropContext} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid'



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

  const onDragStart = (result:any) =>
  {
    console.log(result.draggableId)
    ctx.changeTableDrag(false)
  }
  
  const onDragEnd = (result:any) =>
  {
    
    console.log(result)
    const {source, destination, draggableId} = result;
    
    //now its working
    if(destination)
    {
          const idContent = destination.droppableId.split("_")
          const tableId:string = idContent[0]
          const seatIndex:number = idContent[1]

          const sourceContent = source.droppableId.split("_")
          const sourcetableId:string = sourceContent[0];
          const previousAreaIndex:number = sourceContent[1];

          const destinationContent = destination.droppableId.split("_");
          const destinationTableId:string = destinationContent[0]
          const nextAreaIndex:number = destinationContent[1];
          //now it is neccesary to iterate over tables and find that one by tableId and then from source gets properties and put this into seat which index is equal to index
          console.log(tableId)
          console.log(seatIndex)
        
          if(!destination) return;
          if(!destination.droppableId === source.droppableId && destination.index === source.index) return;
        
          let add, guests = ctx.guests, tables = ctx.tables;

          console.log(ctx.tables)

          //need to add possibility to drop 
          

          if(source.droppableId === "asideMenu")
          {
            add = guests[source.index]
            guests.splice(source.index, 1)

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

          //sourcem jest jeden ze stołów a właściwie Seat
          else
          {

           
            
            //obręb jednego stołu
            if(sourcetableId === destinationTableId)
            {
              
              const updatedTables = tables.map(table=>
                {
                  //znaleziono jeden z Seat ze ma id stołu
                  if(table.id === sourcetableId)
                  {
                    const newSeats = [...table.seats]

                    //przypadek gdy krzesło jest puste
                    if(newSeats[nextAreaIndex]==='')
                    {
                      newSeats[nextAreaIndex] = draggableId;
                      newSeats[previousAreaIndex] ='';
                      table = {...table, seats:newSeats}
                    }

                    //przypadek gdy krzesło nie jest puste

                    else if (newSeats[nextAreaIndex]!=='' && newSeats[nextAreaIndex]!==draggableId)
                    {
                      console.log("chuj zelki i bombelki")
                      const previousSeatContent = newSeats[nextAreaIndex].toString()
                      // console.log(typeof previousSeatContent)
                      // newSeats[nextAreaIndex] = "";
                      // newSeats[previousAreaIndex] ="";
                      newSeats[nextAreaIndex] = draggableId;

                      newSeats[previousAreaIndex] = previousSeatContent;
                      

                      console.log(newSeats)
                      table={...table, seats:newSeats}

                      // console.log(previousSeatContent)
                      // guests.splice(guests.length, 0, {name: previousSeatContent, id: uuidv4()})
                    }

                    return table
                  }

                  else
                  {
                    return table
                  }
                  
                })

                ctx.updateTables(updatedTables)
            }

            else
            {
              console.log("inny stół")
            }

            // const updatedTables = tables.map(table=>
            //   {
            //     //szukanie stołu który jest zgodny z source
            //     if(table.id === sourcetableId)
            //     {
            //       const newSeats = [...table.seats]

            //       //when you drop on occupied seat

            //       //works but you cannot drag previous seat.........FUCK
            //       if(destination && destination.droppableId !== "" )
            //       {
            //         // console.log("zamiana")
            //         // const prevContent = newSeats[nextAreaIndex]
            //         // const prevIndex = nextAreaIndex;

            //         // const nextContent = draggableId
            //         // const nextIndex = previousAreaIndex

            //         // newSeats[prevIndex] = nextContent;
            //         // newSeats[nextIndex] = prevContent;

            //         // table = {...table, seats:newSeats}
            //       }
            
            //           // eslint-disable-next-line @typescript-eslint/no-unused-expressions

            //           const prevContent = newSeats[nextAreaIndex]
            //           newSeats[previousAreaIndex] = '';
            //           newSeats[nextAreaIndex] = draggableId;
            //           table = {...table, seats:newSeats}

            //       return table
            //     }

            //     //works but double the guest on both tables........................................
            //     //NIC TU KURWA NIE DZIALA JAPRIERDOLE !
            
                
            //     else if(table.id === destinationTableId)
            //     {
            //         const updatedTables = ctx.tables.map(prevTable=>
            //           {
            //             if(prevTable.id === sourcetableId)
            //             {
            //               console.log(table.id)
            //               const newSeats = [...prevTable.seats]
            //               newSeats[previousAreaIndex] = '';
            //               prevTable = {...prevTable, seats:newSeats}
                        
            //             }
            //             return prevTable
            //           })

            //           ctx.updateTables(updatedTables)
                    

            //         const newSeats = [...table.seats]
            //         const prevContent = newSeats[nextAreaIndex]
            //         // newSeats[previousAreaIndex] = '';
            //         newSeats[nextAreaIndex] = draggableId;
            //         table = {...table, seats:newSeats}

                    

            //         return table
            //     }
              

              
            //     else
            //     {
            //       return table;
            //     }

            
                
            //   })
            //   ctx.updateTables(updatedTables)

          }
    }

    else
    {
      console.log("no destination")
    }

   
    

    ctx.changeTableDrag(true)
  }
 
console.log(ctx.tables)

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