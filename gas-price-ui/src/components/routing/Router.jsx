import React from "react";
import { MapAccess } from "../../page/mapAccess/mapAccess";
import NotFound from "../notFound/NotFound";
import Navbar from "../navbar/Navbar";
import Statistics from "../statistics/Statistics";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export default function RouterFunction() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/map"/>} />
          <Route path="/map" element={<MapAccess />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
