// import React from 'react'
// import classes from "./SquareTable.module.scss";
// import { createPortal } from "react-dom";


// const portalElement: any = document.getElementById("tableNameChanger");

// const TableNameForm: React.FC<{changeTableName:(e: React.FormEvent)=> void, changeNewTableName: (e: React.ChangeEvent<HTMLInputElement>)=> void, newTableName:string, isTableNameFormOpen?: boolean}>  = (props) => {
//     return (
        
//       <form className={classes.tableNameForm} onSubmit={props.changeTableName}>
//         <input type="text" value={props.newTableName} onChange={props.changeNewTableName} />
//       </form>
      
//     )
//   }

//   const ChangeTableNameForm: React.FC<{changeTableName:(e: React.FormEvent)=> void, changeNewTableName: (e: React.ChangeEvent<HTMLInputElement>)=> void, newTableName:string, isTableNameFormOpen?: boolean}>  = (props)=>
//   {
//     return (
//         <>
//             {createPortal(<TableNameForm changeTableName={props.changeTableName} changeNewTableName={props.changeNewTableName} newTableName={props.newTableName}/>, portalElement)}
//         </>
//     )
//   }
  
//   export default ChangeTableNameForm;
import React from 'react'

const changeTableNameForm = () => {
  return (
    <div>changeTableNameForm</div>
  )
}

export default changeTableNameForm