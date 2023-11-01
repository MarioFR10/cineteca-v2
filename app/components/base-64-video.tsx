import { useState, useRef } from "react";

type Props = {
  base64String: string;
};

export function Base64Video({ base64String }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <div>
      {base64String && (
        <div>
          <video
            controls
            ref={videoRef}
            src={base64String}
            height={400}
            width={400}
          />
          <button onClick={togglePlay}>{isPlaying}</button>
        </div>
      )}
    </div>
  );
}
