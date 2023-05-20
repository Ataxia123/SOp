import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend }: SetupNetworkResult,
components: ClientComponents
) {

  const createCharacter = (name: string, level: string) => {
   worldSend("addCharacter", [name, level]);
  };

  return {
    createCharacter,
  };
}

