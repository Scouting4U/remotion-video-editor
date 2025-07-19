import React from "react";
import { ClipOverlay, ImageOverlay } from "../../types";
/**
 * Props for the MediaPaddingControls component
 * @interface MediaPaddingControlsProps
 * @property {ClipOverlay | ImageOverlay} localOverlay - The current overlay object containing styles
 * @property {Function} handleStyleChange - Callback function to update overlay styles
 */
interface MediaPaddingControlsProps {
    localOverlay: ClipOverlay | ImageOverlay;
    handleStyleChange: (updates: Partial<ClipOverlay["styles"] | ImageOverlay["styles"]>) => void;
}
/**
 * MediaPaddingControls Component
 *
 * A reusable component for controlling padding and padding background color
 * for both video and image overlays.
 *
 * @component
 * @param {MediaPaddingControlsProps} props - Component props
 * @returns {JSX.Element} UI controls for padding and padding background
 */
export declare const MediaPaddingControls: React.FC<MediaPaddingControlsProps>;
export {};
//# sourceMappingURL=media-padding-controls.d.ts.map