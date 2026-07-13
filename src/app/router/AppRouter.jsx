import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../../pages/Dashboard";
import MaintenancePlans from "../../pages/MaintenancePlan";
import Reports from "../../pages/Reports";
import WorkInstructions from "../../pages/WorkInstructions";
import Documents from "../../pages/Documents";
import Settings from "../../pages/Settings";
import NotFound from "../../pages/NotFound";
import MaintenanceRequest from "../../pages/MaintenanceRequest";
import RequestsQueue from "../../pages/RequestsQueue";
import WorkOrders from "../../pages/WorkOrders";
import WorkInstructionBuilder from "../../pages/WorkInstructionBuilder"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "maintenance-plans",
        element: <MaintenancePlans />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "work-instructions",
        element: <WorkInstructions />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      
        {
        path: "maintenance-request",
        element: <MaintenanceRequest />,
        },
        {
        path: "requests",
        element: <RequestsQueue />,
        },
        {
        path: "work-orders",
        element: <WorkOrders />,
        },
        {
        path: "work-instructions/new",
        element: <WorkInstructionBuilder />,
        },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);