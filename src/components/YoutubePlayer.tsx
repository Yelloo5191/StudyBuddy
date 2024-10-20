// src/components/YouTubePlayer.tsx
"use client";

import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useDataStream } from "./DataStreamContext";

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const { sendMessage, registerMessageHandler, unregisterMessageHandler } =
    useDataStream();
  const playerRef = useRef<any>(null);
  const isRemoteUpdateRef = useRef<boolean>(false);

  useEffect(() => {
    const handleIncomingMessage = (message: any) => {
      if (playerRef.current && playerRef.current.internalPlayer) {
        const player = playerRef.current.internalPlayer;
        isRemoteUpdateRef.current = true;
        if (message.type === "PLAY") {
          player.seekTo(message.time, true);
          player.playVideo();
        } else if (message.type === "PAUSE") {
          player.seekTo(message.time, true);
          player.pauseVideo();
        }
        setTimeout(() => {
          isRemoteUpdateRef.current = false;
        }, 100);
      }
    };

    registerMessageHandler(handleIncomingMessage);

    return () => {
      unregisterMessageHandler(handleIncomingMessage);
    };
  }, [registerMessageHandler, unregisterMessageHandler]);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event: any) => {
    if (isRemoteUpdateRef.current) {
      return;
    }

    const player = event.target;
    const state = event.data;
    let message = null;
    if (state === 1) {
      // Playing
      const currentTime = player.getCurrentTime();
      message = { type: "PLAY", time: currentTime };
    } else if (state === 2) {
      // Paused
      const currentTime = player.getCurrentTime();
      message = { type: "PAUSE", time: currentTime };
    }

    if (message) {
      sendMessage(message);
    }
  };

  return (
    <div className="video-container">
      <YouTube
        videoId={videoId}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        opts={{
          playerVars: {
            autoplay: 0,
            controls: 1,
          },
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
