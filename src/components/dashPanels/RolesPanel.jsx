import { Context as DataContext } from "../../context/DataContext";
import { useEffect, useContext, useState } from "react";
import { getRoles, goToPage } from "../../network/discord";
import { PaginatedList } from "../PaginatedList";
import RoleManagementModal from "../modals/RoleManagementModal";




const RolesPanel = () => {
    const {state:{roles}, setRoles} = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const [selectedRole,setSelectedRole] = useState(null);
    const [roleToManage, setRoleToManage] = useState(null);

    const RoleCard = ({ item }) => {
        return(
            <div 
                className={ selectedRole === item.id ?  "item roleItem selected" : "item roleItem" }
                onClick={() => setSelectedRole(item.id)}
            >
                <p>{item.name}</p>
            </div>
        )
    }

    useEffect(() => {
        console.log("THESE ARE THE ROLES", roles);
        //Update the roles from the backend
        getRoles().then((res) => {
            console.log("ROLES FROM BACKEND", res);
            setRoles(res);
        }).catch(err => {
            console.log("An error occured");
            setErrorMessage("Unable to retrieve roles.");
        })
    },[]);

    const handlePageChange = async(page) => {
        console.log("WILL CHANGE PAGE", page);
        try {
            const newPage = await goToPage("roles",page);
            console.log("NEW PAGE", newPage);
            setRoles(newPage);
        } catch(err) {
            console.error("Error retrieving role data", err);
        }
    }

    const loadRolesDialog = () => {
        console.log("Role is", selectedRole);
        const selectedRoleObject = roles.data.filter((item) => item.id === selectedRole);
        console.log("SELECTED ROLE OBJECT", selectedRoleObject);
        setRoleToManage(selectedRoleObject[0]);
    }

    return(
        <>
            {
                roleToManage
                ? <RoleManagementModal 
                    selectedRole={roleToManage} 
                    onExit={() => setRoleToManage(null)}
                />
                : null
            }
            <div id="rolesPanel" className="">
                <h2 className="textAlt">Roles</h2>
                {   
                    !errorMessage
                    ? <PaginatedList 
                        paginatedData={roles}
                        itemComponent={RoleCard}
                        onPageChange={handlePageChange}
                        isLoading={loading}
                        className="paginator"
                        action={loadRolesDialog}
                        actionButtonName="Manage"
                    />
                    // ? roles.map((role) => (
                    //     <div key={role.id} className="roleItem">
                    //         { role.name }
                    //     </div>
                    // ))
                    : <p className="error">{errorMessage}</p>
                }
            </div>
        </>

    );
}

export default RolesPanel;