import React from 'react';
import './App.scss';

import Header from './components/Header';
import MainWindow from './components/MainWindow';
import { GuestContextProvider } from './store/context-guest';

function App() {
  return (
    <GuestContextProvider>
      <div className="App">
        <Header/>
        <MainWindow/>
      </div>
    </GuestContextProvider>
  );
}

export default App;
