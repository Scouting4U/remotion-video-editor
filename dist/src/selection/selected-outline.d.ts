import React from "react";
import { Overlay } from "../core/types";
/**
 * SelectionOutline is a component that renders a draggable, resizable outline around selected overlays.
 * It provides visual feedback and interaction handles for manipulating overlay elements.
 *
 * @component
 * @param {Object} props
 * @param {Overlay} props.overlay - The overlay object containing position, size, and other properties
 * @param {Function} props.changeOverlay - Callback to update overlay properties
 * @param {Function} props.setSelectedOverlayId - Function to update the currently selected overlay
 * @param {number|null} props.selectedOverlayId - ID of the currently selected overlay
 * @param {boolean} props.isDragging - Whether the overlay is currently being dragged
 */
export declare const SelectionOutline: React.FC<{
    overlay: Overlay;
    changeOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
    setSelectedOverlayId: React.Dispatch<React.SetStateAction<number | null>>;
    selectedOverlayId: number | null;
    isDragging: boolean;
}>;
//# sourceMappingURL=selected-outline.d.ts.map