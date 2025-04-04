import { Agents } from "./Agents/Agents";

import 'bootstrap/dist/css/bootstrap.min.css';
import { LandingPage } from "./LandingPage";
import Maps from "./Map/MapComponent";
import { Weapons } from "./Weapons/Weapons";
import { GameModes } from "./GameModes/GameModes";
import { CompeTiers } from "./Compe/CompeTiers";





export default function App() {
  
  return (
    <>
    <LandingPage />
    <Agents />
    <Maps />
    <Weapons />
    <GameModes />
    <CompeTiers />

    
    
    
    
   </>
    

    
  )
}


