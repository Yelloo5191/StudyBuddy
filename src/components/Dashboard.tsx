"use client";
import { FaBook } from "react-icons/fa6";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import Music from "./Music/Music";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

function Dashboard(props: { appId: string; channelName: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await createClient().auth.getUser();
      setUser(data?.user ?? null);
    };
    fetchUser();
  }, []);

  return (
    <AgoraRTCProvider client={client}>
      <div className="flex flex-row max-h-screen overflow-hidden w-full shadow-md bg-dark_light p-8 gap-4 h-screen">
        <div className="flex flex-col gap-4 h-full w-full">
          {/* TITLE */}
          <div className="w-full h-16 flex flex-row justify-start gap-4 px-2 items-center shadow-md bg-dark rounded-lg">
            <FaBook size={30} />
            <h1 className="text-lg lg:text-2xl text-white">
              {props.channelName}
            </h1>
          </div>
          <div className="flex flex-row w-full h-full gap-4">
            <div className="flex flex-col w-full h-full gap-4">
              {/* FACECAMS */}
              <Videos channelName={props.channelName} AppID={props.appId} />
              <div className="flex items-center justify-between">
                <p className="text-green-400">Live</p>
                <a
                  className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
                  href="/"
                >
                  End Call
                </a>
              </div>
            </div>
            {/* CHAT */}
            <Chat room_id={props.channelName} />
          </div>
        </div>
        {/* MUSIC */}
        <div className="w-1/2 h-full bg-raisin_black rounded-lg flex flex-col">
          <Music userId={user?.id ?? ""} />
          
          <div className="flex h-full w-full justify-center items-center">
            <iframe
              // width="50%" 
              // height="100%" 
              src="https://www.youtube.com/embed/X7Xt2kIk6PE?autoplay=1&controls=0&disablekb=1&modestbranding=1&rel=0&mute=1"
              title="YouTube video player"
              style={{ pointerEvents: 'none',
              width: '25vw',
              height: '70vh',
              maxWidth: '1000px', 
              maxHeight: '800px',
              aspectRatio: '16/9', 
            }} 
              allow="autoplay; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const [muted, setMuted] = useState(false);
  const [hidden, setHidden] = useState(false);

  const router = useRouter();

  // Maximum allowed participants
  const maxParticipants = 2;
  const totalParticipants = remoteUsers.length + 1; // 1 for the local user

  // Prevent more users from joining if the limit is reached
  if (totalParticipants > maxParticipants) {
    router.push("/");
  }

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-full p-1">
      {/* Mute and Hide Camera Buttons */}
      <div className="flex flex-row h-10 justify-end gap-4 mb-4">
        <button
          onClick={() => {
            if (localMicrophoneTrack) {
              localMicrophoneTrack.setEnabled(muted);
            }
            setMuted(!muted);
          }}
          className="flex px-5 py-3 text-base font-medium items-center justify-center text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={() => {
            if (localCameraTrack) {
              localCameraTrack.setEnabled(hidden);
            }
            setHidden(!hidden);
          }}
          className="flex px-5 py-3 text-base font-medium items-center justify-center text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          {hidden ? "Show" : "Hide"} Camera
        </button>
      </div>
      <div
        className={`grid gap-1 flex-1`}
        style={{
          gridTemplateColumns: remoteUsers.length > 1 ? unit.repeat(2) : unit,
        }}
      >
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        />
        {remoteUsers.map((user) => (
          <RemoteUser key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
