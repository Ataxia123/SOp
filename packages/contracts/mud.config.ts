import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Players: {
      schema: {
        name: "string",
        level: "string",
      },
    }
  },
        
modules: [
  {
  name:"UniqueEntityModule",
  root: true,
  args:[],
  },
]
});
