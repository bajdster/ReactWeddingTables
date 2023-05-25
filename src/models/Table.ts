import Guest from "./Guest";

type Table = {
    name: string | number;
    seats: Guest[],
    id: string
}

export default Table;