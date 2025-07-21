// src/videoExtractor.ts
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";
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

  try {
    // Render the video
    await renderMedia({
      codec: "h264",
      serveUrl: bundled,
      outputLocation: outputPath,
      // Highest quality video settings
      crf: 1, // Lowest CRF for near-lossless quality (range 1-51, where 1 is highest quality)
      imageFormat: "png", // Use PNG for highest quality frame captures
      colorSpace: "bt709", // Better color accuracy
      x264Preset: "veryslow", // Highest quality compression
      jpegQuality: 100, // Maximum JPEG quality for any JPEG operations
      composition: {
        id: "MyComp",
        height: 720,
        width: 1280,
        fps: 30,
        durationInFrames: timeline?.durationInFrames || 300,
        defaultProps: {},
        props: {},
        defaultCodec: "h264",
        defaultOutName: "video",
        defaultVideoImageFormat: "png",
        defaultPixelFormat: "yuv420p",
      },
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
      // Set a shorter timeout for testing
      timeoutInMilliseconds: 120000, // 2 minutes instead of 5
      // Add progress callback
      onProgress: ({
        renderedFrames,
        encodedFrames,
        encodedDoneIn,
        renderedDoneIn,
      }) => {
        console.log(
          `🎬 Progress: ${renderedFrames} frames rendered, ${encodedFrames} frames encoded`
        );
      },
    });

    console.log("🎉 Rendering completed:", new Date().toLocaleString());
  } catch (error) {
    console.error("🚨 Rendering failed:", error);
    throw error;
  }
}
