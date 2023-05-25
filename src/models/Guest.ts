type Children = {
    name: string,
    age?: number
}

type Guest = {
    id?: string | number,
    name: string,
    age?: string;
    partner?: string;
    group: string;
    children?: Children[]
}

export default Guest