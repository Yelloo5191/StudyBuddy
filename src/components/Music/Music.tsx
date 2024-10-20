import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

function Music(props: { userId: string }) {
  const [music, setMusic] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchMusic = async () => {
      const { data, error } = await supabase
        .from("broadcasts")
        .select("url")
        .eq("user_id", props.userId);

      if (error) {
        console.error(error);
      }

      if (data) {
        setMusic(data.map((song: { url: string }) => song.url));
      } else {
        setMusic(["http://mp3-128.streamthejazzgroove.com"]);
      }
    };

    fetchMusic();

    const channel = supabase
      .channel("postgres_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "audio_sync" },
        (payload) => {
          setMusic((prevMusic) => [...prevMusic, payload.new.url]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [props.userId]);

  useEffect(() => {
    if (music.length > 0 && !currentSong) {
      setCurrentSong(music[0]);
    }
  }, [music, currentSong]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseInt(e.target.value) / 100;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        if (audioRef.current) {
          audioRef.current.volume =
            parseInt(volumeRef.current?.value || "0") / 100;
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (currentSong) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(currentSong);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  return (
    <div className="flex flex-col h-full w-full gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-white text-lg">Music</h1>
        <button className="text-white" onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {music.map((song, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center"
          >
            <p className="text-white">{song}</p>
            <button onClick={() => setCurrentSong(song)}>Play</button>
          </div>
        ))}
        <div className="flex flex-row justify-between items-center">
          <p className="text-white">Volume</p>
          <input
            type="range"
            min="0"
            max="100"
            ref={volumeRef}
            onChange={handleVolumeChange}
          />
        </div>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              setCurrentSong(null);
              setMusic([]);
              setIsPlaying(false);
            }}
          >
            Stop
          </button>

          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Music;
