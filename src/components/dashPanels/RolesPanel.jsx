import { Context as DataContext } from "../../context/DataContext";
import { useEffect, useContext, useState } from "react";
import { getRoles } from "../../network/discord";

const RolesPanel = () => {
    const {state:{roles}} = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log("THESE ARE THE ROLES", roles);
        //Update the roles from the backend
        getRoles().then((res) => {
            console.log("ROLES FROM BACKEND", res);
        }).catch(err => {
            console.log("An error occured");
            setErrorMessage("Unable to retrieve roles.");
        })
    },[roles]);

    return(
        <div id="rolesPanel" className="panel">
            {   
                !errorMessage
                ? roles.map((role) => (
                    <div key={role.id} className="roleItem">
                        { role.name }
                    </div>
                ))
                : <p className="error">{errorMessage}</p>
            }
        </div>
    );
}

export default RolesPanel;