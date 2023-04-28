import React from 'react'
import classes from "./Half.module.scss";
import Seat from './Seat';

const FirstHalf:React.FC<{half: JSX.Element[], name:string}> = (props) => {

  const seatsAmount = props.half.length;
  // console.log(seatsAmount.length)
  const halfName = props.name ==="first" ? "first":"second";

  const newSeats:JSX.Element[] = Array.from({ length: seatsAmount }, (_, i) => 
  <Seat key={i} id={i} index={i}/>);

  return (
    <div className={`${classes[halfName]}`}>{newSeats}</div>
  )
}

export default FirstHalf


//there is a problem because when clicked add table it adds empty table ?!