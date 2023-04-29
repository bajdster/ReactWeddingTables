import React, { useRef, useState, useEffect, useContext } from "react";
import classes from "./SquareTable.module.scss";
import Table from "../models/Table";
// import Half from "./Half";
import {BiRefresh} from "react-icons/bi"
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import Seat from "./Seat";
import GuestContext from "../store/context-guest";


const SquareTable: React.FC<{ table: Table, hall:React.RefObject<HTMLDivElement>, id:string}> = (props) => {

  const ctx = useContext(GuestContext)

  const seats = props.table.seats;

  console.log(seats)
  // const half = Math.ceil(seats.length / 2);

  // const firstHalf = seats.slice(0, half);
  // const secondHalf = seats.slice(half);

  const tableRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({startX:0, startY: 0, lastX: 0, lastY:0})

  // const [isDragging, setIsDragging] = useState(false);

  const [rotation, setRotation] = useState<number>(0);
  // const [position, setPosition] = useState({ x: 0, y: 0 });

  // const handleMouseDown = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   setIsDragging(true);
  //   setPosition({ x: e.clientX, y: e.clientY });
  // };

  // const handleMouseMove = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (isDragging) {
  //     const dx = e.clientX - position.x;
  //     const dy = e.clientY - position.y;
  //     setPosition({ x: position.x + dx, y: position.y + dy });
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };


  const rotateTableHandler = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  useEffect(()=>
  {
    // if(!ctx.canTableDrag) return
    
    if(!tableRef.current || !props.hall.current) return;

    const table = tableRef.current;
    const hall = props.hall.current; 

    const onMouseDown = (e: MouseEvent) =>
    {
      e.preventDefault()
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

    }
    const onMouseUp = (e: MouseEvent) =>
    {
      e.preventDefault()
      isClicked.current = false;
      coords.current.lastX = table.offsetLeft;
      coords.current.lastY = table.offsetTop;
    }
    const onMouseMove = (e: MouseEvent) =>
    {
      e.preventDefault();
      if(!isClicked.current) return

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;


      table.style.top = `${nextY}px`
      table.style.left = `${nextX}px`
    }

    table.addEventListener('mousedown', onMouseDown)
    table.addEventListener('mouseup', onMouseUp)
    hall.addEventListener('mousemove', onMouseMove)
    hall.addEventListener('mouseleave', onMouseUp);

    const cleanup = () =>
    {
      table.removeEventListener('mousedown', onMouseDown)
      table.removeEventListener('mouseup', onMouseUp)
      hall.removeEventListener('mousemove', onMouseMove)
      hall.removeEventListener('mouseleave', onMouseUp)
    }
    

    return cleanup;
  }, [])


  return (
    <>
      
      <div
        className={classes.tableBox}
        style={{
          width: seats.length / 2 * 60,
          transform: `rotate(${rotation}deg)`
          // left: `${position.x}px`,
          // top: `${position.y}px`
        }}
        ref={tableRef}
      >
        
          <div className={classes.table}>
          <span>{props.table.name}</span>
          {seats.map((seat, index)=>
            {
              return <Seat id={index} name={seat} tableId ={props.id}/>
            })}
          </div>


        <div className={classes.options}>
          <button onClick={rotateTableHandler} style={{transform: `rotate(${rotation}deg)`}}><BiRefresh/></button>
          <button style={{transform: `rotate(${-rotation}deg)`}}><AiFillDelete/></button>
          <button style={{transform: `rotate(${-rotation}deg)`}}><AiFillEdit/></button>
        </div>
      </div>
    </>
  );
};

export default SquareTable;
