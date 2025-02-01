import HeaderComponent from "./Components/Header";
//import BodyComponent from "./Components/Body";
import "./index.css";
import './App.css';
import {Outlet} from 'react-router-dom';


function App() {
  return (
    <div className="App py-2 px-2 w-full">
        <HeaderComponent />
        <Outlet />
    </div>
  );
}

export default App;
