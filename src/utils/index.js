export const noop = (...args) => {};
export const generateSessionId = (length = 16) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const getAudioUrl = (audioFilePath, skipRelativeUrl = true) => {
  if(skipRelativeUrl) {
    return audioFilePath;
  }
  const url = new URL(audioFilePath);
  const origin = window.location.origin;
  return origin + url.pathname;
}
