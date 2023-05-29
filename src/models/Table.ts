import Guest from "./Guest";

type Table = {
    name: string | number;
    seats: Guest[],
    id: string,
    x?: number,
    y?: number,
    startX:number,
    startY: number,
    lastX: number,
    lastY: number,
    rotation: number
}

export default Table;