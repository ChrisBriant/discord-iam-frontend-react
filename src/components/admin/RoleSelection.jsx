import { useContext } from "react";
import {Context as AuthContext} from "../../context/AuthContext";

const RoleSelection = () => {
    const {state:{eligibleRoles, activeRoles }} = useContext(AuthContext);

    console.log("ROLE SELECTION", eligibleRoles, activeRoles);

    return(
        <div id="roleSelection" className="panel">
            <div className="myRoles panel panelAlt">
                <div className="head">
                    <h3>Active Roles</h3>
                </div>
                {
                    activeRoles.length > 0
                    ? activeRoles.map((role) => (
                        <div key={`active_${role.id}`} id={`active_${role.id}`}  className="listItem role">
                            <p>{role.name}</p>
                        </div>
                    ))
                    : <p>You do not have any active roles.</p>
                }
            </div>
            <div className="eligibleRoles panel">
                <div className="head">
                    <h3>Eligible Roles</h3>
                    <p>These are roles you can activate</p>
                </div>
                {
                    eligibleRoles.length > 0
                    ? eligibleRoles.map((role) => (
                        <div key={`elig_${role.role.id}`} id={`elig_${role.role.id}`} className="listItem role">
                            <p>{role.role.name}</p>
                        </div>
                    ))
                    : <p>You do not have any eligible roles.</p>
                }
            </div>
        </div>
    );
}

export default RoleSelection;