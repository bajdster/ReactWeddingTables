import React, { useState, useContext } from 'react'
import AsideMenu from './AsideMenu';
import Hall from './Hall';
import GuestForm from './GuestForm';
import classes from "./MainWindow.module.scss"
import TableForm from './TableForm';
import GuestImportForm from './GuestImportForm';
import GuestContext from '../store/context-guest';
import {DragDropContext} from "react-beautiful-dnd";
import {v4 as uuidv4} from 'uuid';
import Table from '../models/Table';
import Guest from '../models/Guest';



const MainWindow:React.FC = () => {

    const [addGuestForm, setAddGuestForm] = useState<boolean>(false)
    const [addTableForm, setAddTableForm] = useState<boolean>(false)
    const [guestImport, setGuestImport] = useState<boolean>(false)

    // const [groupData, setGroupData] = useState<string>("")
  

    const openFormHandler = () =>
    {
        setAddGuestForm(prev=> !prev)
    }
    const openTableFormHandler = () =>
    {
        setAddTableForm(prev=> !prev)
    }
    const openGuestImport = () =>
    {
        setGuestImport(prev=> !prev)
    }

  const ctx = useContext(GuestContext)
 

  //nie odczytuje dataset.group.........
  const onDragStart = (result:any, event:any) =>
  {
    
    // if(group) 
    // {
    //   console.log(group)
    //   setGroupData(group)
    // }
    
    ctx.changeTableDrag(false)
  }
  
  const onDragEnd = (result:any) =>
  {
    
    console.log(result)
    const {source, destination, draggableId} = result;
    const groupData = ctx.group;
    
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

          console.log(previousAreaIndex)
        
          if(!destination) return;
          if(!destination.droppableId === source.droppableId && destination.index === source.index) return;
        
          let add, guests = ctx.guests, tables = ctx.tables;

          console.log(ctx.tables)

          //need to add possibility to drop 
          
        //from lobby to tables
          if(source.droppableId === "asideMenu")
          {
            //wszelki ruch w obrębie asideMenu
            if(source.droppableId === "asideMenu" && destinationTableId === "asideMenu") return;
            
            //  add = guests[source.index]
            guests.splice(source.index, 1)

            const updatedTables = tables.map(table=>
              {
                if(table.id === tableId)
                {
                  const newSeats = [...table.seats]
                  if(newSeats[nextAreaIndex].name === "")
                  {
                    newSeats[nextAreaIndex] = {name: draggableId, id:uuidv4(), group: groupData};
                    table = {...table, seats:newSeats}
                  }
                  //podmiana gościa z lobby z gościem który zajął miejsce
                  else 
                  {
                    const previousSeatValue = newSeats[nextAreaIndex];
                    newSeats[nextAreaIndex] = {name: draggableId, id:uuidv4(), group: groupData};
                    table = {...table, seats:newSeats}
                    guests.splice(guests.length, 0, previousSeatValue)
                  }
                  
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
            //przypadek gdy ze stołu chcemy zdjąć gościa z powrotem do lobby
            if(destinationTableId === "asideMenu")
            {

              const updatedTables = tables.map(table=>
                {
                  if(table.id === sourcetableId)
                  {
                    //conditions share the same action trigger and create bugs (multiple calls)
                    guests.splice(guests.length, 0, {name: draggableId, id:uuidv4(), group: groupData})

                    const newSeats = [...table.seats];


                      newSeats[previousAreaIndex].name = "";
                      newSeats[previousAreaIndex].group = "";
                      newSeats[previousAreaIndex].id = uuidv4();
                      table = {...table, seats: newSeats};
                    
                    return table;
                  }
                
                  else 
                  {
                    return table
                  }
                  
                })
                
                ctx.updateTables(updatedTables)
            }


            //obręb jednego stołu
            if(sourcetableId === destinationTableId)
            {
             
              const updatedTables = tables.map(table=>
                {
                  //znaleziono jeden z Seat ze ma id stołu
                  if(table.id === destinationTableId)
                  {
                    const newSeats = [...table.seats]

                    //przypadek gdy krzesło jest puste
                    if(newSeats[nextAreaIndex].name==='')
                    {
                      newSeats[nextAreaIndex] = {name: draggableId, id:uuidv4(), group: groupData};
                      newSeats[previousAreaIndex].name ='';
                      newSeats[previousAreaIndex].group ='';
                      table = {...table, seats:newSeats}
                    }

                    //przypadek gdy krzesło nie jest puste

                    else if (newSeats[nextAreaIndex].name !=='' && newSeats[nextAreaIndex].name!==draggableId)
                    {
                      
                      // const previousSeatContent = newSeats[nextAreaIndex].toString()
                      const previousSeatContent = newSeats[nextAreaIndex]
                      // console.log(typeof previousSeatContent)
                      // newSeats[nextAreaIndex] = "";
                      // newSeats[previousAreaIndex] ="";
                      newSeats[nextAreaIndex] ={name: draggableId, id:uuidv4(), group: groupData};

                      newSeats[previousAreaIndex] = previousSeatContent;
                      

                      console.log(newSeats)
                      table={...table, seats:newSeats}

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

            //sourcem jest jeden ze stołów ale destination jest inny stół
            else if(sourcetableId !== destinationTableId && destinationTableId!== "asideMenu")
            {
              const sourceTableValue:string = draggableId;
              const sourceTableValueIndex:number = previousAreaIndex;
              let destinationTableValue: Guest;
              const destinationTableValueIndex = nextAreaIndex;

              const tempTables = [...tables];
              tempTables.map(table=>
                {
                  if(table.id === destinationTableId)
                  {
                    destinationTableValue = table.seats[destinationTableValueIndex]
                    table.seats[destinationTableValueIndex] = {name: sourceTableValue, id:uuidv4(), group: groupData};
                  }

                  else return table
                })
                tempTables.map(table=>
                  {
                    if(table.id === sourcetableId)
                    {
                      table.seats[sourceTableValueIndex] = destinationTableValue;
                    }
                    else return table;
                  })
              
                  ctx.updateTables(tempTables);

            }

          }
          //try 
          ctx.updateGuests(guests)
          
    }

    else
    {
      console.log("no destination")
    }

   

    ctx.changeTableDrag(true)
  }
 

    //continue with btf dnd library
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={classes.mainWindow}>
          <AsideMenu openFormHandler={openFormHandler} openTableFormHandler={openTableFormHandler} openGuestImport = {openGuestImport}/>
          <Hall/>
          {addGuestForm && <GuestForm openFormHandler={openFormHandler}/>}
          {addTableForm && <TableForm openTableFormHandler={openTableFormHandler}/>}
          {guestImport && <GuestImportForm openGuestImport={openGuestImport}/>}
      </div>
    </DragDropContext>
    
  )
}

export default MainWindow