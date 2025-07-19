import React from "react";
import { Overlay } from "../core/types";
/**
 * RotateHandle Component
 *
 * A React component that provides rotation functionality for overlay elements.
 * Renders a rotation handle that users can drag to rotate the parent overlay.
 *
 * @component
 * @param {Object} props
 * @param {Overlay} props.overlay - The overlay object to be rotated
 * @param {Function} props.setOverlay - Callback function to update the overlay properties
 * @param {number} [props.scale] - Optional scale factor for the rotation handle
 *
 * @example
 * <RotateHandle
 *   overlay={overlayObject}
 *   setOverlay={(id, updater) => updateOverlay(id, updater)}
 * />
 */
export declare const RotateHandle: React.FC<{
    overlay: Overlay;
    setOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
    scale?: number;
}>;
//# sourceMappingURL=rotate-handle.d.ts.map