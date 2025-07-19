import React from "react";
import { CaptionOverlay } from "../../core/types";
/**
 * Props for the CaptionTimeline component
 * @interface CaptionTimelineProps
 * @property {CaptionOverlay} localOverlay - The current caption overlay being edited
 * @property {Function} setLocalOverlay - Function to update the caption overlay
 * @property {number} currentMs - Current playback position in milliseconds
 */
interface CaptionTimelineProps {
    localOverlay: CaptionOverlay;
    setLocalOverlay: (overlay: CaptionOverlay) => void;
    currentMs: number;
}
/**
 * CaptionTimeline Component
 *
 * @component
 * @description
 * Provides an interface for editing and managing caption timing and content.
 * Features include:
 * - Auto-scrolling to active caption
 * - Real-time caption text editing
 * - Visual feedback for active/upcoming/past captions
 * - Automatic word timing distribution
 *
 * The component handles both the visual representation and editing
 * functionality for caption sequences.
 *
 * @example
 * ```tsx
 * <CaptionTimeline
 *   localOverlay={captionOverlay}
 *   setLocalOverlay={handleOverlayUpdate}
 *   currentMs={1000}
 * />
 * ```
 */
export declare const CaptionTimeline: React.FC<CaptionTimelineProps>;
export {};
//# sourceMappingURL=caption-timeline.d.ts.map