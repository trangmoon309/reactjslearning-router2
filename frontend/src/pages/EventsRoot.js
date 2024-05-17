import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventsRootLayout(){
    return (
        <>
            <EventsNavigation></EventsNavigation>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default EventsRootLayout;