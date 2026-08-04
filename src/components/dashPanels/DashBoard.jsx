import ChannelFeed from "./ChannelFeed";
import { EventCalendar } from "./EventCalendar";
import {Context as DataContext} from "../../context/DataContext";
import { useContext, useEffect } from "react";
import { getEvents } from "../../network/discord";


const DashBoard = () => {
    const {state:{events}, setEvents} = useContext(DataContext);

    console.log("DASHBOARD MOUNTED", events);

    useEffect(() => {
        getEvents().then(res => {
            console.log("Event data", res);
            setEvents(res);
        }).catch((err) => {
            console.error("An error occurred fetching the events", err);
        });
    },[]);

    return(
        <div className="dashBoard">
            <ChannelFeed />
            <EventCalendar events={events} />
        </div>
    );
}

export default DashBoard;