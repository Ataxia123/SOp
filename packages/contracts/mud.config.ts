import { mudConfig } from "@latticexyz/world/register";
import { resolveTableId } from "@latticexyz/config";

export default mudConfig({
  tables: {
    Movable: "bool",
    NonPlayer: "bool",
    Position:{
      dataStruct: false,
      schema: {
        x: "uint32",
        y: "uint32",
      },
    },
    Parsed: "bool",
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
      args: [resolveTableId("NonPlayer")],
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
