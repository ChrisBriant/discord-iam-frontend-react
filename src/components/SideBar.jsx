import { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";


const SideBar = () => {
    const {state:{profile,activeRoles,eligibleRoles}} = useContext(AuthContext);

    console.log("STATE Eligible ROLES", eligibleRoles);

    return(
        <div className="sideBar">
            <div className="title">
                <h3><strong>Hello</strong></h3>
                {
                    profile
                    ? <h3 id="userName">{profile.user_data.user_name}</h3>
                    : null
                }
            </div>
            {/* if the user has eligible roles then it will have a link to the admin console */}
            {
                eligibleRoles.length > 0
                ? <h3>Admin</h3>
                : null
            }
            
        </div>
    );
}

export default SideBar;