// DataStreamContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataStreamContext = createContext();

export function DataStreamProvider({ children, client }) {
  const [dataStreamId, setDataStreamId] = useState(null);
  const [messageHandlers, setMessageHandlers] = useState([]);

  useEffect(() => {
    if (client) {
      const createDataStream = async () => {
        try {
          const streamId = await client.createDataStream({
            ordered: true,
            reliable: true,
          });
          setDataStreamId(streamId);
          console.log("Data stream created with id:", streamId);
        } catch (err) {
          console.error("Failed to create data stream:", err);
        }
      };

      if (client.connectionState === "CONNECTED") {
        createDataStream();
      } else {
        client.on("connection-state-change", (curState) => {
          if (curState === "CONNECTED") {
            createDataStream();
          }
        });
      }

      const handleMessage = (uid, streamId, data) => {
        const message = JSON.parse(data);
        messageHandlers.forEach((handler) => handler(message));
      };

      client.on("stream-message", handleMessage);

      return () => {
        client.off("stream-message", handleMessage);
      };
    }
  }, [client, messageHandlers]);

  const sendMessage = (message) => {
    if (dataStreamId !== null && client) {
      client
        .sendStreamMessage(dataStreamId, JSON.stringify(message))
        .catch((err) => {
          console.error("Failed to send message:", err);
        });
    }
  };

  const registerMessageHandler = (handler) => {
    setMessageHandlers((prevHandlers) => [...prevHandlers, handler]);
  };

  const unregisterMessageHandler = (handler) => {
    setMessageHandlers((prevHandlers) =>
      prevHandlers.filter((h) => h !== handler)
    );
  };

  return (
    <DataStreamContext.Provider
      value={{ sendMessage, registerMessageHandler, unregisterMessageHandler }}
    >
      {children}
    </DataStreamContext.Provider>
  );
}

export function useDataStream() {
  return useContext(DataStreamContext);
}
