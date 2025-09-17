"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoLayerContent = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const url_helper_1 = require("../../utils/url-helper");
const react_2 = require("react");
const image_layer_content_1 = require("../images/image-layer-content");
/**
 * VideoLayerContent component renders a video layer with animations and styling
 *
 * This component handles:
 * - Video playback using Remotion's OffthreadVideo
 * - Enter/exit animations based on the current frame
 * - Styling including transform, opacity, border radius, etc.
 * - Video timing and volume controls
 *
 * @param props.overlay - Configuration object for the video overlay including:
 *   - src: Video source URL
 *   - videoStartTime: Start time offset for the video
 *   - durationInFrames: Total duration of the overlay
 *   - styles: Object containing visual styling properties and animations
 */
const VideoLayerContent = ({ overlay, baseUrl, }) => {
    var _a, _b, _c, _d, _e, _f;
    const frame = (0, remotion_1.useCurrentFrame)();
    (0, react_2.useEffect)(() => {
        console.log(`Preparing to load video: ${overlay.src}`);
        const handle = (0, remotion_1.delayRender)("Loading video");
        // Create a video element to preload the video
        const video = document.createElement("video");
        video.src = videoSrc;
        const handleLoadedMetadata = () => {
            console.log(`Video metadata loaded: ${overlay.src}`);
            (0, remotion_1.continueRender)(handle);
        };
        const handleError = (error) => {
            console.error(`Error loading video ${overlay.src}:`, error);
            (0, remotion_1.continueRender)(handle);
        };
        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("error", handleError);
        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("error", handleError);
            // Ensure we don't leave hanging render delays
            (0, remotion_1.continueRender)(handle);
        };
    }, [overlay.src]);
    // Calculate if we're in the exit phase (last 30 frames)
    const isExitPhase = frame >= overlay.durationInFrames - 30;
    // Apply enter animation only during entry phase
    const enterAnimation = !isExitPhase && ((_a = overlay.styles.animation) === null || _a === void 0 ? void 0 : _a.enter)
        ? (_b = image_layer_content_1.animationTemplates[overlay.styles.animation.enter]) === null || _b === void 0 ? void 0 : _b.enter(frame, overlay.durationInFrames)
        : {};
    // Apply exit animation only during exit phase
    const exitAnimation = isExitPhase && ((_c = overlay.styles.animation) === null || _c === void 0 ? void 0 : _c.exit)
        ? (_d = image_layer_content_1.animationTemplates[overlay.styles.animation.exit]) === null || _d === void 0 ? void 0 : _d.exit(frame, overlay.durationInFrames)
        : {};
    const videoStyle = {
        width: "100%",
        height: "100%",
        objectFit: overlay.styles.objectFit || "cover",
        opacity: overlay.styles.opacity,
        transform: overlay.styles.transform || "none",
        borderRadius: overlay.styles.borderRadius || "0px",
        filter: overlay.styles.filter || "none",
        boxShadow: overlay.styles.boxShadow || "none",
        border: overlay.styles.border || "none",
        ...(isExitPhase ? exitAnimation : enterAnimation),
    };
    // Create a container style that includes padding and background color
    const containerStyle = {
        width: "100%",
        height: "100%",
        padding: overlay.styles.padding || "0px",
        backgroundColor: overlay.styles.paddingBackgroundColor || "transparent",
        display: "flex", // Use flexbox for centering
        alignItems: "center",
        justifyContent: "center",
    };
    // Determine the video source URL
    let videoSrc = overlay.src;
    // If it's a relative URL and baseUrl is provided, use baseUrl
    if (overlay.src.startsWith("/") && baseUrl) {
        videoSrc = `${baseUrl}${overlay.src}`;
    }
    // Otherwise use the toAbsoluteUrl helper for relative URLs
    else if (overlay.src.startsWith("/")) {
        videoSrc = (0, url_helper_1.toAbsoluteUrl)(overlay.src);
    }
    return (react_1.default.createElement("div", { style: containerStyle },
        react_1.default.createElement(remotion_1.Video, { muted: true, src: videoSrc, trimBefore: overlay.videoStartTime || 0, style: videoStyle, volume: (_e = overlay.styles.volume) !== null && _e !== void 0 ? _e : 1, playbackRate: (_f = overlay.speed) !== null && _f !== void 0 ? _f : 1 })));
};
exports.VideoLayerContent = VideoLayerContent;
