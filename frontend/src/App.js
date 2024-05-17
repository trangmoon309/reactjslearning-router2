// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, {loader as eventDetailLoader, action as deleteAction} from "./pages/EventDetail";
import EventPage, {loader as eventsLoader} from "./pages/Events";
import NewEventPage, {action as newEventAction} from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";
import {action as manipulatonEventAction} from './components/EventForm';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {index: true, element: <HomePage></HomePage>},
      {
        path: 'events', 
        element: <EventsRootLayout></EventsRootLayout>,
        children: [
          {
            index: true, 
            element: <EventPage></EventPage>, 
            // This loader will return a Promise
            loader: eventsLoader
          },
          {
            path: ':eventId', 
            // Không cần phải tạo layout component cho chỗ này, nhưng vẫn có thể
            // share loader cho children được.
            // Vì khi useLoaderdata, nó sẽ lấy data cho same level/ lower level
            loader: eventDetailLoader,
            id: 'event-detail',
            children: [
              {
                index: true, 
                element: <EventDetailPage></EventDetailPage>, 
                action: deleteAction
              },
              {
                path: 'edit', 
                element: <EditEventPage></EditEventPage>,
                action: manipulatonEventAction}
            ]
          },
          {
            path: 'new', 
            element: <NewEventPage></NewEventPage>, 
            action: manipulatonEventAction
          },
        ]
      },
    ]},
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
