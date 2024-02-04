import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./Templates/Navbar";
import Patients from "./Pages/Patients/Patients";
import Wards from "./Pages/Wards/Wards";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <>
      <div className="App px-4 py-4">
        <h2>Patient Management Application</h2>
        <Navbar />

        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/wards" element={<Wards />} />
          {/* <Route path="/school-view" element={<SchoolView />} />
          <Route path="/class-view" element={<ClassView />} /> */}
        </Routes>
        <Toaster position="top-center" />
      </div>
    </>
  );
}

export default App;
