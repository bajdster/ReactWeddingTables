import React,{useContext} from 'react';
import './App.scss';
import {DragDropContext} from "react-beautiful-dnd";



import Header from './components/Header';
import MainWindow from './components/MainWindow';
import { GuestContextProvider } from './store/context-guest';
import { DropResult } from 'react-beautiful-dnd';
import GuestContext from './store/context-guest';


function App() {

  const ctx = useContext(GuestContext)
  const onDragEnd = (result:any) =>
  {
    console.log(result)
    const {source, destination} = result;
  
    if(!destination) return;
    if(!destination.droppableId === source.droppableId && destination.index === source.index) return;
  
    let add, active = ctx.guests, tables;
    // something is wrong with seat, beacuse you cannot placement guest on first upper seat
    //maybe it must be without cutting in two halfs...
    
    if(source.droppableId === "asideMenu")
    {
      add = active[source.index]
      active.splice(source.index, 1)

      //create new function in context when needed
      ///...needed to think about it, because these examples are different
    }

  }
  

  return (
    
    <GuestContextProvider>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Header/>
        <MainWindow/>
      </div>
      </DragDropContext>
    </GuestContextProvider>
  );
}

export default App;
