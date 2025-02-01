import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/About";
import Contacts from "./Components/Contacts";
import Error from "./Components/Error";
import HomePage from "./Components/HomePage";
import BodyComponent from "./Components/Body";
import RestaurantMenu from "./Components/RestaurantMenu";

import App from "./App";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        path: "/",
        element: <BodyComponent />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />
      }
    ]
  },
 
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the App
root.render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>
);
