import { mudConfig } from "@latticexyz/world/register";
import { resolveTableId } from "@latticexyz/config";

export default mudConfig({
  tables: {
    Movable: "bool",
    Player: "bool",
    Position:{
      dataStruct: false,
      schema: {
        x: "uint32",
        y: "uint32",
      },
    },
    Players: {
      schema: {
        name: "string",
        level: "string",
      },
    },
  },
        
  modules: [
    {
      name: "KeysInTableModule",
      root: true,
      args: [resolveTableId("Player")],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Position")],
    },
  {
  name:"UniqueEntityModule",
  root: true,
  args:[],
  },
  
]
});
