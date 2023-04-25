import React from 'react'
import logo from "../images/logo.png"
import classes from "./Header.module.scss"

const Header = () => {
  return (
    <header className={classes.header}>
        <span>Wedding Tables</span>
        <div className={classes.logoContainer}>
            <img src={logo}></img>
        </div>
    </header>
  )
}

export default Header