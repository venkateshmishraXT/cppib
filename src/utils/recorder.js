import { TIME_SLICE_DEFAULT } from "../constants";
import { noop } from "./index";
import { detectSound } from "./detect-sound";

export default class Recorder {
  constructor(socket, stream, conversationId) {
    try {
      this.stream = stream;
      this.conversationId = conversationId;
      this.__isDiscontinuity = true;
      this.__socket = socket;
      this.__tempRecordingData = [];
      this.mr = new MediaRecorder(stream, { type: "audio/webm;codecs=opus" });
      this.__timeSlice = TIME_SLICE_DEFAULT;
      this.__fileNumber = 0;
      this.__bindEvents();
      this.__readyToSendRecording = false;
      this.__isUserSpeaking = true;
      this.start();
      detectSound(stream, this.__onSoundUpdate.bind(this));
    } catch (err) {
      console.log("media recording error", err);
    }
  }
  static isSupported() {
    if (
      window.MediaRecorder &&
      window.MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ) {
      return true;
    }
    return false;
  }
  __onSoundUpdate(soundDetected) {
    this.__isUserSpeaking = soundDetected;
    if (soundDetected) {
      this.start();
    } else {
      this.stop();
    }
  }
  __bindEvents() {
    this.mr.onresume = this.__onResume.bind(this);
    this.mr.onstart = this.__onStart.bind(this);
    this.mr.onstop = this.__onStop.bind(this);
    this.mr.onpause = this.__onPause.bind(this);
    this.mr.onerror = this.__onError.bind(this);
    this.mr.ondataavailable = this.__onDataAvailable.bind(this);
  }

  start() {
    this.__readyToSendRecording = false;
    if (!this.__isUserSpeaking) return;
    try {
      if (this.mr.state === "inactive") {
        this.mr.ondataavailable = this.__onDataAvailable.bind(this);
        this.mr.start();
        this.__timer = setTimeout(() => {
          this.stop();
        }, TIME_SLICE_DEFAULT);
      }
    } catch (e) {
      console.error("Could not start recorder ");
    }
  }
  stop(onConversationStopped) {
    this.onConversationStopped = onConversationStopped;
    if (this.mr.state === "recording") {
      this.__readyToSendRecording = true;
      this.mr.stop();
    }
    if (this.mr.state === "inactive") {
      if (this.__tempRecordingData.length === 0) {
        typeof onConversationStopped === "function" && onConversationStopped();
      }
    }
  }
  __onPause() {}
  __onStart() {
    this.__isDiscontinuity = true;
  }
  __onStop() {}
  __onDataAvailable(e) {
    if (!e.data || !e.data.size) {
      return;
    }
    this.__tempRecordingData.push(e.data);
    clearTimeout(this.__tmpTimer);
    this.__tmpTimer = setTimeout(() => {
      if (this.__readyToSendRecording) {
        this.__sendRecordingData();
        this.start();
      }
    }, 50);
  }
  __onResume() {}
  __onError(e) {
    console.error("Error in recorder ", e);
  }
  __sendRecordingData() {
    const blobToBeSent = new Blob(this.__tempRecordingData, {
      type: this.__tempRecordingData[0].type,
    });
    const fileName = `${this.__fileNumber}.webm`;
    this.__socket.emit("audio", fileName, this.conversationId, blobToBeSent);
    this.__fileNumber++;
    this.__tempRecordingData = [];
    typeof this.onConversationStopped === "function" &&
      this.onConversationStopped();
  }
}
