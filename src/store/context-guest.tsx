import React, {useState, useEffect} from "react"
import Guest from "../models/Guest"
import Table from "../models/Table"


// type Guest = {
//     id?: string,
//     name: string,
//     age?: string;
//     partner?: string;
//     group?: string;
//     children?: Children[]
// }

// type Table = {
//     name: string | React.RefObject<HTMLInputElement>;
//     seats: JSX.Element[]
// }


type GuestContextObj = {
    guests: Guest[],
    tables: Table[],
    addGuest: (guest:Guest) => void
    addTable: (table:Table) => void
}

const GuestContext = React.createContext<GuestContextObj>({
    guests: [],
    tables: [],
    addGuest: ()=> {},
    addTable: () => {}
})

export const GuestContextProvider: React.FC<{children:React.ReactNode}> = (props) =>
{
    const [guests, setGuests] = useState<Guest[]>([]);
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(()=>
    {
        loadGuests();
    }, [])

    const loadGuests = async () =>
    {
        console.log("im working")
        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/guests.json")

        const data = await response.json();
        const addedGuests = [];

        

        for(const key in data)
        {   
            const guest:Guest = {
                name: data[key].name,
                id: data[key].id,
                // partner: data[key].partner,
                // children: data[key].children
            }

            addedGuests.push(guest)
            // setGuests((prev)=>
            // {
            //     return [...prev, guest]
            // })
        }
        setGuests(addedGuests)
    }

    const addGuest = async (guest: Guest) =>
    {
        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/guests.json",
        {
            method: "POST",
            body: JSON.stringify(guest)
        })

        setGuests((prev)=>
        {
            return [...prev, guest]
        })

        
    }


    const addTable = (table: Table) =>
    {
        setTables((prev)=>
        {
            return [...prev, table]
        })
    }

    useEffect(()=>
    {
        console.log(guests)
    }, [])

    const contextValue: GuestContextObj = {
        guests: guests,
        tables: tables,
        addGuest: addGuest,
        addTable: addTable
    }

    return (
        <GuestContext.Provider value={contextValue}>
            
            {props.children}
        </GuestContext.Provider>
    )
}

export default GuestContext;

//add table creating and configuration
//make tables able to add seats and make them draggable
//turn GuestItem to droppable
//think about saving state of the tables
//create importing system for guests saved in pdf

//change the way to adding guests not as 3 groups of people connected to one