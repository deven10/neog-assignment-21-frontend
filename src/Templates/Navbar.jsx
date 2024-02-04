import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
      <nav className="d-flex gap-3">
        <NavLink to="/">Patients</NavLink>
        <NavLink to="/wards">Wards</NavLink>
        <NavLink to="/hospital-view">Hospital View</NavLink>
      </nav>
      <nav>
        <NavLink
          to="https://github.com/deven10/neog-assignment-21-backend"
          target="_blank"
        >
          Backend
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
