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
//     name:  React.ReactNode;
//     seats: string[],
//     id: string
// }


type GuestContextObj = {
    guests: Guest[],
    tables: Table[],
    canTableDrag:boolean,
    addGuest: (guest:Guest) => void,
    addTable: (table:Table) => void,
    updateTables: (tables:Table[]) => void,
    updateGuests: (guests: Guest[]) => void,
    deleteGuest: (id:string) => void,
    changeTableDrag: (isDragPossibility:boolean) => void,

}

const GuestContext = React.createContext<GuestContextObj>({
    guests: [],
    tables: [],
    canTableDrag: true,
    addGuest: ()=> {},
    addTable: () => {},
    updateTables: () => {},
    updateGuests: ()=> {},
    deleteGuest: () => {},
    changeTableDrag: ()=> {},
})

export const GuestContextProvider: React.FC<{children:React.ReactNode}> = (props) =>
{
    const [guests, setGuests] = useState<Guest[]>([]);
    const [tables, setTables] = useState<Table[]>([]);
    const [canTableDrag, setCanTableDrag] = useState<boolean>(true);

    useEffect(()=>
    {
        loadGuests();
        loadTables();
    }, [])

    const loadGuests = async () =>
    {
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

    const loadTables = async () =>
    {
        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/tables.json")

        const data = await response.json();
        const addedTables = [];

        

        for(const key in data)
        {   
            const table:Table = {
                name: data[key].name,
                id: data[key].id,
                seats: data[key].seats
            }

            addedTables.push(table)
            // setGuests((prev)=>
            // {
            //     return [...prev, guest]
            // })
        }
        setTables(addedTables)
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


    const addTable = async (table: Table) =>
    {

        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/tables.json",
        {
            method: "POST",
            body: JSON.stringify(table)
        })


        setTables((prev)=>
        {
            return [...prev, table]
        })
    }

    const updateTables = async (tables:Table[]) =>
    {
        //here need to update whole DB
        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/tables.json",
        {
            method: "PUT",
            body: JSON.stringify(tables)
        })

        setTables(tables)
    }
    const updateGuests = async (guests:Guest[]) =>
    {
        const response = await fetch("https://wedding-tables-22036-default-rtdb.firebaseio.com/guests.json",
        {
            method: "PUT",
            body: JSON.stringify(guests)
        })
        setGuests(guests)
    }

    const deleteGuest = (id:string) =>
    {
        console.log(id)
        const updatedGuests = guests.filter(guest=>
            {
                return guest.name !== id;
            })

        updateGuests(updatedGuests);
    }

    const changeTableDrag = (turn:boolean) =>
    {
        setCanTableDrag(turn)
    }


    useEffect(()=>
    {
        console.log(guests)
    }, [])

    const contextValue: GuestContextObj = {
        guests: guests,
        tables: tables,
        canTableDrag: canTableDrag,
        addGuest: addGuest,
        addTable: addTable,
        updateTables: updateTables,
        updateGuests: updateGuests,
        deleteGuest: deleteGuest,
        changeTableDrag: changeTableDrag,
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