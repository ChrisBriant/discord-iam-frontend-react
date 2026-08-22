import { useState } from "react";
import ClientPaginatedList from "../UI/ClientPaginatedList";


const UserRoleManager = ({selectedRole, onExit}) => {
    console.log("SELECTED ROLE", selectedRole);
    const [disableRemove,setDisableRemove] = useState(true);
    const [selectedUser,setSelectedUser] = useState(true);

    const handleRemoveUserFromRole = (user) => {
        console.log("USER TO REMOVE", user);
    }

    const UserCard = ({ item }) => {
        console.log("USER ITEM", item);
        return(
            <div 
                className={ selectedUser?.id === item.user.id ?  "item userItem selected" : "item userItem" }
                onClick={() =>  {
                    if (item.user) setDisableRemove(false);
                    setSelectedUser(item.user);
                }}
            >
                <p>{item.user.user_name}</p>
            </div>
        )
    }

    return (
        <div id="userRoleManager" className="dashboard" >
            <ClientPaginatedList
                items={selectedRole.eligible_users_association}
                pageSize={10}
                itemComponent={UserCard}
                className="paginator"
                gridClassName="itemSelector"
            />
            <div className="btnGroup">
                <button 
                    className="btn alt"
                    onClick={onExit}
                >Exit</button>
                                                    <button 
                    className="btn alt"
                    onClick={handleRemoveUserFromRole}
                    disabled={disableRemove}
                >Remove</button>
            </div>
        </div>
    );
}


export default UserRoleManager;