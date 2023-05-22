import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;
const entityToBytes32 = (entity: string) => {
  return "0x" + entity.replace("0x", "").padStart(64, "0");
};
export function createSystemCalls(
  { worldSend }: SetupNetworkResult,
components: ClientComponents
) {

  const createCharacter = (name: string, level: string) => {
   worldSend("addCharacter", [name, level]);
  };
  const toggleParsed = (id: string) => {
    worldSend("isParsed", [entityToBytes32(id)]);
  };

  return {
    createCharacter,
    toggleParsed,
  };
}

