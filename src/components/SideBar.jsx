import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DataContext } from "../context/DataContext";
import {getChannels, getFeed} from "../network/discord";
import ChannelList from "./ChannelList";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
    const {state:{profile,activeRoles,eligibleRoles}} = useContext(AuthContext);
    const {state:{channels,selectedChannel}, setChannels, setSelectedChannel, setFeed} = useContext(DataContext);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    console.log("SIDEBAR PATHNAME",location.pathname);

    useEffect(() => {

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
            {
                location.pathName === "/" || location.pathname === "/home"
                ? <div id="sideBarAdmin" className="btn-group">
                    {
                        eligibleRoles.length > 0
                        ? <button className="btn" onClick={() => navigate("/admin")}>Admin</button>
                        : null
                    }
                </div>
                : null
            }
            {/* Display Admin page button set */}
            {
                location.pathname === "/admin"
                ? <div id="sideBarAdmin" className="btn-group">
                    <button className="btn" onClick={() => navigate("/home")}>Home</button>
                </div>
                : null
            }

            {/* Display the channels depending on the page */}
            {
                location.pathName === "/" || location.pathname === "/home"
                ? <div className="channelsList">
                    <h3><strong>Channels</strong></h3>
                    {
                        errorMessage === ""
                        ? <ChannelList />
                        : <p className="error">Unable to obtain channels</p>
                    }
                </div>
                : null
            }
            {/* { Display the admin actions} */}
            {
                location.pathname === "/admin"
                ? <div className="channelsList">
                    <h3><strong>Actions</strong></h3>
                    </div>
                : null
            }


            
        </div>
    );
}

export default SideBar;