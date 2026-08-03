import { useContext, useEffect } from "react";
import {Context as DataContext} from "../../context/DataContext";
import LoadingWidget from "../statusIndicators/LoadingWidget.jsx";

const ChannelFeed = () => {
    const {state:{selectedChannel,feed}} = useContext(DataContext);
    useEffect(() => {

    },[feed]);

    console.log("MOUNTED", feed);

    return(
        <div className="panel channelFeed">
            {
                !selectedChannel
                ? <LoadingWidget />
                : <div className="feed">
                    {
                        feed.map((message) => (
                            <div key={message.id} id={message.id} className="messageItem">
                                <p>{message.author.user_name}&gt; {message.content}</p>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default ChannelFeed;
