import { redirect, useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
import { useEffect } from "react";
import { json, useLoaderData, useRouteLoaderData } from 'react-router-dom';

function EventDetailPage(){
    const data = useRouteLoaderData('event-detail');
    return (
        <>
            <EventItem event={data.event}></EventItem>
        </>
    )
}

export default EventDetailPage;

export async function loader({request, params}) {
    const response = await fetch('http://localhost:8080/events/' + params.eventId);
    
    if (!response.ok) {
      // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
      //   status: 500
      // })
      throw json(
        {message: 'Could not fetch events.'}, 
        {
          status: 500,
        }
      );
    } else {
      // response is a Promise
      return response;
    }
}

export async function action({params, request}){
    const data = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + data, {
        method: request.method
    });
  
    if (!response.ok) {
        // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
        //   status: 500
        // })
        throw json(
        {message: 'Could not delete event.'}, 
        {
            status: 500,
        }
        );
    } else {
        // response is a Promise
        return redirect('/events');
    }
}