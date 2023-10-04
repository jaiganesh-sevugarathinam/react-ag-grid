import "./App.css";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community//styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const SimpleComp = (p) => {

 const onAt = useCallback(() => window.alert('At' + p.value));
  return <>

  <button onClick={onAt}>{p.buttonText}</button>
  {p.value}
  </>;
};

function App() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "athlete",
      cellRenderer: SimpleComp,
      cellRendererParams:{
        buttonText:'='
      },
      sortable: true,
      filter: true,
    },
    { field: "age", sortable: true, filter: true },
    { field: "country", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true },
    { field: "sport", sortable: true, filter: true },
    { field: "gold", sortable: true, filter: true },
    { field: "silver", sortable: true, filter: true },
    { field: "bronze", sortable: true, filter: true },
    { field: "total", sortable: true, filter: true },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickedListener = useCallback((e) => {
    console.log("cellClicked", e);
  });

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const pushMeClicked = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });
  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <button onClick={pushMeClicked}>Push Me</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="multiple"
        animateRows={true}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default App;
