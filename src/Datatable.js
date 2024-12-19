import MUIDataTable from "mui-datatables";
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";

const Datatable = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    { name: "title", label: "Title" }, 
    { name: "place_of_origin", label: "Place of Origin" },
    { name: "artist_display", label: "Artist Display" },
    
    { name: "date_start", label: "Date Start" },
    { name: "date_end", label: "Date End" },
  ];

  useEffect(() => {
    fetch("https://api.artic.edu/api/v1/artworks?page=1")
      .then((res) => res.json())
      .then((data) => {
        const artworks = data?.data || [];
        setUsers(artworks); // Corrected Data Extraction
      });
  }, []);

  const options = {
    selectableRows:true, // Disabled row selection
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: "Poppins",
      },
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
              
            },
            body: {
              padding: "10px 15px",
              color: "#e2e8f0",
            },
          },
        },
      },
    });

  return (
    <div className="bg-slate-700 py-24 min-h-screen grid place-items-center">
      <div className="w-10/12 max-w-4xl">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Artworks List"}
            data={users}
            columns={columns}
            options={options}
            
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Datatable;
