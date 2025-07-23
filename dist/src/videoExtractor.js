"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVideo = extractVideo;
// src/videoExtractor.ts
const bundler_1 = require("@remotion/bundler");
const renderer_1 = require("@remotion/renderer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const loadTimeline_1 = require("./loadTimeline");
async function extractVideo(timelineFilePath, outputPath) {
    var _a;
    // Validate that the timeline file exists
    if (!fs_1.default.existsSync(timelineFilePath)) {
        throw new Error(`Timeline file not found: ${timelineFilePath}`);
    }
    // Create output directory if it doesn't exist
    const outputDir = path_1.default.dirname(outputPath);
    if (!fs_1.default.existsSync(outputDir)) {
        fs_1.default.mkdirSync(outputDir, { recursive: true });
    }
    // Create a webpack bundle of the video
    const bundled = await (0, bundler_1.bundle)(path_1.default.resolve(__dirname, "..", "..", "src", "Root.tsx"));
    // Load the timeline data
    const timeline = (0, loadTimeline_1.loadTimeline)(timelineFilePath);
    if (!timeline) {
        throw new Error("Failed to load timeline data from JSON file");
    }
    const baseUrl = "http://localhost:3000";
    console.log("🎬 Rendering started:", new Date().toLocaleString());
    console.log("📊 Timeline overlays count:", ((_a = timeline === null || timeline === void 0 ? void 0 : timeline.overlays) === null || _a === void 0 ? void 0 : _a.length) || 0);
    console.log("⏱️ Timeline duration:", (timeline === null || timeline === void 0 ? void 0 : timeline.durationInFrames) || 0, "frames");
    // Create progress bar
    const progressBar = new cli_progress_1.default.SingleBar({
        format: "🎞️  Rendering |{bar}| {percentage}% | Frame {value}/{total} | ETA: {eta}s",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
        clearOnComplete: false,
        stopOnComplete: true,
    });
    // Initialize progress bar with total frames
    const totalFrames = (timeline === null || timeline === void 0 ? void 0 : timeline.durationInFrames) || 0;
    progressBar.start(totalFrames, 0);
    try {
        // Render the video
        await (0, renderer_1.renderMedia)({
            codec: "h264",
            audioCodec: "aac",
            serveUrl: bundled,
            outputLocation: outputPath,
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
                durationInFrames: timeline === null || timeline === void 0 ? void 0 : timeline.durationInFrames,
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
    }
    catch (error) {
        // Stop progress bar on error
        progressBar.stop();
        console.error("🚨 Rendering failed:", error);
        throw error;
    }
}
