import { OpenAI } from "langchain/llms";
import {
  PromptTemplate,
} from "langchain/prompts"
import { LLMChain, SqlDatabaseChain, SimpleSequentialChain } from "langchain/chains";
import { PassThrough } from "stream"
import { SqlDatabase } from "langchain/sql_db";
import { CallbackManager } from "langchain/callbacks"
import { DataSource } from "typeorm";


export const methods = [
  {
    id: "Database query",
    route: "/query",
    method: "post",
    description: "Database query",
    inputVariables: ["ActiveEntities"],
    execute: async (input) => {

// This is an LLMChain to write a synopsis given a title of a play.
const llm = new OpenAI({ temperature: 0 });
const template = `You are the entity creator for the AI Universe. Your task is to create new entities and map them to the IDs of the existing entities. You are given a list of entities:
 {ActiveEntities} and their corresponding IDs. 
an entity can be anything you think of you must return an array called newEntities with the following data:
newEntities:
[newEntityName: <entity name>
refID: <existingEntityId>]


`;
const promptTemplate = new PromptTemplate({
  inputVariables: ["ActiveEntities"],
  template,
});
const synopsisChain = new LLMChain({ llm, prompt: promptTemplate, outputKey: "newEntities" });

// This is an LLMChain to write a review of a play given a synopsis.
const reviewLLM = new OpenAI({ temperature: 0 });
const reviewTemplate = `You are a dungeon master AI for the Alliance of the infinite Universe.
Your goal is to create an interesting narrative using the entities given to you. You can use the entities in any way you want, but you must use at least one of them once.
  
  New Entities:
  {newEntities}
  Latest happenings in the ALliance of the infinite Universe:`;
const reviewPromptTemplate = new PromptTemplate({
  template: reviewTemplate,
  inputVariables: ["newEntities"],
});
const reviewChain = new LLMChain({
  llm: reviewLLM,
  prompt: reviewPromptTemplate,
  outputKey: "review",
});

const overallChain = new SimpleSequentialChain({
  chains: [synopsisChain, reviewChain],
  verbose: true,
  outputVariables: ["newEntities", "review"],
});
const res = await overallChain.run(input);
console.log(res);
return res;
    },
  },
  {
    id: "createEntity",
    route: "/createEntity",
    method: "post",
    description: "Translates a text from one language to another",
    inputVariables: ["New Entities"],
    execute: async (input) => {


    // This is an LLMChain to write a synopsis given a title of a play and the era it is set in.
    const llm = new OpenAI({ temperature: 0 });
    const template = `You are the entity creator for the AI Universe. Your task is to create new entities and map them to the IDs of the existing entities. You are given a list of entities {New Entities} and their corresponding IDs. 
    an entity can be anything you think of you must return an array with the following data:
    newEntities = {
        [newEntityName: <entity name>
        refID: <existingEntityId>]}

  `;
    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ["New Entities"],
    });
    const synopsisChain = new LLMChain({
      llm,
      prompt: promptTemplate,
      outputKey: "newEntities",
    });

    // This is an LLMChain to write a review of a play given a synopsis.
    const reviewLLM = new OpenAI({ temperature: 0});
    const reviewTemplate = `You are a dungeon master AI for the Alliance of the infinite Universe.
    Your goal is to create an interesting narrative using the entities given to you. You can use the entities in any way you want, but you must use at least one of them once.
      
      New Entities:
      {New Entities}
      Latest happenings in the ALliance of the infinite Universe:`;
    const reviewPromptTemplate = new PromptTemplate({
      template: reviewTemplate,
      inputVariables: ["New Entities"],
    });
    const reviewChain = new LLMChain({
      llm: reviewLLM,
      prompt: reviewPromptTemplate,
    });

    const overallChain = new SimpleSequentialChain({
      chains: [synopsisChain, reviewChain],
      // Here we return multiple variables
      verbose: true,
    });
    await overallChain.call(input).then((res) => {
    console.log(res);
    const result = res;
    res.send(result);
    return result;
    });},
      },
  {
    id: "poem",
    route: "/poem",
    method: "post",
    description: "Generates a short poem about your topic (Use as stream)",
    inputVariables: ["Topic"],
    execute: async (input) => {
      const outputStream = new PassThrough()

      const callbackManager = CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          outputStream.write(token)
        },
      })
      const llm = new OpenAI({
        temperature: 0,
        streaming: true,
        callbackManager,
        openAIApiKey: process.env.OPENAI_API_KEY
      })

      const template = "Write me very short a poem about {Topic}."
      const prompt = new PromptTemplate({
        template,
        inputVariables: Object.keys(input),
      })
      const chain = new LLMChain({ llm, prompt })

      chain.call(input).then((response) => {
        console.log(response)
        outputStream.end()
      })

      return { stream: outputStream }
    },
  },
]

