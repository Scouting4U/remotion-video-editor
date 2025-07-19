import React from "react";
import { Overlay } from "../core/types";
/**
 * Renders a sorted list of selection outlines for overlays
 * The selected overlay is always rendered last (on top)
 * Each outline is wrapped in a Remotion Sequence component for timeline positioning
 *
 * @param props
 * @param props.overlays - Array of overlay objects to render
 * @param props.selectedOverlayId - ID of currently selected overlay
 * @param props.changeOverlay - Callback to modify an overlay's properties
 * @param props.setSelectedOverlayId - State setter for selected overlay ID
 */
export declare const SortedOutlines: React.FC<{
    overlays: Overlay[];
    selectedOverlayId: number | null;
    changeOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
    setSelectedOverlayId: React.Dispatch<React.SetStateAction<number | null>>;
}>;
//# sourceMappingURL=sorted-outlines.d.ts.map