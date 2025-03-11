// src/index.tsx or src/App.tsx

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error/page";
import ToptrackPage from "./pages/toptracks/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/toptracks",
    element: <ToptrackPage/>,
  },
]);

ReactDOM.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>,
  document.getElementById("root")
);
