export const detectSound = (stream, onSoundUpdate) => {
  const audioContext = new AudioContext();
  const audioStreamSource = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.maxDecibels = -10;
  analyser.minDecibels = -45;
  audioStreamSource.connect(analyser);
  const bufferLength = analyser.frequencyBinCount;
  const domainData = new Uint8Array(bufferLength);
  let animationFrame;
  let lastSoundTime = Date.now();
  let timer;
  const threshold = 1500;
  let cacheSoundDetected = false;
  const __onSoundUpdate = (soundDetected) => {
    if (cacheSoundDetected !== soundDetected) {
      onSoundUpdate(soundDetected);
      cacheSoundDetected = soundDetected;
    }
  };
  const listen = () => {
    let soundDetected = false;
    analyser.getByteFrequencyData(domainData);
    for (let i = 0; i < bufferLength; i++) {
      if (domainData[i] > 0) {
        soundDetected = true;
        lastSoundTime = Date.now();
        break;
      }
    }
    if (soundDetected) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      __onSoundUpdate(true);
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          if (Date.now() - lastSoundTime >= threshold) {
            __onSoundUpdate(false);
          }
        }, threshold);
      }
    }
    animationFrame = window.requestAnimationFrame(listen);
  };
  listen();
  return () => {
    window.clearTimeout(animationFrame);
  };
};
