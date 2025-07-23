// src/videoExtractor.ts
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import cliProgress from "cli-progress";
import { loadTimeline } from "./loadTimeline";

export async function extractVideo(
  timelineFilePath: string,
  outputPath: string
): Promise<void> {
  // Validate that the timeline file exists
  if (!fs.existsSync(timelineFilePath)) {
    throw new Error(`Timeline file not found: ${timelineFilePath}`);
  }

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create a webpack bundle of the video
  const bundled = await bundle(
    path.resolve(__dirname, "..", "..", "src", "Root.tsx")
  );

  // Load the timeline data
  const timeline = loadTimeline(timelineFilePath);

  if (!timeline) {
    throw new Error("Failed to load timeline data from JSON file");
  }

  const baseUrl = "http://localhost:3000";

  console.log("🎬 Rendering started:", new Date().toLocaleString());
  console.log("📊 Timeline overlays count:", timeline?.overlays?.length || 0);
  console.log(
    "⏱️ Timeline duration:",
    timeline?.durationInFrames || 0,
    "frames"
  );

  // Create progress bar
  const progressBar = new cliProgress.SingleBar({
    format:
      "🎞️  Rendering |{bar}| {percentage}% | Frame {value}/{total} | ETA: {eta}s",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
    clearOnComplete: false,
    stopOnComplete: true,
  });

  // Initialize progress bar with total frames
  const totalFrames = timeline?.durationInFrames || 0;
  progressBar.start(totalFrames, 0);

  try {
    // Render the video
    await renderMedia({
      codec: "h264",
      audioCodec: "aac",
      serveUrl: bundled,
      outputLocation: outputPath,
      // Highest quality video settings
      crf: 23, // Lowest CRF for near-lossless quality (range 1-51, where 1 is highest quality)
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
        defaultPixelFormat: "yuv420p",
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
      // Progress callback to update progress bar
      onProgress: ({ renderedFrames, encodedFrames }) => {
        // Use encodedFrames as it represents the actual progress better
        const currentFrame = Math.max(renderedFrames, encodedFrames);
        progressBar.update(currentFrame);
      },
    });

    // Stop progress bar and show completion
    progressBar.stop();
    console.log("🎉 Rendering completed:", new Date().toLocaleString());
  } catch (error) {
    // Stop progress bar on error
    progressBar.stop();
    console.error("🚨 Rendering failed:", error);
    throw error;
  }
}
