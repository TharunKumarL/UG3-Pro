import "../../../App.css";
import "../../components/css/Sport_TopBar.css"
import { Link } from "react-router-dom";

const Sport_TopBar = () => {
    return ( 
        <div>
        <div className="TopBar">
            <h3 className="home-name"> Home</h3> 
            <div className="navbar-things"></div>
                <Link to="/sport/owner/create">
                <h3> Create </h3>
                </Link>        
        </div>
        <hr></hr>
        </div>
     );
}
 

export default Sport_TopBar;
