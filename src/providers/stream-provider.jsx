import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_MEDIA_CONSTRAINTS,
  MEDIA_TRACK_WATCH_INTERVAL,
} from "../constants";

const StreamContext = createContext({
  stream: null,
  state: false,
});

export const StreamProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!stream) return;
    let watchTimer;
    const watchStreamTracks = () => {
      window.clearTimeout(watchTimer);
      watchTimer = window.setTimeout(() => {
        const tracks = stream.getTracks();
        const isAllTrackEnabled = tracks.every((track) => track.enabled);
        setState(isAllTrackEnabled);
        watchStreamTracks();
      }, MEDIA_TRACK_WATCH_INTERVAL);
    };
  }, [stream]);

  return (
    <StreamContext.Provider value={{ stream, state, setStream }}>
      {children}
    </StreamContext.Provider>
  );
};

export const useStream = () => {
  const { stream, setStream } = useContext(StreamContext);
  const [error, setError] = useState(null);
  const capture = async (media) => {
    free();
    const constraints = DEFAULT_MEDIA_CONSTRAINTS[media];
    const mediaStream = await window.navigator.mediaDevices.getUserMedia(
      constraints
    );
    if (mediaStream) {
      setStream(mediaStream);
    } else {
      setError("Failed to capture stream");
    }
  };
  const free = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setError(null);
  };
  return {
    stream,
    capture,
    free,
    error,
  };
};
