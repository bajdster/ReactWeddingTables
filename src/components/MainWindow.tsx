import React, { useState } from 'react'
import AsideMenu from './AsideMenu';
import Hall from './Hall';
import GuestForm from './GuestForm';
import classes from "./MainWindow.module.scss"
import TableForm from './TableForm';

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

  return (
    <div className={classes.mainWindow}>
        <AsideMenu openFormHandler={openFormHandler} openTableFormHandler={openTableFormHandler}/>
        <Hall/>
        {addGuestForm && <GuestForm openFormHandler={openFormHandler}/>}
        {addTableForm && <TableForm openTableFormHandler={openTableFormHandler}/>}
    </div>
  )
}

export default MainWindow