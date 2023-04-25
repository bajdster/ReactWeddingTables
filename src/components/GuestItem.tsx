import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import classes from "./GuestItem.module.scss"

const GuestItem:React.FC<{guestContent:string}> = (props) => {

    // let circleColor;

    // if(props.content === "gues")

  return (
    <li className={classes.circle}>
        <BsPersonCircle/>
        <div className={classes.description}>{props.guestContent}</div>
    </li>
  )
}

export default GuestItem