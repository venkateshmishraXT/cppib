export const MEDIA_TRACK_WATCH_INTERVAL = 1000;
export const DEFAULT_MEDIA_CONSTRAINTS = {
  camera: {
    video: {
      frameRate: 20,
      height: {
        min: 180,
        ideal: 360,
        max: 720,
      },
      width: {
        min: 320,
        ideal: 640,
        max: 1280,
      },
    },
  },
  audio: {
    audio: {
      echoCancellation: true,
      sampleRate: 32000,
      channelCount: 1,
      noiseSuppression: true,
    },
  },
};
export const TIME_SLICE_DEFAULT = 3000;
export const SOCKET_URL = 'https://aibot.hariom.uk'
export const CONVERSATION_STATUS = {
  STARTED: 'STARTED',
  WAITING: 'WAITING',
  ERROR: 'ERROR',
  STOPPED: 'STOPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
}