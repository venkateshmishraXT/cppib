import React, { useEffect, useRef } from "react";
import { useStream } from "../../providers/stream-provider";
import { useConversations } from "../../providers/conversation-provider";

const AudioVisualiser = () => {
  const { stream } = useStream();
  const { activeAudioFile } = useConversations();
  const audioData = useRef(new Uint8Array(0));
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const source = useRef(null);
  const rafId = useRef(null);
  const canvas = useRef(null);
  const stopDrawing = useRef(true);
  const clearCanvas = () => {
    const canvasElement = canvas.current;
    if (canvasElement) {
      const ctx = canvasElement.getContext("2d");
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    }
  };
  const draw = () => {
    if (stopDrawing.current) return;
    analyser.current.getByteTimeDomainData(audioData.current);
    const canvasCurrent = canvas.current;
    const height = canvasCurrent.height;
    const width = canvasCurrent.width;
    const context = canvasCurrent.getContext("2d");
    let x = 0;
    const sliceWidth = (width * 1.0) / audioData.current.length;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);
    for (const item of audioData.current) {
      const y = (item / 255.0) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
    rafId.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (!stream || activeAudioFile) return;
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyser.current = audioContext.current.createAnalyser();
    audioData.current = new Uint8Array(analyser.current.frequencyBinCount);
    source.current = audioContext.current.createMediaStreamSource(stream);
    source.current.connect(analyser.current);
    stopDrawing.current = false;
    rafId.current = requestAnimationFrame(draw);

    return () => {
      clearCanvas();
      cancelAnimationFrame(rafId.current);
      analyser.current.disconnect();
      source.current.disconnect();
    };
  }, [stream, activeAudioFile]);

  if (activeAudioFile || !stream) {
    return null;
  }

  return <canvas width="200" height="35" ref={canvas} className="audioVisualiser" />;
};

export default AudioVisualiser;
