// import { useEffect, useState, useContext } from "react";
// import { getUsers, getPagedDataAsList, setEligible } from "../../network/discord";
// import { Context as DataContext } from "../../context/DataContext";
// import { Context as AuthContext } from "../../context/AuthContext";
// import ClientPaginatedList from "../ClientPaginatedList";
// import LoadingWidget from "../statusIndicators/LoadingWidget";
// import calendarIcon from "../../assets/calendar.svg";
// //import { DatePicker } from "../UI/DatePicker";
// import { DateTimePicker } from "../UI/DateTimePicker";
// import { formatDate } from "../../utils/utils";

import RoleAssign from "../admin/RoleAssign";


const RoleManagementModal = ({selectedRole, onExit}) => {
    // const {state:{users, roles}, setUsers} = useContext(DataContext);
    // const {state:{eligibleRoles}, setEligibleRoles} = useContext(AuthContext);
    // const [loading,setLoaded] = useState(true);
    // const [selectedUser,setSelectedUser] = useState(null);
    // const [showDatePicker, setShowDatePicker] = useState(false);
    // const [fromDate,setFromDate] = useState(null);
    // const [toDate,setToDate] = useState(null);
    // const [selectedDateField, setSelectedDateField] = useState(null);
    // const [disableAssign,setDisableAssign] = useState(true);

    // const UserCard = ({ item }) => {
    //     return(
    //         <div 
    //             className={ selectedUser?.id === item.id ?  "item userItem selected" : "item userItem" }
    //             onClick={() =>  {
    //                 if (selectedUser && (new Date(fromDate) < new Date(toDate))) setDisableAssign(false);
    //                 setSelectedUser(item);
    //             }}
    //         >
    //             <p>{item.user_name}</p>
    //         </div>
    //     )
    // }

    // useEffect(() => {
    //     //Load the users
    //     getPagedDataAsList("/authorisation/users?page_size=3").then((response) => {
    //         console.log("RETRIEVED USERS", response);
    //         setUsers(response);
    //         setLoaded(false);
    //     }).catch((err) => {
    //         console.error("Unable to retrieve the users", err);
    //     });
    // },[]);

    // const handleDateSelection = ({ date, dateTimeString }) => {
    //     setDisableAssign(true);
    //     let newFromDate = fromDate;
    //     let newToDate = toDate;
    //     console.log('Formatted Date String:', dateTimeString); // "2026-08-17"
    //     if(selectedDateField === "eligibleFromDate") {
    //         newFromDate = date;
    //         setFromDate(newFromDate);
    //     } 
    //     if(selectedDateField === "eligibleToDate") {
    //         newToDate = date;
    //         setToDate(newToDate);
    //     }
    //     //Control the assignment button
    //     if(selectedUser && (new Date(newFromDate) < new Date(newToDate)) ) {
    //         console.log("DATE RANGE IS VALID");
    //         setDisableAssign(false);
    //     } else {
    //         console.log("INVALID DATE RANGE", newFromDate, newToDate);
    //     }
    //     setShowDatePicker(false);
    // };

    // const handlePickDate = (dateFieldId) => {
    //     setSelectedDateField(dateFieldId);
    //     setShowDatePicker(true);
    // }

    // const onAssign = async () => {
    //     console.log("PRESSED ON ASSIGN");
    //     if(!selectedRole || !selectedUser || !fromDate || !toDate) {
    //         return;
    //     }

    //     const payload = {
    //         "role_id": selectedRole.id,
    //         "user_id": selectedUser.id,
    //         "start_date": fromDate.toISOString(),
    //         "end_date": toDate.toISOString()
    //     }

    //     try {
    //         const res = await setEligible(payload);
    //         console.log("RES", res, eligibleRoles, roles);
    //         //Update role association data
    //         //BELOW MIGHT NEED TO GO INTO THE ROLES DATA
    //         const userEligibleAssociation = {
    //             "end_date" : toDate.toISOString(),
    //             "start_date" : fromDate.toISOString(),
    //             "user" : {
    //                 created_at : res.created_at,
    //                 discord_id : res.discord_id,
    //                 enabled : res.enabled,
    //                 global_name : res.global_name,
    //                 id : res.id,
    //                 terms_accepted : res.terms_accepted,
    //                 user_name : res.user_name
    //             }
    //         }
    //         // const roleToUpdate = roles.filter(r => r.id === selectedRole.id);
    //         // roleToUpdate.eligible_users_association = [...roleToUpdate.eligible_users_association,userEligibleAssociation];

    //         const newEligibleRoles = res.eligible_roles_association;
    //         console.log("NEW ELIGIBLE ROLES", newEligibleRoles);
    //         setEligibleRoles(newEligibleRoles);
    //         onExit();

    //     } catch(err) {
    //         console.error("An error occurred trying to assign the role.", err, eligibleRoles,activeRoles, roles);
    //     }

    // }

    return(
        <div className="calendar-modal-overlay">
            <RoleAssign selectedRole={selectedRole} onExit={onExit} />
            {/* {
                showDatePicker
                ? <div className="modal-overlay">
                    <DateTimePicker onSelectDateTime={handleDateSelection} />
                </div>
                : null
            }

            
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
                                            <input id="eligibleFromDate" type="text" value={formatDate(fromDate)} disabled={true} />
                                            <button className="btn" onClick={() => handlePickDate("eligibleFromDate")}><img src={calendarIcon} alt="calendar icon" /></button>
                                        </div>
                                        <label htmlFor="eligibleToDate">To</label>
                                        <div className="dateField">
                                            <input id="eligibleToDate" type="text" value={formatDate(toDate)} disabled={true} />
                                            <button className="btn" onClick={() => handlePickDate("eligibleToDate")}><img src={calendarIcon} alt="calendar icon" /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className="btnGroup">
                                    <button 
                                        className="btn alt"
                                        onClick={onExit}
                                    >Exit</button>
                                                                        <button 
                                        className="btn alt"
                                        onClick={onAssign}
                                        disabled={disableAssign}
                                    >Assign</button>
                                </div>
                            </div>
                        }
                    </div>
                    : null
                }
            </div> */}
        </div>
    )
}

export default RoleManagementModal;