
// import { useContext } from "react";
// import { Context as DataContext } from "../../context/DataContext";

const RoleManagementModal = ({selectedRole}) => {
    //const {state:{selectedRole}} = useContext(DataContext);

    return(
        <div className="calendar-modal-overlay">
            <div className="calendar-modal">
                {
                    selectedRole
                    ? <div id="roleManagement">
                        <h1>{selectedRole.name}</h1>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default RoleManagementModal;