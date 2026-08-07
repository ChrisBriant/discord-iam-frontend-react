import { useContext, useState } from "react";
import {Context as AuthContext} from "../../context/AuthContext";
import { hasExpired } from "../../utils/utils";

const RoleSelection = () => {
    const {state:{eligibleRoles, activeRoles }} = useContext(AuthContext);
    const [selectedEligibleRole, setSelectedEligibleRole] = useState(null);

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
                    <p>These are roles you can activate.</p>
                </div>
                <div className="listBox">
                    {
                        eligibleRoles.length > 0
                        ? eligibleRoles.map((role) => (
                            <div 
                                    key={`elig_${role.role.id}`} 
                                    id={`elig_${role.role.id}`} 
                                    className={
                                        hasExpired(role.end_date) 
                                        ? selectedEligibleRole === role.role.id 
                                            ? "listItem role expired selected"
                                            : "listItem role expired" 
                                        
                                        : selectedEligibleRole === role.role.id  
                                        ? "listItem role selected" 
                                        : "listItem role" 
                                    }
                                    onClick = {() => !hasExpired(role.end_date) ? setSelectedEligibleRole(role.role.id) : setSelectedEligibleRole(null)}
                                >
                                <p>{role.role.name}</p>
                            </div>
                        ))
                        : <p>You do not have any eligible roles.</p>
                    }
                </div>
                <div className="btnGroup">
                    <button className="btn" disabled = { !selectedEligibleRole }>Activate</button>
                </div>
                

            </div>
        </div>
    );
}

export default RoleSelection;