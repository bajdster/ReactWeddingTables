import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

const GuestImportForm: React.FC<{ openGuestImport: () => void }> = (props) => {
  const [csvData, setCSVData] = useState<string[]>([]);

  const handleOnDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvText = reader.result as string;
      const parsedData = parseCSV(csvText, 1); // Przetwarzanie kolumny nr 2
      setCSVData(parsedData);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvText: string, columnIndex: number) => {
    const parsedData = Papa.parse<{ [key: string]: string }>(csvText, { header: true });
    const columnData = parsedData.data.map((row) => Object.values(row)[columnIndex]);
    return columnData;
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleOnDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Przeciągnij plik CSV lub kliknij, aby wybrać plik.</p>
      {csvData.length > 0 && (
        <ul>
          {csvData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuestImportForm;
