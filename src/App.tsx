import React from 'react';
import './App.scss';
import {DragDropContext} from "react-beautiful-dnd"


import Header from './components/Header';
import MainWindow from './components/MainWindow';
import { GuestContextProvider } from './store/context-guest';
import { DropResult } from 'react-beautiful-dnd';

const onDragEnd = (result:any) =>
{
  console.log(result)
}

function App() {
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
