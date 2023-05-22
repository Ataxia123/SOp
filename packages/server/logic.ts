import {setup} from "./lib/mud/setup";
import { SetupResult } from "./lib/mud/setup";

const POLLING_INTERVAL = 10000; // Adjust this value to suit your needs




async function GameMaster() {

    const mud = await setup()
    setInterval(() => {
        pollData();
    }, POLLING_INTERVAL) // this wil run every 1 second
    
    function pollData() {
        const network = mud.network
        const components = mud.components
        const systemCalls = mud.systemCalls
    
        systemCalls.toggleParsed("1")
        console.log("Toggled parsed", mud.network.network.signer.get().getAddress())

    }

}


export default GameMaster;