import { useEffect, useState } from "react";
import { getUsers, getPagedDataAsList } from "../../network/discord";
import { useContext } from "react";
import { Context as DataContext } from "../../context/DataContext";
import ClientPaginatedList from "../ClientPaginatedList";
import LoadingWidget from "../statusIndicators/LoadingWidget";
import calendarIcon from "../../assets/calendar.svg";

const RoleManagementModal = ({selectedRole, onExit}) => {
    const {state:{users}, setUsers} = useContext(DataContext);
    const [loading,setLoaded] = useState(true);
    const [selectedUser,setSelectedUser] = useState(null);

    const UserCard = ({ item }) => {
        return(
            <div 
                className={ selectedUser?.id === item.id ?  "item userItem selected" : "item userItem" }
                onClick={() => setSelectedUser(item)}
            >
                <p>{item.user_name}</p>
            </div>
        )
    }

    useEffect(() => {
        //Load the users
        getPagedDataAsList("/authorisation/users?page_size=3").then((response) => {
            console.log("RETRIEVED USERS", response);
            setUsers(response);
            setLoaded(false);
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
                        {
                            loading 
                            ? <LoadingWidget />
                            : <div>
                                <div className="dashBoard">
                                    <ClientPaginatedList 
                                        items={users}
                                        pageSize={2}
                                        itemComponent={UserCard}
                                        className="paginator"
                                        gridClassName="itemSelector"
                                    />
                                    <div id="assignRoleDialog" className="panel">
                                        <p>Assign {selectedRole.name} to {selectedUser?.user_name}</p>
                                        <label htmlFor="eligibleFromDate">From</label>
                                        <div className="dateField">
                                            <input id="eligibleFromDate" type="text" />
                                            <button className="btn"><img src={calendarIcon} alt="calendar icon" /></button>
                                        </div>
                                        <label htmlFor="eligibleToDate">To</label>
                                        <div className="dateField">
                                            <input id="eligibleFromDate" type="text" />
                                            <button className="btn"><img src={calendarIcon} alt="calendar icon" /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="btnGroup">
                                    <button 
                                        className="btn alt"
                                        onClick={onExit}
                                    >Exit</button>
                                </div>
                            </div>
                        }
                    </div>
                    : null
                }
                {/* TODO : Need to create a paginated component that pages a list of items */}
                {/* <div>
                    {
                        users.map((u) => (
                            <p>{u.user_name}</p>
                        ))
                    }
                </div> */}
            </div>
        </div>
    )
}

export default RoleManagementModal;