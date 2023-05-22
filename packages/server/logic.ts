import {setup} from "./lib/mud/setup";
import { SetupResult } from "./lib/mud/setup";

const POLLING_INTERVAL = 1000; // Adjust this value to suit your needs




async function GameMaster(mud: any) {
 

    const network = mud.network
    const components = mud.components
    const systemCalls = mud.systemCalls

    await systemCalls.toggleParsed("1")
    console.log("Toggled parsed", mud.network.network.signerOrProvider)

}


export default GameMaster;