import React from 'react'
import classes from "./SquareTable.module.scss";
import Table from '../models/Table';
import Half from './Half';

const SquareTable:React.FC<{table:Table}> = (props) => {

    const seats = props.table.seats;
    const half = Math.ceil(seats.length/2);

    const firstHalf = seats.slice(0, half);
    const secondHalf = seats.slice(half)

    console.log(firstHalf)

  return (
     <>
        <div className={classes.tableBox}>
            <Half half = {firstHalf}/>
                <div>{props.table.name}</div>
            <Half half = {secondHalf}/>
        </div>
    </>
  )
}

export default SquareTable