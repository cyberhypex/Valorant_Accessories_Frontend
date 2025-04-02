import { Agents } from "./Agents/Agents";

import 'bootstrap/dist/css/bootstrap.min.css';
import { LandingPage } from "./LandingPage";
import Maps from "./Map/MapComponent";
import { GameModes } from "./GameModes/GameModes";



export default function App() {
  
  return (
    <>
    <LandingPage />
    <Agents />
    <Maps />
    
    
   </>
    

    
  )
}


