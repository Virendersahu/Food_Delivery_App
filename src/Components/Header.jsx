import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

// Header component
const HeaderComponent = () => {
  // Here we define the state variable for login button
  // once the button click, setLoginBtnReact variable trigger and it will the call the header component again to re-render the data.
  // when re-render happen diffing algorithm checks the changes in virtual dom of header and real dom of header.
  // and only changes part on the UI(here login button change only) or it is know as reconciliation process.
  const [loginBtnReact, setLoginBtnReact] = useState("Login");
  return (
    <div className="header flex justify-between items-center bg-orange-50 px-3 py-3">
      <div className="logo-container">
        <img className="logo w-20 rounded-lg" src={LOGO_URL} alt="HeaderLogo"></img>
      </div>
      <div className="nav-items">
        <ul className="flex gap-10 font-medium text-xl">
          <li className="home hover:bg-blue-300 hover:text-white hover:underline">
            <Link to="/home">Home</Link>
          </li>
          <li className="cart hover:bg-blue-300 hover:text-white hover:underline">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="contacts hover:bg-blue-300 hover:text-white hover:underline">
            <Link to="/contacts">Contacts</Link>
          </li>
          <li className="about hover:bg-blue-300 hover:text-white hover:underline">
            <Link to="/about">About Us</Link>
          </li>
          <button
            className="login border-xl w-full rounded-md bg-blue-500 hover:bg-blue-600 hover:text-white hover:underline"
            onClick={() => {
              // Here we use the ternary operator
              loginBtnReact === "Login"
                ? setLoginBtnReact("Logout")
                : setLoginBtnReact("Login");
            }}
          >
            {/* define the initial value od state variable(ex: login)  */}
            {loginBtnReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComponent;
