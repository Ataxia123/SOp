import { OpenAI } from "langchain/llms"
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts"
import { ChatOpenAI } from "langchain/chat_models"
import { HumanChatMessage, SystemChatMessage } from "langchain/schema"
import { LLMChain, SqlDatabaseChain } from "langchain/chains"
import { PassThrough } from "stream"
import { SqlDatabase } from "langchain/sql_db";
import { CallbackManager } from "langchain/callbacks"
import { DataSource } from "typeorm";



export const methods = [
  {
    id: "translation",
    route: "/translate",
    method: "post",
    description: "Database query",
    inputVariables: [],
    execute: async (input) => {

      const datasource = new DataSource({
        type: "sqlite",
        host: "localhost",
        database: "Chinook.db",
      });
      
      const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
      });
      console.log(db)
      const chain = new SqlDatabaseChain({
        llm: new OpenAI({ temperature: 0 , openAIApiKey: process.env.OPENAI_API_KEY}),
        database: db,
        sqlOutputKey: "sql",
        
      });
      
      const res = await chain.call({ query: "How many tracks are there?" });
      /* Expected result:
       * {
       *   result: ' There are 3503 tracks.',
       *   sql: ' SELECT COUNT(*) FROM "Track";'
       * }
       */
      return res
    },
  },
  {
    id: "translation",
    route: "/translate",
    method: "post",
    description: "Translates a text from one language to another",
    inputVariables: ["Input Language", "Output Language", "Text"],
    execute: async (input) => {
      const llm = new OpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY })

      const template =
        "Translate the following text from {Input Language} to {Output Language}\n```{Text}```\n\n"
      const prompt = new PromptTemplate({
        template,
        inputVariables: Object.keys(input),
      })
      const chain = new LLMChain({ llm, prompt })
      const res = await chain.call(input)
      return res
    },
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
