import { NavLink } from "react-router-dom"
import './Navbar.css'
import {useSelector, useDispatch } from 'react-redux';
import { toggleLanguage } from '../../Store/Slices/languageSlice';

const Navbar = () => {
    const NavbarStyle = ({ isActive }) => (isActive ? "text-danger" : "")
    const dispatch = useDispatch();
    const language = useSelector((state) => state.settingLanguage.language); // Access the language state
    const handleToggleLanguage = () => {
        dispatch(toggleLanguage()); // Dispatch the toggleLanguage action
      };
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
                <li>

            <button onClick={handleToggleLanguage}>
        {language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      </button>
                </li>

            </ul>

        </nav >
    </>
  )
}

export default Navbar