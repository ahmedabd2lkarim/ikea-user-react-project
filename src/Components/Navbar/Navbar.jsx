import { NavLink } from "react-router-dom"
import './Navbar.css'
const Navbar = () => {
    const NavbarStyle = ({ isActive }) => (isActive ? "text-danger" : "")
  return (
    <>
    <nav className="container-div">
            <ul>
                <li>
                    <NavLink to="/" className={NavbarStyle}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/productDetails" className={NavbarStyle}>Details</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={NavbarStyle}>Login</NavLink>
                </li>
                
                <li>
                    <NavLink to="/signup" className={NavbarStyle}>Sign up</NavLink>
                </li>
                <li>
                    <NavLink to="/cart" className={NavbarStyle}>Cart</NavLink>
                </li>
                <li>
                    <NavLink to="/favorite" className={NavbarStyle}>Favorite</NavLink>
                </li>
                 <li>
                    <NavLink to="/profile" className={NavbarStyle}>Profile</NavLink>
                </li> 
            </ul>
        </nav >
    </>
  )
}

export default Navbar