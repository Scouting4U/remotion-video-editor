import React from "react";
import { Overlay } from "../core/types";
export declare const MAX_ROWS = 8;
/**
 * ResizeHandle component renders a draggable handle for resizing overlays in the editor.
 * It appears as a small white square with a blue border at the corners of a selected overlay.
 *
 * @component
 * @param {Object} props
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} props.type - Position of the handle
 * @param {Function} props.setOverlay - Callback to update the overlay's properties
 * @param {Overlay} props.overlay - The overlay object being resized
 *
 * Features:
 * - Scales appropriately with zoom level using Remotion's useCurrentScale
 * - Maintains correct z-index based on overlay row position
 * - Supports dragging to resize from any corner
 * - Prevents resizing below 1x1 pixels
 * - Updates overlay dimensions and position in real-time while dragging
 * - Not displayed for sound-type overlays
 */
export declare const ResizeHandle: React.FC<{
    type: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    setOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
    overlay: Overlay;
}>;
//# sourceMappingURL=resize-handle.d.ts.map