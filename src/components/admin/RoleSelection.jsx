import { useContext, useState } from "react";
import {Context as AuthContext} from "../../context/AuthContext";
import { formatBritishDate, hasExpired } from "../../utils/utils";
import { activateRole, deactivateRole } from "../../network/discord";

const RoleSelection = () => {
    const {state:{eligibleRoles, activeRoles }, setActiveRoles} = useContext(AuthContext);
    const [selectedEligibleRole, setSelectedEligibleRole] = useState(null);
    const [selectedActiveRole,setSelectedActiveRole] = useState(null);

    console.log("ROLE SELECTION", eligibleRoles, activeRoles);

    const handleActivate = async (roleId) => {
        try {
            const activationResult = await activateRole(roleId);
            console.log("ACTIVATION RESULT", activationResult);
            setActiveRoles(activationResult.roles);
        } catch(err) {
            console.error("An error occurred activating the role", err);
        }
        
    }

    const handleDeactivate = async(roleId) => {
        try {
            const deactivationResult = await deactivateRole(roleId);
            console.log("DEACTIVATION RESULT", deactivationResult);
            setActiveRoles(deactivationResult.roles);
        } catch(err) {
            console.error("An error occurred activating the role", err);
        } 
    }

    return(
        <div id="roleSelection" className="panel">
            <div className="myRoles panel panelAlt">
                <div className="head">
                    <h3>Active Roles</h3>
                </div>
                {
                    activeRoles.length > 0
                    ? activeRoles.map((role) => (
                        <div 
                            key={`active_${role.id}`} 
                            id={`active_${role.id}`}
                            className= {
                                selectedActiveRole === role.id 
                                                ? "listItem activeRole selected"
                                                : "listItem activeRole"
                            }
                            onClick={() => setSelectedActiveRole(role.id)}  

                        >
                            <p>{role.name}</p>
                        </div>
                    ))
                    : <p>You do not have any active roles.</p>
                }
                <div className="btnGroup">
                    {
                        activeRoles.length > 0
                        ? <button className="btn alt" 
                            disabled = { !selectedActiveRole } 
                            onClick = {() => handleDeactivate(selectedActiveRole)}
                        >Deactivate</button>
                        : null
                    }

                </div>
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
                                <p className="cell">{role.role.name}</p>
                                <p className="cell">{formatBritishDate(role.end_date)}</p>
                            </div>
                        ))
                        : <p>You do not have any eligible roles.</p>
                    }
                </div>
                <div className="btnGroup">
                    <button className="btn" 
                        disabled = { !selectedEligibleRole } 
                        onClick = {() => handleActivate(selectedEligibleRole)}
                    >Activate</button>
                </div>
                

            </div>
        </div>
    );
}

export default RoleSelection;