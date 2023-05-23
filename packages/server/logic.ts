import {setup} from "./lib/mud/setup";
import { SetupResult } from "./lib/mud/setup";

const POLLING_INTERVAL = 10000; // Adjust this value to suit your needs




async function GameMaster() {
    const mud = await setup()
  
    setInterval(() => {
        try{
        pollData();
        }catch(e){
            console.log(e)
        }
        
    }, POLLING_INTERVAL) // this wil run every 1 second

    async function pollData() {

        const network = mud.network
        const components = mud.components
        const systemCalls = mud.systemCalls
    
       await  systemCalls.toggleParsed("1")
        console.log("Toggled parsed", mud.network.network.signer.get().getAddress())

    }

}


export default GameMaster;