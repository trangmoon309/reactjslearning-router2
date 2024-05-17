
import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

function NewEventPage(){
    return (
        <>
            <EventForm method="post"></EventForm>
        </>
    )
}

export default NewEventPage;