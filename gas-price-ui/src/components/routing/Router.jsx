import React from "react";
import Map from "../map/Map";
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
          <Route path="/" element={<MapAccess/>} />
          <Route path="/map" element={<Map />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
