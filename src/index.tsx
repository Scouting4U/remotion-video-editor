// src/index.tsx
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import { loadTimeline } from "./loadTimeline";

const main = async () => {
  // Create a webpack bundle of the video
  const bundled = await bundle(path.resolve("src/Root.tsx"));

  // Load the timeline data
  const timeline = loadTimeline("timeline.sample.json");

  // Ensure the output directory exists
  if (!require("fs").existsSync("out")) {
    require("fs").mkdirSync("out");
  }

  const baseUrl = "http://localhost:3000";

  console.log('STARTED: ', new Date());

  // Render the video
  await renderMedia({
    codec: "h264",
    audioCodec: "aac",
    serveUrl: bundled,
    outputLocation: "out/video.mp4",
        // Highest quality video settings
    // crf: 1, // Lowest CRF for near-lossless quality (range 1-51, where 1 is highest quality)
    imageFormat: "jpeg", // Use PNG for highest quality frame captures
    colorSpace: "bt709", // Better color accuracy
    x264Preset: "ultrafast", // Highest quality compression
    // jpegQuality: 100, // Maximum JPEG quality for any JPEG operations
    composition: {
      id: "MyComp",
      height: 720,
      width: 1280,
      fps: 30,
      durationInFrames: timeline?.durationInFrames,
      defaultProps: {},
      props: {},
      defaultCodec: "h264",
      defaultOutName: "video",
      defaultVideoImageFormat: "jpeg",
      defaultPixelFormat: "yuv420p"
    },
    hardwareAcceleration: "if-possible",
    concurrency: 1,
    inputProps: {
      timeline,
      baseUrl,
    },
    // Handle media loading issues gracefully
     chromiumOptions: {
      headless: true,
      disableWebSecurity: true,
      ignoreCertificateErrors: true,
    },
    // Set a timeout for media loading
    timeoutInMilliseconds: 300000,
  });

  console.log('ENDED: ', new Date());

  console.log("Render complete! Video saved to out/video.mp4");
};

main().catch(console.error);
