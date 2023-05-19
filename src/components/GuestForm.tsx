import React, { useEffect, useState, useContext } from 'react'
import classes from "./GuestForm.module.scss"
import {BsPersonCircle, BsPersonFillAdd} from "react-icons/bs"
import { MdChildCare } from 'react-icons/md'
import {AiOutlineCloseSquare} from "react-icons/ai"
import Guest from '../models/Guest'
import GuestContext from '../store/context-guest'
import {v4 as uuidv4} from 'uuid'

const GuestForm:React.FC<{openFormHandler:() => void}> = (props) => {

type Children = {
    name: string,
    age?: number
}


const [name, setName]= useState<string>("Guest")
const [accompanyName, setAccompanyName] = useState<string>("")
const [childrenNames, setChildrenNames] = useState<Children[]>([])
const [age, setAge] = useState<string>("")
const [childrenAmount, setChildrenAmount] = useState<number>(0)
const [childrenAmountInputs, setChildrenAmountInputs] = useState<number[]>([])
const [childrens, setChildrens] = useState<Children[]>([])
const [group, setGroup] = useState<string>("Bride family")



const ctx = useContext(GuestContext)

//need to add posiibility to adding children names when childrenAmount is greater than 0
const childrenAmountHandler = (e:React.FormEvent<HTMLInputElement>) =>
{
    setChildrenAmount(Number(e.currentTarget.value))
}


const childrenNamesHandler = (e:React.FormEvent<HTMLInputElement>) =>
{
    // console.log(e.currentTarget.value)
    const { name, value } = e.currentTarget;
    const index = Number(name.substr(name.length - 1));
    setChildrenNames((prev) => {
      const newChildrenNames = [...prev];
      newChildrenNames[index] = { name: value };
      return newChildrenNames;
    });
};

const submitGuestHandler = (e:React.FormEvent) =>
{
    e.preventDefault();
    //use function from context to add guest
    //add accompany and children only when are not empty
    ctx.addGuest({name: name, partner: accompanyName, group: group, children: childrenNames, id: uuidv4()})
    accompanyName && ctx.addGuest({name: accompanyName, group: group, id: uuidv4()})
    childrenNames && childrenNames.forEach((child)=>
    {
        ctx.addGuest({name:child.name, group: group, id: uuidv4()})
    })
}

useEffect(()=>
{
    console.log(childrenNames)
    let inputsArr = []
    for(let i = 0; i<childrenAmount; i++)
    {
        inputsArr.push(i);
    }
    setChildrenAmountInputs(inputsArr)

}, [childrenAmount, childrenNames])


//to change children
  return (
    <div className={classes.addGuestWindow}>
        
        <form onSubmit={submitGuestHandler}>
            <h2>Add guest</h2>
            <div className={classes.inputBox}>
                <div className={classes.inputIcon}>
                    <BsPersonCircle/>
                </div>
                <div className={classes.inputField}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setName(e.target.value)}></input>
                </div>
            </div>
            
            <div className={classes.inputBox}>
                <div className={classes.inputIcon}>
                    <BsPersonFillAdd/>
                </div>
                <div className={classes.inputField}>
                    <label htmlFor="accompanyName">{name}'s accompany</label>
                    <input type="text" id="accompanyName" onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setAccompanyName(e.target.value)}></input>
                </div>
            </div>
            

            <div className={classes.inputBox}>
                <div className={classes.inputIcon}>
                    <MdChildCare/>
                </div>
                <div className={classes.inputField}>
                    <label htmlFor="childrenAmount">Children</label>
                    <input type="number" value= {childrenAmount} id="childrenAmount" min="0" max="10" onChange={childrenAmountHandler}></input>
                </div>
            </div>

            {
             childrenAmountInputs.map((input, index)=>
                {
                    return (
                    <div className={classes.childBox}>    
                        <div className={classes.childInputBox}>
                            <div className={classes.inputIcon}>
                            {index+1}
                            </div>
                        <div className={classes.childInputField}>
                            <label htmlFor="name">Children Name</label>
                            <input type="text" id="name" name={`children${index}`}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> childrenNamesHandler(e)}
                            ></input>
                        </div>
                    </div>
                </div>)
                })
            }

            <div className={classes.inputBox}>
                <div className={classes.inputField}>
                    <label htmlFor="group">Group</label>
                    <select onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> setGroup(e.target.value)}>
                        <option value="Bride family">Bride family</option>
                        <option value="Bride friends">Bride friends</option>
                        <option value="Groom family">Groom family</option>
                        <option value="Groom friends">Groom friends</option>
                    </select>
                </div>
            </div>

            <button>Add</button>

            <div className={classes.closeWindow}>
                <AiOutlineCloseSquare className={classes.closeButton} onClick={props.openFormHandler}/>
            </div>
        </form>  

           
    </div>
  )
}

export default GuestForm