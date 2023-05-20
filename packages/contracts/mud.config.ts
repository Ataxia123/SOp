import { mudConfig } from "@latticexyz/world/register";

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
  name:"UniqueEntityModule",
  root: true,
  args:[],
  },
]
});
