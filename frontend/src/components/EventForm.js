import { redirect, json, Form, useNavigate } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event && event.title} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event && event.image} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event && event.date} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event && event.description} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({request, params}){
  const data = await request.formData();
  const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description')
  };

  let url = 'http://localhost:8080/events';

  if(request.method === 'PATCH'){
    url = 'http://localhost:8080/events/' + params.eventId;
  }

  const response = await fetch(url, {
      method: request.method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
  });

  if (!response.ok) {
      // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
      //   status: 500
      // })
      throw json(
      {message: 'Could not save event.'}, 
      {
          status: 500,
      }
      );
  } else {
      // response is a Promise
      return redirect('/events');
  }
}