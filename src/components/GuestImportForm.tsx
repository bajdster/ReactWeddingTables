import React, { useEffect, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import {v4 as uuidv4} from 'uuid';
import Guest from '../models/Guest';
import GuestContext from '../store/context-guest';
import classes from "./GuestImportForm.module.scss";
import { TiDelete } from 'react-icons/ti';
import example from "../images/example.png"

const GuestImportForm: React.FC<{ openGuestImport: () => void }> = (props) => 
{
  const [csvData, setCSVData] = useState<Guest[]>([]);
  const ctx = useContext(GuestContext)

  const handleOnDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvText = reader.result as string;
      const parsedData = parseCSV(csvText, 1); // Przetwarzanie kolumny nr 2

      const convertedGuests:Guest[] = parsedData.map(guest=>
        {
          return {name: guest, id: uuidv4()};
        })


      setCSVData(convertedGuests);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvText: string, columnIndex: number) => {
    const parsedData = Papa.parse<{ [key: string]: string }>(csvText, { header: true });
    const columnData = parsedData.data.map((row) => Object.values(row)[columnIndex]);
    return columnData;
  };

  useEffect(()=>
  {
    let guests = ctx.guests;
    const afterImportGuests = [...guests, ...csvData]
    ctx.updateGuests(afterImportGuests);

  }, [csvData])

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleOnDrop });

  return (
    <div className={classes.guestImportForm}>
       <div className={classes.closeWindow} onClick={props.openGuestImport}>
          <TiDelete/>
        </div>
      <div className={classes.importWindow} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag the CSV file or click to select a file.</p>
        <p>(Make sure, that guest names are in column number 2)</p>
        <div className={classes.example}>
          <img src={example}></img>
        </div>
      </div>
      
    </div>
  );
};

export default GuestImportForm;

//mozna by zrobić tak że ta tablicę csvData mapować do obiektów z {name:name, id:uuid()} i albo dodać je od razu jako Guests zastępując Guests, albo każdy jeden obiekt dodać za pomocą addGuest. 
//1 rozwiązanie jest o tyle problematyczne, że import zastąpiłby od razu wszystkie dodane wcześniej guest
//może jest opcja aby do aktualnej tablicy Guest dodać wszystkie zmapowane csvData i ustawić je jako guests np. ctx.guests zapisać do zmiennej, i do tej zmiennej za pomocą push pododawać każdy jeden csvData a następnie updateGuests jako tą zmienną.