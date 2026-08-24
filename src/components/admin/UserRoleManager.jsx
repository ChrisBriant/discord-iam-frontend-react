import { useState, useContext } from "react";
import ClientPaginatedList from "../UI/ClientPaginatedList";
import { unassignEligible } from "../../network/discord";
import { Context as DataContext} from "../../context/DataContext";
import { Context as AuthContext} from "../../context/AuthContext";
import { replaceItem } from "../../utils/utils";


const UserRoleManager = ({selectedRole, onExit, onError}) => {
    console.log("SELECTED ROLE", selectedRole);
    const [disableRemove,setDisableRemove] = useState(true);
    const [selectedUser,setSelectedUser] = useState(null);
    const {state:{users, roles}, setUsers, setRoles} = useContext(DataContext);
    const {state:{profile}, setEligibleRoles, setProfile} = useContext(AuthContext);

    const handleRemoveUserFromRole = async (user) => {
        onError("");
        try {
            const res =  await unassignEligible({
                "role_id": parseInt(selectedRole.id), 
                "user_id": parseInt(selectedUser.id)
            });
            // const res = {
            //     "id": 6,
            //     "discord_id": "1526484437724958760",
            //     "user_name": "mechametacatio",
            //     "global_name": "Mecha Meta Cat IO",
            //     "created_at": "2026-07-15T05:33:21.731110Z",
            //     "terms_accepted": true,
            //     "enabled": true,
            //     "roles": [],
            //     "eligible_roles_association": [
            //         {
            //             "role": {
            //                 "id": 13,
            //                 "discord_id": "1526457822857007234",
            //                 "name": "TEST ROLE 2"
            //             },
            //             "start_date": "2026-07-25T02:16:34.076781Z",
            //             "end_date": "2026-08-26T02:16:34.076783Z"
            //         }
            //     ]
            // }


            const roleToUpdate = roles.filter(r => r.id === selectedRole.id)[0];
            //Remove the eligible association
            const newEligibleUsersAssociations = roleToUpdate.eligible_users_association.filter(ellig => ellig.user.id !== res.id);
            roleToUpdate.eligible_users_association = newEligibleUsersAssociations;
            replaceItem(roles,roleToUpdate);
            console.log("NEW ROLES", roles);
            setRoles(roles);

            //Do this only if the user performing the action is the user
            if(profile.id === res.id ) {
                const newEligibleRoles = res.eligible_roles_association;
                setEligibleRoles(newEligibleRoles);
                const newProfile = profile ? { ...profile, user_data: res } : profile;
                console.log("New Profile", newProfile);
                setProfile(newProfile);
            }

   
            //Replace the user
            const newUsers = users.map(user => user.id === res.id ? res : user);
            setUsers(newUsers);
            onExit();
        } catch(err) {
            console.error("An error occurred removing the eligible role", err);
            onError("An error occurred removing the eligible role");
        }
        
    }

    const UserCard = ({ item }) => {
        console.log("USER ITEM", item, selectedUser);
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