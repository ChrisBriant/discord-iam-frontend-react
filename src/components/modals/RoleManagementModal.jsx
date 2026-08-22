import { useState } from "react";
import RoleAssign from "../admin/RoleAssign";
import TabMenu from "../UI/TabMenu";
import UserRoleManager from "../admin/UserRoleManager";


const RoleManagementModal = ({selectedRole, onExit}) => {
    const [showTab, setShowTab] = useState("assign");

    const tabButtons = [
        {
            "name": "Assign Users",
            "onClick" : () => setShowTab("assign")
        },
        {
            "name": "User Roles",
            "onClick" : () => setShowTab("users")
        }
    ];


    return(
        <div className="calendar-modal-overlay">
            <div className="calendar-modal management-modal">
                <h1>{selectedRole.name}</h1>
                <TabMenu menuButtons={tabButtons} />
                {
                    showTab === "assign"
                    ? <RoleAssign selectedRole={selectedRole} onExit={onExit} />
                    : null

                }
                {
                    showTab ==="users"
                    ? <UserRoleManager selectedRole={selectedRole}  onExit={onExit}/>
                    : null
                }
            </div>

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