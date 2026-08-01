import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import {getChannels} from "../network/discord";
import ChannelList from "./ChannelList";

const SideBar = () => {
    const {state:{profile,activeRoles,eligibleRoles}} = useContext(AuthContext);
    const {state:{channels}, setChannels} = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(!channels) {
            
        }
        getChannels().then((data) => {
            console.log("CHANNELS", data);
            setChannels(data);
        }).catch(err => {
            console.log("Error", err);
            setErrorMessage("An error occurred retrieving the channels");
        });


    },[]); 

    console.log("STATE Eligible ROLES", eligibleRoles);

    return(
        <div className="sideBar">
            <div className="title">
                <h3><strong>Hello</strong></h3>
                {
                    profile
                    ? <h3 id="userName">{profile.user_data.user_name}</h3>
                    : null
                }
            </div>
            {/* if the user has eligible roles then it will have a link to the admin console */}
            <div className="btn-group">
                {
                    eligibleRoles.length > 0
                    ? <button className="btn">Admin</button>
                    : null
                }
            </div>
            <div className="channelsList">
                {
                    errorMessage === ""
                    ? <ChannelList />
                    : <p className="error">Unable to obtain channels</p>
                }
            </div>

            
        </div>
    );
}

export default SideBar;