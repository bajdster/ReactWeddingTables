import React, {useContext} from 'react'
import logo from "../images/logo.png"
import classes from "./Header.module.scss"
import GuestContext from '../store/context-guest'

const Header = () => {

  const ctx = useContext(GuestContext)


  return (
    <header className={classes.header} style={ctx.darkMode ? { backgroundColor: "rgb(35,38,38)" } : {}}>
        <span>Wedding Tables</span>
        <div className={classes.logoContainer}>
            <img src={logo} alt="logo element"></img>
        </div>
        <div className={classes.themeSwitch} onClick={ctx.toggleDarkMode}>
          <div>light</div>
          <div className={classes.ballBack}>
            <div className={classes.ball} style={ctx.darkMode ? { right: "0" } : { left: "0" }}></div>
          </div>
          <div>dark</div>
        </div>
    </header>
  )
}

export default Header