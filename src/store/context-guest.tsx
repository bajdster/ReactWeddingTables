import React, {useState, useEffect} from "react"
import Guest from "../models/Guest"
import Table from "../models/Table"
import {v4 as uuidv4} from 'uuid'

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
    getGroup: (group:string)=> void,
    group: string

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
    getGroup: () => {},
    group: ""
})

export const GuestContextProvider: React.FC<{children:React.ReactNode}> = (props) =>
{
    const [guests, setGuests] = useState<Guest[]>([]);
    const [tables, setTables] = useState<Table[]>([]);
    const [canTableDrag, setCanTableDrag] = useState<boolean>(true);
    const [group, setGroup] = useState<string>("")

    //prod
    // const guestURL:string = "https://wedding-tables-22036-default-rtdb.firebaseio.com/guests.json"
    // const tablesURL: string = "https://wedding-tables-22036-default-rtdb.firebaseio.com/tables.json"

    //tst
    const guestURL:string = "https://wedding-tables-tst-default-rtdb.firebaseio.com/guests.json"
    const tablesURL:string = "https://wedding-tables-tst-default-rtdb.firebaseio.com/tables.json"

    useEffect(()=>
    {
        loadGuests();
        loadTables();
    }, [])

    const loadGuests = async () =>
    {
        const response = await fetch(guestURL)

        const data = await response.json();
        const addedGuests = [];

        

        for(const key in data)
        {   
            const guest:Guest = {
                name: data[key].name,
                id: data[key].id,
                group: data[key].group
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
        const response = await fetch(tablesURL)

        const data = await response.json();
        const addedTables = [];

        

        for(const key in data)
        {   
            const table:Table = {
                name: data[key].name,
                id: data[key].id,
                seats: data[key].seats,
                x: data[key].x,
                y: data[key].y,
                startX: data[key].startX,
                startY: data[key].startY,
                lastX: data[key].lastX,
                lastY: data[key].lastY,
                rotation: data[key].rotation
            }

            addedTables.push(table)
        
        }
        setTables(addedTables)
    }




    const addGuest = async (guest: Guest) =>
    {
        const response = await fetch(guestURL,
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

        const response = await fetch(tablesURL,
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

        console.log(tables)
        const response = await fetch(tablesURL,
        {
            method: "PUT",
            body: JSON.stringify(tables)
        })

        setTables(tables)
    }
    const updateGuests = async (guests:Guest[]) =>
    {
        const response = await fetch(guestURL,
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
        
        const ctxTables = tables
        const updatedTables = ctxTables.map(table=>
            {
                const newSeats = table.seats.map(seat=>
                    {
                        if(seat.name === id)
                        {
                            return {group: "", name: "", id:uuidv4()}
                        }
                        else return seat
                    })

                    return {...table, seats: newSeats}
            })
            console.log(updatedTables)

        updateGuests(updatedGuests);
        updateTables(updatedTables)
        
    }

    const changeTableDrag = (turn:boolean) =>
    {
        setCanTableDrag(turn)
    }

    const getGroup = (group:string) =>
    {
        setGroup(group)
    }

    // useEffect(()=>
    // {
    //     console.log(guests)
    // }, [])

    const contextValue: GuestContextObj = {
        guests: guests,
        tables: tables,
        canTableDrag: canTableDrag,
        group:group,
        addGuest: addGuest,
        addTable: addTable,
        updateTables: updateTables,
        updateGuests: updateGuests,
        deleteGuest: deleteGuest,
        changeTableDrag: changeTableDrag,
        getGroup:getGroup
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

//take care of non even amount of guests (temporiarly set even values) + 
//take care about deleting from table +
//position of tables?
//disable seats when dbclick + 

//add edit table seats amount