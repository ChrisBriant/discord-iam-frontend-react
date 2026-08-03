import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import {getChannels, getFeed} from "../network/discord";
import ChannelList from "./ChannelList";

const SideBar = () => {
    const {state:{profile,activeRoles,eligibleRoles}} = useContext(AuthContext);
    const {state:{channels,selectedChannel}, setChannels, setSelectedChannel, setFeed} = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // if(!channels) {
            
        // }
        getChannels().then( async (data) => {
            console.log("CHANNELS", data);
            //Set the default channel if none selected
            if(!selectedChannel && data.length > 0) {
                setChannels(data);
                setSelectedChannel(data[0]);
                try {
                    const feedData = await getFeed(data[0].id);
                    console.log("FEED DATA", feedData);
                    setFeed(feedData);
                } catch(err) {
                    console.error("Unable to fetch feed");
                }
                
            }
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
            <div id="sideBarAdmin" className="btn-group">
                {
                    eligibleRoles.length > 0
                    ? <button className="btn">Admin</button>
                    : null
                }
            </div>
            <h3><strong>Channels</strong></h3>
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