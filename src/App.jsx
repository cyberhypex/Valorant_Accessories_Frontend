import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { LandingPage } from "./LandingPage";
import { PageLayout } from "./PageLayout"; // 👈 New layout with Navbar + Outlet
import { Agents } from "./Agents/Agents";
import Maps from "./Map/MapComponent";
import { Weapons } from "./Weapons/Weapons";
import { GameModes } from "./GameModes/GameModes";
import { CompeTiers } from "./Compe/CompeTiers";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

       
        <Route element={<PageLayout />}>
          <Route path="/agents" element={<Agents />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/gamemodes" element={<GameModes />} />
          <Route path="/competetiers" element={<CompeTiers />} />
        </Route>
      </Routes>
    </Router>
  );
}
