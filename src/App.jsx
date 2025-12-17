// src/App.jsx
import React from "react";
import "./App.css";

import BasicFetchingDemo from "./BasicFetchingDemo";
import AdvancedFetchingDemo from "./AdvancedFetchingDemo.jsx";
import CRUDOperationsDemo from "./CRUDOperationsDemo.jsx";

function App() {
  return (
    <div className="App">
      <h1>Praktik Data Fetching - Pertemuan 7</h1>
      <p>Integrasi React dengan RESTful API</p>

      {/* Basic Data Fetching */}
      <div className="demo-section">
        <BasicFetchingDemo />
      </div>

      {/* Advanced Data Fetching */}
      <div className="demo-section">
        <AdvancedFetchingDemo />
      </div>

      {/* CRUD Operations */}
      <div className="demo-section">
        <CRUDOperationsDemo />
      </div>
    </div>
  );
}

export default App;
