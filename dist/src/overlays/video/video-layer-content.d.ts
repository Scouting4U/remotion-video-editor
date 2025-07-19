import React from "react";
import { ClipOverlay } from "../../core/types";
/**
 * Interface defining the props for the VideoLayerContent component
 */
interface VideoLayerContentProps {
    /** The overlay configuration object containing video properties and styles */
    overlay: ClipOverlay;
    /** The base URL for the video */
    baseUrl?: string;
}
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
export declare const VideoLayerContent: React.FC<VideoLayerContentProps>;
export {};
//# sourceMappingURL=video-layer-content.d.ts.map