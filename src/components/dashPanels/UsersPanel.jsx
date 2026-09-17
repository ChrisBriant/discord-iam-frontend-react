import { Context as DataContext } from "../../context/DataContext";
import { useContext, useEffect, useState } from "react";
import { getPagedDataAsList } from "../../network/discord";
import ClientPaginatedList from "../UI/ClientPaginatedList";

const UsersPanel = () => {
    const {state:{users,events},setUsers} = useContext(DataContext);
    const [selectedUser,setSelectedUser] = useState(null);


    const UserCard = ({ item }) => {
        return(
            <div 
                className={ selectedUser?.id === item.id ?  "item userItem selected" : "item userItem" }
                onClick={() =>  {
                    if (item && (new Date(fromDate) < new Date(toDate))) setDisableAssign(false);
                    setSelectedUser(item);
                }}
            >
                <p>{item.user_name}</p>
            </div>
        )
    }
    
    useEffect(() => {
        //Get the users
        getPagedDataAsList("/authorisation/users").then((response) => {
            console.log("RETRIEVED USERS", response);
            setUsers(response);
            setLoaded(false);
        }).catch((err) => {
            console.error("Unable to retrieve the users", err);
        });
    },[]);

    console.log("MOUNTED USERS PANEL", users, events);

    return (
        <div id="userPanel" className="panel">
            {/* {
                users.map((user) => (
                    <div className="userItem">
                        <p>{user.userName}</p>
                    </div>
                ))
            } */}

            <ClientPaginatedList 
                items={users}
                pageSize={2}
                itemComponent={UserCard}
                className="paginator"
                gridClassName="itemSelector"
            />

        </div>
    );
}

export default UsersPanel;