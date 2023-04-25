import React from 'react'
import classes from "./Half.module.scss"

const FirstHalf:React.FC<{half: JSX.Element[]}> = (props) => {

  const seatsAmount = props.half.length;
  // console.log(seatsAmount.length)

  return (
    <div>FirstHalf</div>
  )
}

export default FirstHalf


//there is a problem because when clicked add table it adds empty table ?!