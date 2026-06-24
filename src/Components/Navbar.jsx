import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <h2 className="logo">Sohel Rana</h2>

      <nav className="nav-links">
        <NavLink to="/" className="link">Home</NavLink>
        <NavLink to="/about" className="link">About</NavLink>
        <NavLink to="/services" className="link">Services</NavLink>
        <NavLink to="/contact" className="link">Contact</NavLink>
      </nav>
    </header>
  );
}