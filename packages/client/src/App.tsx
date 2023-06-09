import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import contracts from "./contracts/AIUniverse";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { Entity, Has, getComponentValueStrict } from "@latticexyz/recs";
import axios from "axios";

export const App = () => {
  const [Metadata, setMetadata] = useState<any>();
  const [url, setUrl] = useState<string>();
  const [entities, setEntities] = useState<any>([]);
  const [res, setRes] = useState<any>([]);
  const {
    components: { Players, Parsed },
    systemCalls: { createCharacter, toggleParsed },
    network: { singletonEntity },
  } = useMUD();

  const { data, isError, isLoading } = useContractRead({
    address: "0xd74c4701cc887ab8b6b5302ce4868c4fbc23de75",
    abi: contracts,
    functionName: "tokenURI",
    args: [BigInt(1)],
  });

  console.log(data as string);

  useEffect(() => {
    if (data) {
      try {
        async function fetchMetadata() {
          const response = await fetch(data as string);
          const json = await response.json();
          setMetadata(json);
          console.log(json);
        }
        fetchMetadata();
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (Metadata && Metadata.image) {
      const ipfsGateway = "https://ipfs.io"; // Choose a gateway
      const imageUrl = Metadata.image.replace(
        "ipfs://",
        `${ipfsGateway}/ipfs/`
      );
      setUrl(imageUrl);
    }
  }, [Metadata]);

  const counter = useComponentValue(Players, singletonEntity);

  // todo: add a button to create a new character sheet

  const playerIds = useEntityQuery([Has(Players), Has(Parsed)]);
  const toggleAllParsed = async () => {
    for (const id of playerIds) {
      const parsed = getComponentValueStrict(Parsed, id);
      if (parsed.value === false) {
        await toggleParsed(id);
        const entities = [];
        const playerData = getComponentValueStrict(Players, id);
        entities.push(playerData);
        setEntities(entities);
      }
    }
    // Now, send the entities array to your server using a POST request.
    // Replace 'http://your-server.com/api-endpoint' with your actual API endpoint.
    async function getChainOutput() {
      try {
        const response = await axios.post("http://localhost:3000/api/query", {
          ActiveEntities: JSON.stringify(entities),
        });

        console.log(response, "restinpieces");
        setRes(response); // Logs the response from the server

        console.log(res, "res");
      } catch (error) {
        console.error("Error fetching scanning report:", error);
      }
      console.log(res, "res");
    }

    getChainOutput();
  };
  console.log(res, "res.data");
  return (
    <>
      Space Opera
      <br />
      Connect your AI-Universe Character to the Game State <br />
      // Read AIU Character
      <br />
      <br />
      {Metadata?.name}
      {Metadata?.description}
      <br />
      <div>
        ALL THEM STATES
        {[...playerIds].map((id) => {
          const playerData = getComponentValueStrict(Players, id);
          const parsed = getComponentValueStrict(Parsed, id);
          return (
            <div>
              {playerData.name}
              {playerData.level}{" "}
              {parsed.value === true ? "parsed" : "not parsed"}
              <button
                type="button"
                onClick={async (event) => {
                  toggleParsed(id);
                  event.preventDefault();
                }}
              >
                Toggle
              </button>
            </div>
          );
        })}
        <span>NOT PARSED</span>
        {[...playerIds].map((id) => {
          const playerData = getComponentValueStrict(Players, id);
          const parsed = getComponentValueStrict(Parsed, id);
          if (parsed.value === false)
            return (
              <div>
                {playerData.name}
                {playerData.level}{" "}
                <button
                  type="button"
                  onClick={async (event) => {
                    toggleParsed(id);
                    event.preventDefault();
                  }}
                >
                  Toggle
                </button>
              </div>
            );
          else {
            <> </>;
          }
        })}
      </div>
      <img style={{ width: "300px", height: "300px" }} src={url} />
      <div>
        Create Character Sheet <br /> Counter:{" "}
        <span>{Metadata?.name ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          createCharacter(
            Metadata?.attributes[1].value ?? "??",
            Metadata?.attributes[2].value ?? "??"
          );
          event.preventDefault();
        }}
      >
        Increment
      </button>
      <button
        type="button"
        onClick={async (event) => {
          toggleAllParsed();
          event.preventDefault();
        }}
      >
        Toggle
      </button>
    </>
  );
};
