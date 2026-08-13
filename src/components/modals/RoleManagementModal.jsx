import { useEffect } from "react";
import { getUsers, getPagedDataAsList } from "../../network/discord";
import { useContext } from "react";
import { Context as DataContext } from "../../context/DataContext";


const RoleManagementModal = ({selectedRole}) => {
    const {state:{users}, setUsers} = useContext(DataContext);

    useEffect(() => {
        //Load the users
        // getUsers().then((response) => {
        //     console.log("RETRIEVED USERS", response);
        // }).catch((err) => {
        //     console.error("Unable to retrieve the users", err);
        // });
        getPagedDataAsList("/authorisation/users?page_size=3").then((response) => {
            console.log("RETRIEVED USERS", response);
            setUsers(response);
        }).catch((err) => {
            console.error("Unable to retrieve the users", err);
        });
    },[]);

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
                {/* TODO : Need to create a paginated component that pages a list of items */}
                <div>
                    {
                        users.map((u) => (
                            <p>{u.user_name}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RoleManagementModal;