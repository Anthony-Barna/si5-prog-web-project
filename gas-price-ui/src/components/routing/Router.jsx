import React from "react";
import Map from "../map/Map";
import Statistics from "../statistics/Statistics";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default function RouterFunction() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Map/>} />
          <Route path="/map" element={<Map />} />
          <Route path="/statistics" element={<Statistics />}>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
