import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import contracts from "./contracts/AIUniverse";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";

export const App = () => {
  const [Metadata, setMetadata] = useState<any>();
  const [url, setUrl] = useState<string>();
  const {
    components: { Players },
    systemCalls: { createCharacter },
    network: { singletonEntity },
  } = useMUD();

  const { data, isError, isLoading } = useContractRead({
    address: "0xd74c4701cc887ab8b6b5302ce4868c4fbc23de75",
    abi: contracts,
    functionName: "tokenURI",
    args: [BigInt(1)],
  });

  console.log(data as string);
  const response = fetch(data as string);

  useEffect(() => {
    if (data) {
      try {
        async function fetchMetadata() {
          const response = await fetch(data as string);
          const json = await response.json();
          setMetadata(json);
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

  return (
    <>
      Space Opera
      <br />
      Connect your AI-Universe Character to the Game State <br />
      // Read AIU Character
      {Metadata?.name}
      {Metadata?.description}
      <br />
      <img style={{ width: "300px", height: "300px" }} src={url} />
      <div>
        Create Character Sheet <br /> Counter:{" "}
        <span>{Metadata?.name ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          createCharacter(
            Metadata?.name ?? ("??" as string),
            Metadata?.description ?? ("??" as string)
          );
          event.preventDefault();
        }}
      >
        Increment
      </button>
    </>
  );
};