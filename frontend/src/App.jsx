import {
  BrowserRouter,
  Routes,
  Route
}
from "react-router-dom";

import SubmitPage
from "./pages/SubmitPage";

import DashboardPage
from "./pages/DashboardPage";

import OpportunityPage
from "./pages/OpportunityPage";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<SubmitPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/opportunity/:id"
          element={<OpportunityPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}