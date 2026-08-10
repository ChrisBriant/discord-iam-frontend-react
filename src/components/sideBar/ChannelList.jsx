import { useContext } from "react";
import {Context as DataContext} from "../../context/DataContext.jsx";
import { getFeed } from "../../network/discord.js";



const ChannelList = () => {
    const {state:{channels,selectedChannel}, setSelectedChannel,setFeed} = useContext(DataContext);

    const handleChangeChannel = async (channelId) => {
        //Get the new channel feed
        const newSelectedChannel = channels.filter((ch) => ch.id === channelId);
        if(newSelectedChannel.length > 0) {
            setSelectedChannel(newSelectedChannel[0]);
            //Get the feed
            try {
                const newFeed = await getFeed(newSelectedChannel[0].id);
                setFeed(newFeed);
            } catch(err) {
                console.error("Error getting the feed", err);
            }

        }
        console.log()
    }

    return(
        <div className="channelList">
            {
                channels.length > 0 && selectedChannel
                ? channels.map((ch) => (
                    <div key={ch.id} 
                        className={ch.id === selectedChannel.id ? "channelItem selected" : "channelItem" }
                        onClick={() => handleChangeChannel(ch.id)}
                        >
                        <p  >{ch.name}</p>
                    </div>
                ))
                : <p>Loading...</p>
            }
        </div>
    );
}

export default ChannelList;